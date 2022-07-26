import React, { useState } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { RouteTitle } from "../RouteTitle";

import { Container } from "./styles";
import { ISwitchRouteIconReturn, switchRouteIcon } from "./utils/switchRouteIcon";

interface RouteButtonProps {
  title: string;
  isActivated: boolean;
}


export function RouteButton({
  title,
  isActivated,
}: RouteButtonProps) {

  const [icon] = useState<ISwitchRouteIconReturn>(switchRouteIcon(title));
  const { activatedIcon: ActivatedIcon, deactivatedIcon: DeactivatedIcon } = icon;

  return (
    <Container>
      {isActivated ?
        <ActivatedIcon width={RFValue(24)} height={RFValue(24)} />
        :
        <DeactivatedIcon width={RFValue(24)} height={RFValue(24)} />
      }

      <RouteTitle title={title} isActivated={isActivated} />
    </Container>
  );
}