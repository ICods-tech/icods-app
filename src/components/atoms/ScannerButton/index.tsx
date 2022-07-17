import React from 'react';
import { BorderlessButtonProps } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

import ScannerImg from '../../../assets/images/ícone-qr-code.svg';

import { Button } from './styles';


export function ScannerButton({ ...rest }: BorderlessButtonProps) {
  return (
    <Button {...rest}>
      <ScannerImg
        width={RFValue(48)}
        height={RFValue(48)}
      />
    </Button>
  );
}
