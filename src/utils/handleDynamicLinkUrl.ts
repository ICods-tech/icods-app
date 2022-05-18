import { APPLICATION_PREFIX } from "../config/applicationPrefix";
import { DYNAMIC_LINK_FALLBACK_URL } from "../config/dynamicLinkFallbackUrl";

export const handleDynamicLinkUrl = (link: any) => {
  console.log("Handling dynamic link", link);
  if (link && String(link.url).includes(DYNAMIC_LINK_FALLBACK_URL)) {
    console.log("Here, the deeplink is:", link);
    return APPLICATION_PREFIX;
  }
};