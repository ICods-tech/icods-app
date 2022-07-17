import React from 'react';

import {
  Container,
  Title
} from './styles';

interface IRouteTitleProps {
  title: string;
  isActivated: boolean;
}

export function RouteTitle({ title, isActivated }: IRouteTitleProps) {
  return (
    <Container>
      <Title isActivated={isActivated}>{title}</Title>
    </Container>
  );
}