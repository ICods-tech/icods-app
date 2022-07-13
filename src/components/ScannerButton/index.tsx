import React from 'react';
import { BorderlessButtonProps } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

import { Button } from './styles';

import ScannerImg from '../../assets/images/ícone-qr-code.svg';

interface ScannerButtonProps extends BorderlessButtonProps {
  selected?: boolean;
}
export function ScannerButton({ selected, ...rest }: ScannerButtonProps) {
  return (
    <Button {...rest}>
      <ScannerImg
        width={RFValue(48)}
        height={RFValue(48)}
      />
    </Button>
  );
}
