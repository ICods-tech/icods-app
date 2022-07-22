import styled from 'styled-components/native';
import { ISpacerProps } from '.';

export const Container = styled.View<ISpacerProps>`
  margin-top: ${({ top }) => top || 0}px;
  margin-right: ${({ right }) => right || 0}px;
  margin-bottom: ${({ bottom }) => bottom || 0}px;
  margin-left: ${({ left }) => left || 0}px;
`;
