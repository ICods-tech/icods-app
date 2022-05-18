import { APPLICATION_PREFIX } from "./config/applicationPrefix";
import dynamicLinks from "@react-native-firebase/dynamic-links";
import { handleDynamicLinkUrl } from "./utils/handleDynamicLinkUrl";
import { Linking } from "react-native";

const config = {
  screens: {
    Deeplink: {
      path: "deeplink/:url",
      parse: {
        url: (url) => `${url}`,
      },
    },
    ForgotPassword: {
      path: "redefine_password/:email",
      parse: {
        email: (email) => `${email}`,
        // password: (password) => `${password}`
      },
    },
  },
};

export const linking = {
  prefixes: [APPLICATION_PREFIX],

  async getInitialURL() {
    const url = await Linking.getInitialURL();
    const dynamicLinkUrl = await dynamicLinks().getInitialLink();

    if (dynamicLinkUrl) {
      const preffixedLink = handleDynamicLinkUrl(dynamicLinkUrl);
      return preffixedLink;
    }

    if (url != null) {
      return url;
    }

    return APPLICATION_PREFIX;
  },

  subscribe(listener) {
    const onReceiveURL = ({ url }) => listener(url);
    const linkingEventListener = Linking.addEventListener("url", onReceiveURL);

    const handleDynamicLink = (dynamicLink) => {
      const preffixedLink = handleDynamicLinkUrl(dynamicLink);
      listener(preffixedLink);
    };
    const unsubscribeToDynamicLinks = dynamicLinks().onLink(handleDynamicLink);

    return () => {
      unsubscribeToDynamicLinks();
      linkingEventListener.remove();
    };
  },

  config,
};