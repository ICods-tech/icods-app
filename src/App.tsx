import dynamicLinks from '@react-native-firebase/dynamic-links';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import * as Sentry from '@sentry/react-native';
import React, {useEffect, useState} from 'react';
import {StatusBar, View} from 'react-native';
import 'react-native-gesture-handler';
import Toast, {BaseToast} from 'react-native-toast-message';
import {ThemeProvider} from 'styled-components';
import theme from './global/styles/theme';
import AppProvider from './hooks';
import {linking} from './Linking';
import Routes from './routes';

Sentry.init({
  dsn: `${process.env.SENTRY_KEY}`,
  tracesSampleRate: 1.0,
});

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
};

const App = () => {
  const [deeplink, setDeeplink] = useState('');
  const handleDynamicLink = (link: any) => {
    console.log('the deeplink', link);
    if (link && String(link.url).includes('https://icods.com.br')) {
      setDeeplink(link.url);
    }
  };

  useEffect(() => {
    console.log('deeplink link', deeplink)
    const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
    // When the component is unmounted, remove the listener
    return () => unsubscribe();
  }, [deeplink]);

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer linking={linking}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={theme.colors.primary}
        />
        <View style={{flex: 1, backgroundColor: '#312e38'}}>
          <AppProvider>
            <Routes deeplink={deeplink} />
          </AppProvider>
        </View>
        <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default Sentry.wrap(App);
