import React from 'react';
import {BorderlessButtonProps} from 'react-native-gesture-handler';

import ScannerImg from '../../../assets/images/icone-qrcode.svg';
import {RouteTitle} from '../RouteTitle';
import {Spacer} from '../Spacer';

import {Button} from './styles';

interface IScannerButtonProps extends BorderlessButtonProps {
  isActivated?: boolean;
}

export function ScannerButton({
  isActivated = false,
  ...rest
}: IScannerButtonProps) {
  return (
    <Button {...rest}>
      <ScannerImg />
      <Spacer top={2} />
      <RouteTitle title="Escanear" isActivated={isActivated} />
    </Button>
  );
}
