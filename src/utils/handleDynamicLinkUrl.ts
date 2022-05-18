import { DYNAMIC_LINK_FALLBACK_URL } from "../config/dynamicLinkFallbackUrl";
import { APPLICATION_PREFIX } from "../config/applicationPrefix";
import { extract, parse } from 'query-string';
import { adjustApplicationPrefixUrl } from "./adjustApplicationPrefix";
import { IDeepLinkParameters } from "../config/IDeepLinkParameters";


export const handleDynamicLinkUrl = (link: any) => {
  console.log("Handling dynamic link", link)
  let applicationPrefixUrl = APPLICATION_PREFIX;
  if (link && (link.url).includes(DYNAMIC_LINK_FALLBACK_URL)) {
    const query = extract(link.url);
    const parameters = parse(query);
    applicationPrefixUrl = adjustApplicationPrefixUrl(parameters as IDeepLinkParameters);
  }

  return applicationPrefixUrl
}
