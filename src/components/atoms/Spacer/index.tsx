import React from 'react';

import { Container } from './styles';

export interface ISpacerProps {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}

export function Spacer({ top, right, bottom, left }: ISpacerProps) {
  return <Container top={top} right={right} bottom={bottom} left={left} />;
}
