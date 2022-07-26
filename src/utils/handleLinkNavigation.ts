import { Alert, Linking } from 'react-native';

async function handleLinkNavigation(url: string) {
  try {
    await Linking.openURL(url);
  } catch (err: any) {
    Alert.alert('Error', 'Falha ao abrir link');
    throw new Error(err.message);
  }
}

export default handleLinkNavigation;
