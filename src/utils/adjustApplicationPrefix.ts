import { APPLICATION_PREFIX } from "../config/applicationPrefix";
import { PARAMETER_FROM_VIDEO, PARAMETER_FROM_REDEFINE_PASSWORD } from "../config/applicationPrefixParameters";
import { IDeepLinkParameters } from "../config/IDeepLinkParameters";
import { initialUrlPageName } from "../config/initialUrlPageName";

export const adjustApplicationPrefixUrl = (parameters: IDeepLinkParameters) => {
  let applicationPrefixUrl = '';

  if (PARAMETER_FROM_VIDEO in parameters) {
    applicationPrefixUrl = `${APPLICATION_PREFIX}/${initialUrlPageName.deeplink}/${parameters.id}`;
  } else if (PARAMETER_FROM_REDEFINE_PASSWORD in parameters) {
    const [email, pass] = parameters.email.split('%pass=');
    applicationPrefixUrl = `${APPLICATION_PREFIX}/${initialUrlPageName.redefine_password}/${email}/${pass}`;
  } else {
    applicationPrefixUrl = APPLICATION_PREFIX;
  }

  return applicationPrefixUrl;
};

