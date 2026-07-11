'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

import { cn, useSearchParam } from '~/shared/lib';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  useSidebar,
} from '~/shared/ui/kit';
import type { Conversation } from '~/entities/conversation';
import { ConversationList } from '~/widgets/conversation';

const ConversationThread = dynamic(
  () => import('~/widgets/conversation').then((m) => ({ default: m.ConversationThread })),
  {
    loading: () => (
      <div className="text-muted-foreground flex flex-1 items-center justify-center text-sm">
        Loading…
      </div>
    ),
  },
);

const ConversationInfo = dynamic(() =>
  import('~/widgets/conversation').then((m) => ({ default: m.ConversationInfo })),
);

const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: '1',
    customerName: 'John Smith',
    customerEmail: 'john.smith@example.com',
    lastMessage: "Can I return a product if I'm not happy?",
    status: 'open',
    channel: 'webchat',
    time: '2m ago',
    source: 'Web widget',
    assignedTo: 'Mini widget',
    language: 'English',
    createdAt: 'Jun 10, 2024 11:11 AM',
    tags: ['Refund', 'Return policy'],
    aiSummary:
      'Customer asked about the return policy. AI explained that products can be returned within 30 days if unused and in original packaging. Customer was satisfied with the response.',
    messages: [
      {
        id: 'm1',
        role: 'customer',
        content: "Can I return a product if I'm not happy?",
        timestamp: '11:11 AM',
      },
      {
        id: 'm2',
        role: 'ai',
        content:
          "Yes, you can return any product within 30 days of delivery if you're not completely satisfied. The item must be unused and in its original packaging.",
        timestamp: '11:11 AM',
      },
      {
        id: 'm3',
        role: 'customer',
        content: 'Do I need to pay for return shipping?',
        timestamp: '11:12 AM',
      },
      {
        id: 'm4',
        role: 'ai',
        content:
          "Return shipping is free for orders over $50. For smaller orders a $5 flat fee applies. We'll email you a prepaid label once your return request is approved.",
        timestamp: '11:12 AM',
      },
      {
        id: 'm5',
        role: 'customer',
        content: 'Great, thank you!',
        timestamp: '11:13 AM',
      },
    ],
    events: [
      {
        id: 'e1',
        type: 'started',
        description: 'Conversation started',
        timestamp: 'Jun 10, 2024 11:11 AM',
      },
      {
        id: 'e2',
        type: 'ai_resolved',
        description: 'AI resolved conversation',
        timestamp: 'Jun 10, 2024 11:13 AM',
      },
      {
        id: 'e3',
        type: 'viewed',
        description: 'Viewed by Olha Blyz',
        timestamp: 'Jun 10, 2024 11:15 AM',
      },
    ],
  },
  {
    id: '2',
    customerName: 'Sarah Johnson',
    customerEmail: 'sarah.j@outlook.com',
    lastMessage: 'Where is my order? It was supposed to arrive yesterday.',
    status: 'pending',
    channel: 'email',
    time: '18m ago',
    source: 'Email',
    assignedTo: 'Alex M.',
    language: 'English',
    createdAt: 'Jun 10, 2024 10:42 AM',
    tags: ['Shipping', 'Late delivery'],
    aiSummary:
      'Customer is concerned about a late delivery. The order was placed 5 days ago with standard shipping (3–5 business days). AI shared tracking information and apologised for the delay.',
    messages: [
      {
        id: 'm1',
        role: 'customer',
        content:
          "Hi! My order #45821 was supposed to arrive yesterday but I still haven't received it.",
        timestamp: '10:42 AM',
      },
      {
        id: 'm2',
        role: 'ai',
        content:
          "I'm sorry about the delay! Let me check your order status. I can see order #45821 is currently in transit and is estimated to arrive today by end of day.",
        timestamp: '10:43 AM',
      },
      {
        id: 'm3',
        role: 'customer',
        content: 'Can you give me the tracking number?',
        timestamp: '10:44 AM',
      },
      {
        id: 'm4',
        role: 'ai',
        content:
          'Your tracking number is 1Z999AA10123456784. You can track it on the UPS website.',
        timestamp: '10:44 AM',
      },
    ],
    events: [
      {
        id: 'e1',
        type: 'started',
        description: 'Conversation started',
        timestamp: 'Jun 10, 2024 10:42 AM',
      },
      {
        id: 'e2',
        type: 'assigned',
        description: 'Assigned to Alex M.',
        timestamp: 'Jun 10, 2024 10:50 AM',
      },
    ],
  },
  {
    id: '3',
    customerName: 'Michael Brown',
    customerEmail: 'm.brown@gmail.com',
    lastMessage: 'Can you offer discounts for bulk orders?',
    status: 'open',
    channel: 'webchat',
    time: '35m ago',
    source: 'Web widget',
    language: 'English',
    createdAt: 'Jun 10, 2024 10:25 AM',
    isEscalated: true,
    tags: ['Sales', 'Bulk order'],
    aiSummary:
      'Customer is asking about bulk order discounts for their business. They are interested in purchasing 50+ units monthly. Escalated to the sales team.',
    messages: [
      {
        id: 'm1',
        role: 'customer',
        content:
          'Hi, can you offer discounts for bulk orders? We need about 50 units per month.',
        timestamp: '10:25 AM',
      },
      {
        id: 'm2',
        role: 'ai',
        content:
          "Thank you for your interest! We do have a volume discount programme. For 50+ units per month you'd qualify for a 15% discount. I'll connect you with our sales team to discuss further.",
        timestamp: '10:26 AM',
      },
    ],
    events: [
      {
        id: 'e1',
        type: 'started',
        description: 'Conversation started',
        timestamp: 'Jun 10, 2024 10:25 AM',
      },
    ],
  },
  {
    id: '4',
    customerName: 'Emily Davis',
    customerEmail: 'emily.davis@company.io',
    lastMessage: 'The product stopped working after 2 weeks.',
    status: 'pending',
    channel: 'intercom',
    time: '1h ago',
    source: 'Intercom',
    assignedTo: 'Support team',
    language: 'English',
    createdAt: 'Jun 10, 2024 09:55 AM',
    tags: ['Warranty', 'Defective product'],
    aiSummary:
      'Customer reports a product failure after 2 weeks of use. Likely a hardware defect covered under the 12-month warranty. Customer asked for a replacement.',
    messages: [
      {
        id: 'm1',
        role: 'customer',
        content:
          'The product I bought 2 weeks ago has completely stopped working. This is unacceptable.',
        timestamp: '09:55 AM',
      },
      {
        id: 'm2',
        role: 'ai',
        content:
          'I sincerely apologise for the inconvenience. This sounds like it may be covered under our 12-month warranty. Can you provide your order number so I can arrange a replacement?',
        timestamp: '09:56 AM',
      },
      {
        id: 'm3',
        role: 'customer',
        content: 'Order number is #38291.',
        timestamp: '09:57 AM',
      },
      {
        id: 'm4',
        role: 'agent',
        content:
          "I have verified your order and can confirm this is covered by warranty. A replacement unit will be shipped within 2 business days. You'll receive a confirmation email shortly.",
        timestamp: '10:15 AM',
      },
    ],
    events: [
      {
        id: 'e1',
        type: 'started',
        description: 'Conversation started',
        timestamp: 'Jun 10, 2024 09:55 AM',
      },
      {
        id: 'e2',
        type: 'assigned',
        description: 'Assigned to Support team',
        timestamp: 'Jun 10, 2024 10:00 AM',
      },
      {
        id: 'e3',
        type: 'viewed',
        description: 'Viewed by Maria H.',
        timestamp: 'Jun 10, 2024 10:10 AM',
      },
    ],
  },
  {
    id: '5',
    customerName: 'David Wilson',
    customerEmail: 'david.w@business.com',
    lastMessage: "There's an issue with my billing account.",
    status: 'resolved',
    channel: 'email',
    time: '2h ago',
    source: 'Email',
    language: 'English',
    createdAt: 'Jun 10, 2024 08:30 AM',
    tags: ['Billing'],
    aiSummary:
      'Customer had a duplicate charge on their invoice. The billing team confirmed it was a system error and issued a full refund within 24 hours.',
    messages: [
      {
        id: 'm1',
        role: 'customer',
        content: 'I was charged twice for my last order. Please fix this immediately.',
        timestamp: '08:30 AM',
      },
      {
        id: 'm2',
        role: 'ai',
        content:
          "I can see the duplicate charge on your account. This appears to be a system error on our end. I'm escalating this to our billing team to process a refund within 24 hours.",
        timestamp: '08:31 AM',
      },
      {
        id: 'm3',
        role: 'customer',
        content: 'Thank you, please make sure it gets resolved.',
        timestamp: '08:32 AM',
      },
      {
        id: 'm4',
        role: 'agent',
        content:
          'The duplicate charge has been refunded. You should see it in your account within 3–5 business days.',
        timestamp: '09:00 AM',
      },
    ],
    events: [
      {
        id: 'e1',
        type: 'started',
        description: 'Conversation started',
        timestamp: 'Jun 10, 2024 08:30 AM',
      },
      {
        id: 'e2',
        type: 'ai_resolved',
        description: 'AI resolved conversation',
        timestamp: 'Jun 10, 2024 09:05 AM',
      },
    ],
  },
  {
    id: '6',
    customerName: 'Lisa Anderson',
    customerEmail: 'lisa.anderson@email.com',
    lastMessage: 'What payment methods do you accept?',
    status: 'resolved',
    channel: 'webchat',
    time: '3h ago',
    source: 'Web widget',
    language: 'English',
    createdAt: 'Jun 10, 2024 07:50 AM',
    tags: ['Payment'],
    aiSummary:
      'Customer asked about accepted payment methods. AI listed all available options. No further action needed.',
    messages: [
      {
        id: 'm1',
        role: 'customer',
        content: 'What payment methods do you accept?',
        timestamp: '07:50 AM',
      },
      {
        id: 'm2',
        role: 'ai',
        content:
          'We accept Visa, Mastercard, American Express, PayPal, Apple Pay, Google Pay, and bank transfers. All payments are secured with 256-bit SSL encryption.',
        timestamp: '07:50 AM',
      },
      {
        id: 'm3',
        role: 'customer',
        content: 'Great, thanks!',
        timestamp: '07:51 AM',
      },
    ],
    events: [
      {
        id: 'e1',
        type: 'started',
        description: 'Conversation started',
        timestamp: 'Jun 10, 2024 07:50 AM',
      },
      {
        id: 'e2',
        type: 'ai_resolved',
        description: 'AI resolved conversation',
        timestamp: 'Jun 10, 2024 07:52 AM',
      },
    ],
  },
  {
    id: '7',
    customerName: 'James Taylor',
    customerEmail: 'james.t@startup.io',
    lastMessage: "Your return policy isn't clear on the website.",
    status: 'closed',
    channel: 'webchat',
    time: '5h ago',
    source: 'Web widget',
    language: 'English',
    createdAt: 'Jun 9, 2024 4:15 PM',
    tags: ['Return policy', 'Feedback'],
    aiSummary:
      'Customer found the return policy page confusing. AI clarified the policy. Customer also gave feedback about website clarity — logged for the product team.',
    messages: [
      {
        id: 'm1',
        role: 'customer',
        content:
          "Your return policy page is really confusing. I can't find the information I need.",
        timestamp: '4:15 PM',
      },
      {
        id: 'm2',
        role: 'ai',
        content:
          "I apologise for the confusion! Here's a quick summary: you can return items within 30 days of purchase. Items must be unused. Refunds are processed within 5–7 business days after we receive the return.",
        timestamp: '4:16 PM',
      },
      {
        id: 'm3',
        role: 'customer',
        content: "Thank you, that's much clearer. You should update the page.",
        timestamp: '4:17 PM',
      },
    ],
    events: [
      {
        id: 'e1',
        type: 'started',
        description: 'Conversation started',
        timestamp: 'Jun 9, 2024 4:15 PM',
      },
      {
        id: 'e2',
        type: 'ai_resolved',
        description: 'AI resolved conversation',
        timestamp: 'Jun 9, 2024 4:18 PM',
      },
    ],
  },
  {
    id: '8',
    customerName: 'Maria Garcia',
    customerEmail: 'maria.garcia@mail.com',
    lastMessage: 'I received a damaged item.',
    status: 'closed',
    channel: 'telegram',
    time: '1d ago',
    source: 'Telegram',
    language: 'English',
    createdAt: 'Jun 9, 2024 11:00 AM',
    isEscalated: true,
    tags: ['Damaged item', 'Replacement'],
    aiSummary:
      'Customer received a damaged item. A replacement was shipped the same day. Customer confirmed receipt and was satisfied with the resolution.',
    messages: [
      {
        id: 'm1',
        role: 'customer',
        content: 'I just received my order and the item is completely damaged.',
        timestamp: '11:00 AM',
      },
      {
        id: 'm2',
        role: 'ai',
        content:
          "I'm so sorry to hear that! Please send us a photo of the damage and we'll arrange a replacement immediately at no cost to you.",
        timestamp: '11:01 AM',
      },
      {
        id: 'm3',
        role: 'customer',
        content: 'Photo sent. This is really frustrating.',
        timestamp: '11:05 AM',
      },
      {
        id: 'm4',
        role: 'agent',
        content:
          "Thank you for the photo. We've confirmed the damage and a replacement has been dispatched. Tracking: 1Z999AA10987654321. Again, I sincerely apologise for the experience.",
        timestamp: '11:20 AM',
      },
    ],
    events: [
      {
        id: 'e1',
        type: 'started',
        description: 'Conversation started',
        timestamp: 'Jun 9, 2024 11:00 AM',
      },
      {
        id: 'e2',
        type: 'assigned',
        description: 'Assigned to Support team',
        timestamp: 'Jun 9, 2024 11:10 AM',
      },
      {
        id: 'e3',
        type: 'ai_resolved',
        description: 'Marked resolved',
        timestamp: 'Jun 9, 2024 11:25 AM',
      },
    ],
  },
];

