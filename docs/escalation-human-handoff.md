# Ескалація до людини (Human Handoff) — MVP

> Проєктний документ для реалізації. Охоплює бекенд (`tikketi/backend`, NestJS + Prisma) та
> дашборд (`tikketi/dashboard`, Next.js/FSD). Описує цільову логіку, зміни в даних, покроковий
> гайд підключення кожного каналу і чекліст робіт.

---

## 1. Продуктова логіка (як має працювати)

1. **Підключення інтеграцій.** На сторінці інтеграцій користувач підключає канали, якими хоче
   користуватись: **Email**, **Telegram**, **Webhook** (Discord — фаза 2, за тим самим патерном,
   що й Telegram). Підключення = створення запису `Integration` з валідним `config`.
2. **Вибір методів ескалації.** На `/dashboard/[workspaceId]/escalation` користувач вмикає один
   або кілька методів ескалації. **У списку показуються лише вже підключені інтеграції** —
   нема підключення, нема пункту в списку.
3. **Спрацювання ескалації.** Коли відвідувач у віджеті просить людину (уже реалізований тригер
   `EscalationReason.USER_REQUEST` у `conversation.service`), система сповіщає **всі увімкнені для
   ескалації** інтеграції.
4. **Двосторонній релей (Telegram / Discord).** Ескалація відкриває окремий «тікет» (форум-топік у
   Telegram-групі / тред у Discord). Менеджер відповідає прямо там — відповідь повертається
   відвідувачу у віджет як повідомлення `HUMAN_AGENT`. Повідомлення відвідувача, поки розмова
   `ESCALATED`, летять назад у той самий топік.
5. **Human mode.** Поки розмова `ESCALATED`, **AI мовчить** — на нові повідомлення відвідувача
   відповідає лише людина. Після резолву розмова повертається в нормальний режим.
6. **Email — лише сповіщення.** У MVP email односторонній: лист про ескалацію з посиланням на
   дашборд. Двосторонній email (inbound-парсинг) — окрема пізніша фаза.

### Зафіксовані рішення (з уточнень)

| Питання | Рішення |
|---|---|
| Модель даних | **Окрема сутність `Integration`**; `Escalation` посилається на `integrationId` |
| Канали MVP | **Email, Telegram, Webhook** (Discord — фаза 2) |
| Сторінка `/escalation` | Лишаються **вибір методів + список розмов + KPIs**; **routing rules прибираємо** |
| Auth підключення | Спільний бот/сервіс Tikketi (Telegram-бот у групі → тікети-топіки; Discord так само; Email через Mailgun) |
| AI після handoff | **AI мовчить** (human mode) поки `ESCALATED` |
| Двосторонній Email | **Ні** — email лише сповіщення |

---

## 2. Поточний стан (що вже є)

### Бекенд
- Модуль `src/modules/escalation` з моделями:
  - `EscalationChannel` — `destination (TELEGRAM|EMAIL|WEBHOOK|EXTERNAL_CHAT)` + `config` JSON + `isEnabled`. **Це фактично і є «підключена інтеграція».**
  - `RoutingRule` — `priority` + `isActive` + N каналів. **Прибираємо (для MVP не треба).**
  - `Escalation` — інцидент: `conversationId`, `status (WAITING_HUMAN|IN_PROGRESS|RESOLVED)`, `reason`, `channelId`.
- Нотифаєри (односторонні): `email.notifier.ts` (Mailgun), `telegram.notifier.ts` (спільний `TELEGRAM_BOT_TOKEN` + `chatId`), `webhook.notifier.ts` (`UrlSafetyService.fetch`).
- Тригер ескалації: `conversation.service.ts` → при `USER_REQUEST` викликає `escalationService.escalateConversation(...)`, що зараз лише розсилає сповіщення.
- Віджет отримує повідомлення **полінгом**: `GET /widget/conversations/:id/messages` (`conversation-public.controller.ts`). Немає WebSocket — але для relay достатньо, бо віджет опитує список.
- `MessageRole` вже має **`HUMAN_AGENT`**, `ConversationStatus` вже має **`ESCALATED`** — нічого нового в enum-и додавати не треба.
- Окремого модуля «інтеграцій» **немає**.

