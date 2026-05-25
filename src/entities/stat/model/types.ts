export interface Stat {
  id: string;
  label: string;
  value: string | number;
  change?: {
    value: string;
    trend: 'up' | 'down' | 'neutral';
  };
  icon?: string;
  color?: 'default' | 'success' | 'warning' | 'danger' | 'info';
}
