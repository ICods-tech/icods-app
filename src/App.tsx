import analytics from "@react-native-firebase/analytics";
import {
  NavigationContainer
} from "@react-navigation/native";

import React, { useRef } from "react";
import { LogBox, StatusBar, View } from "react-native";
import "react-native-gesture-handler";
import Toast, { BaseToast } from "react-native-toast-message";
import { ThemeProvider } from "styled-components";
import { LOG, Sentry } from "./config";
import theme from "./global/styles/theme";
import AppProvider from "./hooks";
import { linking } from "./linking";
import { AppRoutes } from "./routes/app.routes";
import { AuthRoutes } from "./routes/auth.routes";
const log = LOG.extend("App");

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);

const toastConfig = {
  success: ({ text1, text2, ...rest }: { text1: string; text2: string }) => (
    <BaseToast
      {...rest}
      style={{ borderLeftColor: "#2c90d9" }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 12,
        fontWeight: "bold",
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
  error: ({ text1, text2, ...rest }: { text1: string; text2: string }) => (
    <BaseToast
      {...rest}
      style={{ borderLeftColor: "red" }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 12,
        fontWeight: "bold",
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
  const routeNameRef = useRef();
  const navigationRef = useRef() as any;

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer
        ref={navigationRef as any}
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
        }}
      >
        <StatusBar
          barStyle="light-content"
          backgroundColor={theme.colors.primary}
        />
        <View style={{ flex: 1, backgroundColor: "#312e38" }}>
          <AppProvider>
            {/* <Routes linking={linking}/> */}
            {/* <View style={{ flex: 1, backgroundColor: "#fff"}}> */}
              {/* <AuthRoutes /> */}
              <AppRoutes />
            {/* </View> */}
          </AppProvider>
        </View>
        <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default Sentry.wrap(App);