### Дашборд
- Інтеграції повністю замокані: `entities/integration/model/config.ts` (`INTEGRATIONS`, статуси `connected|available` хардкодом), плейсхолдерний connect-флоу (`widgets/integrations/ui/IntegrationConnectSettings.tsx` — OAuth-заглушки).
- Сторінка `/escalation` (`views/escalation/ui/EscalationPage.tsx`) складається з: `EscalationKpis`, `HandoffChannels`, `RoutingRules`, `EscalatedConversationsPanel`.
- Ескалаційне ентіті теж на моках: `entities/escalation/model/config.ts` (`HANDOFF_CHANNELS`, `ESCALATIONS`), плюс частково зароблені хуки `useEscalationChannels`, `useRoutingRules`.

---

## 3. Цільова архітектура даних (Prisma)

Ідея: `EscalationChannel` перейменовуємо/переосмислюємо в **`Integration`** (та сама суть —
з'єднання + конфіг), додаємо прапорець «використовувати для ескалації» та таблицю зв'язку тредів
для двостороннього релею. `RoutingRule` видаляємо.

```prisma
model Integration {
  id               String            @id @default(cuid())
  workspaceId      String            @map("workspace_id")
  workspace        Workspace         @relation(fields: [workspaceId], references: [id], onDelete: Cascade)
  type             IntegrationType
  status           IntegrationStatus @default(CONNECTED)
  /// Type-specific: { email } | { chatId, groupTitle } | { url } | { webhookUrl } (Discord)
  config           Json
  /// Керується перемикачами на /escalation. Тільки увімкнені беруть участь у розсилці.
  useForEscalation Boolean           @default(false) @map("use_for_escalation")
  escalations      Escalation[]
  threads          EscalationThread[]
  createdAt        DateTime          @default(now()) @map("created_at")
  updatedAt        DateTime          @updatedAt @map("updated_at")

  @@index([workspaceId])
  @@map("integrations")
}

enum IntegrationType {
  EMAIL
  TELEGRAM
  WEBHOOK
  DISCORD        // фаза 2

  @@map("integration_type")
}

enum IntegrationStatus {
  CONNECTED
  DISABLED
  ERROR          // напр., бот вигнали з групи / вебхук 4xx

  @@map("integration_status")
}

/// Мапінг «розмова у віджеті» ↔ «зовнішній тред» для двостороннього релею.
model EscalationThread {
  id               String       @id @default(cuid())
  escalationId     String       @map("escalation_id")
  escalation       Escalation   @relation(fields: [escalationId], references: [id], onDelete: Cascade)
  conversationId   String       @map("conversation_id")
  integrationId    String       @map("integration_id")
  integration      Integration  @relation(fields: [integrationId], references: [id], onDelete: Cascade)
  /// Telegram message_thread_id / Discord thread id (як рядок)
  externalThreadId String       @map("external_thread_id")
  createdAt        DateTime     @default(now()) @map("created_at")

  @@unique([integrationId, externalThreadId])
  @@index([conversationId])
  @@map("escalation_threads")
}

model Escalation {
  id               String           @id @default(cuid())
  conversationId   String           @map("conversation_id")
  conversation     Conversation     @relation(fields: [conversationId], references: [id], onDelete: Cascade)
  workspaceId      String           @map("workspace_id")
  status           EscalationStatus @default(WAITING_HUMAN)
  reason           EscalationReason
  integrationId    String?          @map("integration_id")   // було channelId
  integration      Integration?     @relation(fields: [integrationId], references: [id], onDelete: SetNull)
  assignedToUserId String?          @map("assigned_to_user_id")
  threads          EscalationThread[]
  createdAt        DateTime         @default(now()) @map("created_at")
  updatedAt        DateTime         @updatedAt @map("updated_at")

  @@index([conversationId])
  @@index([workspaceId])
  @@map("escalations")
}

// ВИДАЛИТИ: model RoutingRule і зв'язок RoutingRuleChannels.
```

**Міграція:** оскільки `EscalationChannel` = майбутній `Integration`, зробити rename таблиці
`escalation_channels` → `integrations`, `destination` → `type`, додати `use_for_escalation`,
`status`; перейменувати `escalations.channel_id` → `integration_id`; дропнути `routing_rules` та
join-таблицю. Через `prisma migrate dev` згенерувати міграцію і, за потреби, дописати `RENAME`
руками, щоб не втратити наявні дані.

---

## 4. Потік ескалації (послідовність)

### 4.1 Спрацювання (уже є тригер, змінюємо тіло)
```
Відвідувач: "хочу оператора"
  → conversation.service: decision.kind === 'escalate'
  → escalationService.escalateConversation(conversationId, workspaceId, USER_REQUEST)
      1. створити Escalation (status WAITING_HUMAN)
      2. conversation.status = ESCALATED            // ← НОВЕ: вмикає human mode
      3. integrations = знайти useForEscalation && status=CONNECTED для воркспейсу
      4. для кожної інтеграції → notifier.open(escalation, integration):
           EMAIL    → надіслати лист (односторонньо)
           WEBHOOK  → POST payload (односторонньо)
           TELEGRAM → createForumTopic у групі → зберегти EscalationThread(externalThreadId)
```

### 4.2 Відповідь менеджера (Telegram, двосторонньо)
```
Менеджер пише у форум-топіку групи
  → Telegram POST /integrations/telegram/webhook (наш публічний ендпоінт зі secret-token)
  → знайти EscalationThread за (integration.config.chatId + message_thread_id)
  → створити Message(role=HUMAN_AGENT, content=текст) у розмові
  → віджет підхоплює через полінг GET .../messages
```

### 4.3 Наступне повідомлення відвідувача (поки ESCALATED)
```
POST /widget/conversations/:id/messages
  → conversation.service.postMessage:
       якщо conversation.status === ESCALATED:
         - зберегти Message(role=VISITOR)
         - НЕ викликати AI (human mode)
         - relay у зовнішній(і) тред(и): telegram.sendMessage(chatId, message_thread_id, text)
       інакше — стара логіка (AI-відповідь)
```

### 4.4 Резолв
```
Менеджер команда /resolve у топіку  АБО  агент у дашборді PATCH /escalations/:id {status: RESOLVED}
  → Escalation.status = RESOLVED
  → conversation.status = OPEN (або RESOLVED)
  → закрити форум-топік (closeForumTopic) — опційно
```

---

## 5. Зміни в бекенді

### 5.1 Схема / модуль
- [ ] Prisma: додати `Integration`, `IntegrationType`, `IntegrationStatus`, `EscalationThread`; змінити `Escalation` (`integrationId`); **видалити `RoutingRule`**. Згенерувати міграцію + `prisma generate`.
- [ ] Новий модуль `src/modules/integration` (CRUD підключень) **або** розширити `escalation` модуль. Рекомендую окремий `integration` модуль, бо інтеграції концептуально ширші за ескалацію.

### 5.2 Ендпоінти (під `/workspaces/:workspaceId`, guard `RequireWorkspaceRole(ADMIN)` на запис)
```
POST   /workspaces/:id/integrations            // підключити (body: { type, config })
GET    /workspaces/:id/integrations            // список підключених (для сторінок Integrations + Escalation)
PATCH  /workspaces/:id/integrations/:integrationId   // { useForEscalation?, status?, config? }
DELETE /workspaces/:id/integrations/:integrationId   // відключити
POST   /workspaces/:id/integrations/:integrationId/test   // тестове сповіщення (перевірка конфігу)
```
Ескалації лишаються як є (`GET /escalations`, `PATCH /escalations/:id`), але **прибрати** усі
`routing-rules` маршрути з `escalation.controller.ts`.

### 5.3 Публічний webhook для Telegram (двосторонній релей)
```
POST /integrations/telegram/webhook            // @Public(), захист secret-token у заголовку
```
- Зареєструвати webhook: `setWebhook` з `secret_token` (Telegram шле його в `X-Telegram-Bot-Api-Secret-Token`).
- Обробляти: `/connect <code>` у групі (прив'язка chatId до інтеграції), звичайні повідомлення в топіках (релей менеджера), `/resolve`.

### 5.4 Notifiers → «relay-провайдери»
Розширити інтерфейс `escalation-notifier.interface.ts` (або новий `IntegrationChannelProvider`):
```ts
interface ChannelProvider {
  open(escalation, integration): Promise<{ externalThreadId?: string }>; // сповістити/створити тікет
  relayToAgent(integration, thread, text): Promise<void>;                // відвідувач → менеджер
  close?(integration, thread): Promise<void>;                            // резолв
}
```
- `EmailProvider.open` = наявний лист (додати посилання на дашборд-розмову); `relay*` не реалізуємо.
- `WebhookProvider.open` = наявний POST; `relay*` не реалізуємо.
- `TelegramProvider`: `open` = `createForumTopic` + `sendMessage(thread)`; `relayToAgent` = `sendMessage(chatId, message_thread_id)`; вхідні від менеджера обробляє webhook-контролер.

### 5.5 Conversation service (human mode)
- [ ] `escalateConversation`: після створення `Escalation` виставити `conversation.status = ESCALATED`.
- [ ] `postMessage`: якщо `status === ESCALATED` — зберегти `VISITOR`-повідомлення, **пропустити AI**, викликати relay у прив'язані треди.
- [ ] Резолв (агентом чи `/resolve`): повернути `status` у `OPEN`/`RESOLVED`, опційно закрити топік.

### 5.6 Конфіг/env
```
TELEGRAM_BOT_TOKEN=...            # уже використовується
TELEGRAM_WEBHOOK_SECRET=...       # для верифікації вхідних апдейтів
APP_PUBLIC_URL=...                # для посилань у листах/сповіщеннях
# Mailgun — уже налаштований (infrastructure/mailgun)
```

---

## 6. Зміни в дашборді (FSD)

### 6.1 Сторінка інтеграцій (підключення)
- Замінити мок `entities/integration/model/config.ts` реальними даними з API.
- `entities/integration` (reads): `useIntegrations(workspaceId)` — список підключених + доступних типів.
- `features/*` (mutations): `useConnectIntegration`, `useUpdateIntegration`, `useDisconnectIntegration`, `useTestIntegration` (за конвенцією [[api-wiring-fsd-convention]]).
- Connect-форми **per-type** (замість OAuth-плейсхолдера в `IntegrationConnectSettings.tsx`):
  - **Email** — поле `email` (куди слати).
  - **Telegram** — майстер: «Створи групу → додай @TikketiBot → надішли `/connect ABC123`». Дашборд показує згенерований `code`, статус «очікуємо підтвердження», після прив'язки — назву групи.
  - **Webhook** — поле `url` (+ кнопка Test).

### 6.2 Сторінка `/escalation` (редизайн)
Лишаємо `EscalationKpis` + `EscalatedConversationsPanel`, **прибираємо** `RoutingRules` та весь
пов'язаний UI. Додаємо блок **«Escalation methods»** — список **лише підключених** інтеграцій із
перемикачами (toggle → `PATCH /integrations/:id { useForEscalation }`).

**Видалити файли:**
- `widgets/escalation/ui/RoutingRules.tsx`, `RoutingRuleFormDialog.tsx`, `RoutingRuleActions.tsx`, `RoutingRuleDeleteDialog.tsx`
- `widgets/escalation/ui/HandoffChannelAddSheet.tsx`, `HandoffChannelConfigureSheet.tsx` (заміняться селектором методів)
- `entities/escalation/api/use-routing-rules.ts`, типи/маппери routing-rule
- прибрати експорти `RoutingRules`, `useRoutingRules` з `widgets/escalation/index.ts` і `entities/escalation/index.ts`

**Замінити / додати:**
- `widgets/escalation/ui/EscalationMethods.tsx` — новий блок вибору методів (читає `useIntegrations`, тогл через мутацію).
- `HandoffChannels.tsx` → або видалити, або переробити на read-only індикатор підключених каналів.
- `EscalationPage.tsx` — оновити композицію: `EscalationKpis` → `EscalationMethods` → `EscalatedConversationsPanel`.

### 6.3 Ескалаційне ентіті
- Замінити моки `HANDOFF_CHANNELS`/`ESCALATIONS` реальними хуками; `escalationKeys` лишити, додати `integrationKeys`.

---

## 7. Покроковий гайд підключення по каналах

### 7.1 Email (односторонній) — найпростіший
1. Користувач на сторінці інтеграцій вводить адресу отримувача.
2. `POST /integrations { type: EMAIL, config: { email } }` → `status: CONNECTED`.
3. На `/escalation` вмикає перемикач Email (`useForEscalation = true`).
4. При ескалації `EmailProvider.open` шле лист через Mailgun із посиланням на розмову в дашборді.
5. Менеджер відкриває дашборд і відповідає звідти (двосторонній email — не в MVP).

### 7.2 Telegram (двосторонній, «тікет = форум-топік»)
> Модель: **один спільний бот Tikketi**, якого клієнт додає у свою групу. Кожна ескалація —
> окремий форум-топік у цій групі; відповіді менеджера в топіку летять відвідувачу.

**Передумови:** група має бути **супергрупою з увімкненими Topics (форум)**; бот — адміном із
правом `Manage Topics`.

**Кроки підключення (для користувача):**
1. Дашборд: «Підключити Telegram» → показує код, напр. `TIK-7F3A9K`.
2. Створити Telegram-групу, увімкнути **Topics**, додати **@TikketiBot** адміном.
3. Надіслати в групу: `/connect TIK-7F3A9K`.
4. Бот через webhook отримує апдейт, знаходить інтеграцію за кодом, зберігає `chatId` групи → `status: CONNECTED`. Дашборд показує назву групи.
5. На `/escalation` увімкнути перемикач Telegram.

**Що робить бекенд:**
- Ескалація → `createForumTopic(chatId, "Тікет #<escalationId> — <причина>")` → `sendMessage(chatId, message_thread_id, <контекст+останні репліки>)` → зберегти `EscalationThread`.
- Менеджер пише в топіку → webhook → мапимо `(chatId, message_thread_id)` на `EscalationThread` → `Message(HUMAN_AGENT)` у розмову.
- Відвідувач пише (поки `ESCALATED`) → `sendMessage` у той самий топік.
- `/resolve` у топіку → резолв ескалації + `closeForumTopic`.

**Технічно:**
- `setWebhook(url = APP_PUBLIC_URL + '/integrations/telegram/webhook', secret_token = TELEGRAM_WEBHOOK_SECRET)` — один раз при деплої.
- Верифікувати `X-Telegram-Bot-Api-Secret-Token` на кожному вхідному апдейті.

### 7.3 Webhook (односторонній, для власних інтеграцій)
1. Користувач вводить `url` свого ендпоінта (+ кнопка **Test** → `POST /integrations/:id/test`).
2. `POST /integrations { type: WEBHOOK, config: { url } }`.
3. На `/escalation` вмикає перемикач.
4. При ескалації `WebhookProvider.open` шле JSON `{ escalationId, conversationId, reason, workspaceId, messages }` через `UrlSafetyService.fetch` (захист від SSRF уже є).

### 7.4 Discord (фаза 2 — за патерном Telegram)
- `type: DISCORD`, `config: { guildId, channelId }` (або incoming webhook для one-way старту).
- Двосторонній варіант: бот створює **thread** у каналі на кожну ескалацію; вхідні повідомлення отримуються через **Discord Gateway (WebSocket)** — це головна відмінність від Telegram (там достатньо HTTP-webhook). Тому Discord винесено в окрему фазу.
- Швидкий проміжний варіант: Discord **Incoming Webhook URL** як односторонній канал (як Webhook), без релею.

---

## 8. Фази впровадження (рекомендований порядок)

**Фаза 0 — прибирання й дані**
- [ ] Prisma: `Integration` + `EscalationThread`, прибрати `RoutingRule`, міграція.
- [ ] Backend: модуль `integration` + CRUD-ендпоінти; прибрати routing-rules з контролера/сервісу.
- [ ] Dashboard: прибрати RoutingRules UI + хуки; редизайн `/escalation` (методи + розмови + KPIs).

**Фаза 1 — односторонні канали (швидка цінність)**
- [ ] Email + Webhook провайдери на новій моделі; connect-форми; перемикачі на `/escalation`.
- [ ] Human mode: `ESCALATED` вимикає AI; лист/POST містять посилання на дашборд, де агент відповідає.

**Фаза 2 — Telegram двосторонній**
- [ ] Telegram provider (`createForumTopic`/`sendMessage`), `EscalationThread`, `/connect`, `/resolve`.
- [ ] Публічний webhook-контролер + `setWebhook` + secret-token.
- [ ] Relay: відвідувач ↔ менеджер; резолв.

**Фаза 3 — Discord** (Gateway-бот або incoming-webhook як односторонній старт).

---

## 9. Відкриті технічні нюанси (звірити під час реалізації)
- **Telegram Topics** доступні лише в супергрупах — треба явна інструкція/перевірка у connect-флоу; якщо Topics вимкнені, fallback на звичайні повідомлення з `reply_to` (гірший UX).
- **Полінг віджета**: перевірити інтервал полінгу `GET .../messages`, щоб relay-відповіді з'являлись достатньо швидко (за потреби — зменшити інтервал під час `ESCALATED`).
- **Ідемпотентність Telegram-апдейтів**: зберігати `update_id`, щоб не дублювати повідомлення при повторних доставках.
- **Права доступу**: у групі відповісти може будь-який учасник — усі релеї підписуються як `HUMAN_AGENT` (в MVP без розрізнення конкретного оператора; за потреби — мапити `from.id` на користувача).
- **Кілька увімкнених каналів одночасно**: `open` викликається для кожного; двосторонній релей матиме сенс лише для Telegram/Discord — вирішити, чи дозволяти кілька релей-каналів на одну розмову (рекомендація MVP: один релей-канал + N сповіщувальних).
