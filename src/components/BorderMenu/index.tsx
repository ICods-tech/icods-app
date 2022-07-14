import React from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { SvgProps } from "react-native-svg";

import { BorderTop, Container } from "./styles";

interface BorderMenuProps {
  selected: boolean;
  activatedIcon: React.FC<SvgProps>;
  deactivatedIcon: React.FC<SvgProps>;
}


export default function BorderMenu({ selected, activatedIcon: ActivatedIcon, deactivatedIcon: DeactivatedIcon }: BorderMenuProps) {

  return (
    <Container>
      {selected && <BorderTop />}
      {selected ? <ActivatedIcon width={RFValue(24)} height={RFValue(24)} /> : <DeactivatedIcon width={RFValue(24)} height={RFValue(24)} />}

    </Container>
  );
}