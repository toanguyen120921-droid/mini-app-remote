export interface ButtonProps {
  title?: string;
  onPress?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
}

export interface CardProps {
  title: string;
  description?: string;
  imageUrl?: string;
  badge?: string;
  showTimestamp?: boolean;
}

// Shared types with Host App
export interface RemoteConfig {
  apiUrl: string;
  features: {
    analytics: boolean;
    darkMode: boolean;
  };
}
