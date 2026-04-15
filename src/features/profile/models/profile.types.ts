export interface ProfileScreenProps {
  accountId?: string | number;
  accessToken?: string;
  onLoadComplete?: () => void;
  onAuthMissingPress?: () => void;
}
