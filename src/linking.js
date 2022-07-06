import dynamicLinks from "@react-native-firebase/dynamic-links";
import { Linking } from "react-native";
import { APPLICATION_PREFIX } from "./config/applicationPrefix";
import { initialUrlPageName } from "./config/initialUrlPageName";
import { handleDynamicLinkUrl } from "./utils/handleDynamicLinkUrl";

const config = {
  screens: {
    Deeplink: {
      path: `${initialUrlPageName.deeplink}/:url`,
      parse: {
        url: (url) => `${url}`,
      },
    },
    RedefinePassword: {
      path: `${initialUrlPageName.redefine_password}/:email/:pass`,
      parse: {
        email: (email) => `${email}`,
        pass: (pass) => `${pass}`
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
