import 'react-native-gesture-handler';
import React from 'react'
import { ThemeProvider } from 'styled-components';
import { NavigationContainer } from '@react-navigation/native'
import { View, StatusBar } from 'react-native'
import AppProvider from './hooks'
import Routes from './routes'
import Toast, { BaseToast } from 'react-native-toast-message';
import theme from './global/styles/theme';

const toastConfig = {
  success: ({ text1, text2, ...rest }: {text1: string, text2: string}) => (
    <BaseToast
      {...rest}
      style={{ borderLeftColor: '#2c90d9' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 12,
        fontWeight: 'bold'
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
  error: ({ text1, text2, ...rest }: {text1: string, text2: string}) => (
    <BaseToast
      {...rest}
      style={{ borderLeftColor: 'red' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 12,
        fontWeight: 'bold'
      }}
      text1={text1}
      text2Style={{
        fontSize: 10,
      }}
      text2={text2}
      text1NumberOfLines={1}
      text2NumberOfLines={1}
      // text2={null}
    />
  )
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <StatusBar barStyle='light-content' backgroundColor={theme.colors.primary}/>
        <View style={{ flex: 1, backgroundColor: '#312e38' }}>
          <AppProvider>
          <Routes/>
          </AppProvider>
        </View>
        <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
      </NavigationContainer>
    </ThemeProvider>
  )
}

export default App;
