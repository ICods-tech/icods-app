import React, {useEffect} from 'react';
import {LogBox, StatusBar, View} from 'react-native';
import 'react-native-gesture-handler';
import Toast, {BaseToast} from 'react-native-toast-message';
import {ThemeProvider} from 'styled-components';
import {LOG, Sentry} from './config';
import theme from './global/styles/theme';
import AppProvider from './hooks';
import {Routes} from './routes';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const log = LOG.extend('App');
import SplashScreen from 'react-native-splash-screen';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
  'new NativeEventEmitter',
  "exported from 'deprecated-react-native-prop-types'.",
]);

const toastConfig = {
  success: ({text1, text2, ...rest}: {text1: string; text2: string}) => (
    <BaseToast
      {...rest}
      style={{borderLeftColor: '#2c90d9'}}
      contentContainerStyle={{paddingHorizontal: 15}}
      text1Style={{
        fontSize: 12,
        fontWeight: 'bold',
      }}
      text1={text1}
      text2Style={{
        fontSize: 10,
      }}
      text2={text2}
      text1NumberOfLines={1}
      text2NumberOfLines={1}
    />
  ),
  error: ({text1, text2, ...rest}: {text1: string; text2: string}) => (
    <BaseToast
      {...rest}
      style={{borderLeftColor: 'red'}}
      contentContainerStyle={{paddingHorizontal: 15}}
      text1Style={{
        fontSize: 12,
        fontWeight: 'bold',
      }}
      text1={text1}
      text2Style={{
        fontSize: 10,
      }}
      text2={text2}
      text1NumberOfLines={1}
      text2NumberOfLines={1}
    />
  ),
  warning: ({text1, text2, ...rest}: {text1: string; text2: string}) => (
    <BaseToast
      {...rest}
      style={{borderLeftColor: 'orange'}}
      contentContainerStyle={{paddingHorizontal: 15}}
      text1Style={{
        fontSize: 12,
        fontWeight: 'bold',
      }}
      text1={text1}
      text2Style={{
        fontSize: 10,
      }}
      text2={text2}
      text1NumberOfLines={1}
      text2NumberOfLines={1}
    />
  ),
};

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.primary}
      />
      <View style={{flex: 1, backgroundColor: '#312e38'}}>
        <AppProvider>
          <Routes />
        </AppProvider>
      </View>
      <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
    </ThemeProvider>
  );
};

export default Sentry.wrap(App);
