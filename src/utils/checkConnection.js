import NetInfo from '@react-native-community/netinfo';
import {displayToast} from './Toast';

export async function checkConnection() {
  const state = await NetInfo.fetch();

  if (!state.isConnected) {
    displayToast({
      message1: 'Sem conexão com a internet',
      type: 'error',
      duration: 5000,
    });
  }

  return state.isConnected;
}