export const ConversationsPage = () => {
  const { open: isDesktopSidebarOpen } = useSidebar();

  const [selectedId, setSelectedId] = useSearchParam('id');
  const [infoOpen, setInfoOpen] = useState(false);

  const selectedConversation =
    MOCK_CONVERSATIONS.find((c) => c.id === selectedId) ?? null;

  return (
    <div className="flex min-h-0 flex-1 overflow-hidden">
      <div
        className={cn(
          'hidden min-h-0 flex-1 overflow-hidden',
          isDesktopSidebarOpen ? 'lg:flex' : 'md:flex',
        )}
      >
        <ResizablePanelGroup orientation="horizontal" className="min-h-0 flex-1">
          <ResizablePanel
            defaultSize="280px"
            minSize="260px"
            maxSize="400px"
            className="flex flex-col"
          >
            <ConversationList
              conversations={MOCK_CONVERSATIONS}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel minSize="380px" className="flex min-w-0 flex-col">
            <ConversationThread
              conversation={selectedConversation}
              onBack={selectedId ? () => setSelectedId(undefined) : undefined}
              onInfo={() => setInfoOpen(true)}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
        <div className="hidden xl:flex xl:w-72 xl:flex-col">
          <ConversationInfo conversation={selectedConversation} />
        </div>
      </div>

      {!selectedId && (
        <div
          className={cn(
            'flex w-full flex-col',
            isDesktopSidebarOpen ? 'lg:hidden' : 'md:hidden',
          )}
        >
          <ConversationList
            conversations={MOCK_CONVERSATIONS}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
        </div>
      )}
      {selectedId && (
        <div
          className={cn(
            'flex min-w-0 flex-1 flex-col',
            isDesktopSidebarOpen ? 'lg:hidden' : 'md:hidden',
          )}
        >
          <ConversationThread
            conversation={selectedConversation}
            onBack={() => setSelectedId(undefined)}
            onInfo={() => setInfoOpen(true)}
          />
        </div>
      )}
      <Sheet open={infoOpen} onOpenChange={setInfoOpen}>
        <SheetContent
          side="right"
          className="w-full max-w-sm p-0"
          aria-describedby={undefined}
        >
          <SheetHeader className="border-border border-b px-4 py-3">
            <SheetTitle className="text-sm">Conversation info</SheetTitle>
          </SheetHeader>
          <ConversationInfo conversation={selectedConversation} />
        </SheetContent>
      </Sheet>
    </div>
  );
};
