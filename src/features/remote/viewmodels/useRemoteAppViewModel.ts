import {useCallback, useEffect} from 'react';
import {Alert, useColorScheme} from 'react-native';
import {
  REMOTE_CAPABILITIES,
  REMOTE_CONTENT,
} from '../models/remoteApp.model';

interface UseRemoteAppViewModelParams {
  onLoadComplete?: () => void;
  onRequestUpdate?: () => void;
}

export const useRemoteAppViewModel = ({
  onLoadComplete,
  onRequestUpdate,
}: UseRemoteAppViewModelParams) => {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    onLoadComplete?.();
  }, [onLoadComplete]);

  const handleOpenRemoteAction = useCallback(() => {
    Alert.alert(REMOTE_CONTENT.alertTitle, REMOTE_CONTENT.alertMessage);
  }, []);

  const handleRequestUpdate = useCallback(() => {
    onRequestUpdate?.();
  }, [onRequestUpdate]);

  return {
    isDarkMode,
    content: REMOTE_CONTENT,
    capabilities: REMOTE_CAPABILITIES,
    handleOpenRemoteAction,
    handleRequestUpdate,
  };
};

