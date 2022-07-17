import React from 'react';
import { LayoutChangeEvent } from 'react-native';
import {
  Cursor,
} from 'react-native-confirmation-code-field';

import {
  Cell,
  CellText
} from './styles';

export interface IRenderCell {
  pass: any;
  index: number;
  symbol: string;
  success: boolean;
  isFocused: boolean;
  confirmationCodeError: boolean;
  setConfirmationCodeError: (value: boolean) => void;
  getCellOnLayoutHandler: (index: number) => (event: LayoutChangeEvent) => void
}

export const VerificationCodeInput = ({
  pass,
  index,
  symbol,
  success,
  isFocused,
  confirmationCodeError,
  setConfirmationCodeError,
  getCellOnLayoutHandler }: IRenderCell) => {

  let textChild = null;

  if (symbol) {
    textChild = symbol;
  } else if (isFocused) {
    setConfirmationCodeError(false);
    textChild = <Cursor />;
  }

  return (
    <Cell
      key={index}
      focused={isFocused}
      isCorrect={success}
      errored={confirmationCodeError}
      editable={pass ? false : true}
      onLayout={getCellOnLayoutHandler(index)}
    >
      <CellText>
        {textChild}
      </CellText>
    </Cell>
  );
}