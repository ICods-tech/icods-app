import dynamicLinks from '@react-native-firebase/dynamic-links';
import 'react-native-gesture-handler';
import {
  NavigationContainer,
  NavigationContainerRefContext,
  useNavigation,
} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StatusBar, View} from 'react-native';
import Toast, {BaseToast} from 'react-native-toast-message';
import {ThemeProvider} from 'styled-components';
import theme from './global/styles/theme';
import AppProvider from './hooks';
import {linking} from './Linking';
import Routes from './routes';
import analytics from '@react-native-firebase/analytics';
import {Sentry, LOG} from './config';
const log = LOG.extend('App');

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
  const routeNameRef = React.useRef();
  const navigationRef = React.useRef();
  const [deeplink, setDeeplink] = useState('');
  const handleDynamicLink = (link: any) => {
    log.info('the deeplink', link);
    if (link && String(link.url).includes('https://icods.com.br')) {
      setDeeplink(link.url);
    }
  };

  useEffect(() => {
    log.info('deeplink link', deeplink);
    const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
    // When the component is unmounted, remove the listener
    return () => unsubscribe();
  }, [deeplink]);

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer
        ref={navigationRef}
        linking={linking}
        onReady={() => {
          routeNameRef.current = navigationRef.current?.getCurrentRoute().name;
        }}
        onStateChange={async () => {
          const previousRouteName = routeNameRef.current;
          const currentRouteName = navigationRef.current?.getCurrentRoute()
            .name;

          if (previousRouteName !== currentRouteName) {
            await analytics().logScreenView({
              screen_name: currentRouteName,
              screen_class: currentRouteName,
            });
          }
          routeNameRef.current = currentRouteName;
        }}>
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
