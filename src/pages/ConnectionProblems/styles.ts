import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    background-color: #fff;
    align-items: center;
    justify-content: center;
`;

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.bold};
    font-size: 28px;
    line-height: 38px;
    text-align: center;
    margin: 24px 0 20px;

    color: rgba(0, 0, 0, 0.87);
`;

export const Message = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    width: 80%;
    font-size: 16px;
    line-height: 22px;
    text-align: center;

    color: rgba(0, 0, 0, 0.4);
    opacity: 0.57;
`;

export const ButtonContainer = styled.View`
  width: 80%;
  margin-top: ${RFValue(48)}px;
`;