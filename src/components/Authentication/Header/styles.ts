import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import LinearGradient from 'react-native-linear-gradient';
import Logo from '../../../assets/images/logo-home.svg';
import { Dimensions, Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

interface ContainerProps {
    isKeyboardVisible: boolean;
}

export const Gradient = styled(LinearGradient).attrs({
    start: { x: 0, y: 0 },
    end: { x: 0, y: 1 },
    colors: ['#2B90D9', '#53C4E8'],
    style: { flex: 1 }
}) <ContainerProps>`
    display: ${({ isKeyboardVisible }) => isKeyboardVisible ? 'none' : 'flex'};
    height: ${Dimensions.get('window').height * 0.3 + getStatusBarHeight()}px;
`;
export const Container = styled.View`
    height: 100%;
    width: 100%;
    align-items: center;
    justify-content: center;
`;

export const IcodsLogo = styled(Logo).attrs({
    width: RFValue(289),
    height: RFValue(170)
})`
`;

export const Title = styled.Text`
   font-size: ${RFValue(16)}px;
   font-family: ${({ theme }) => theme.fonts.medium};

   text-align: center;
   margin-top: ${RFValue(6)}px;

   color: ${({ theme }) => theme.colors.white};
   letter-spacing: ${Dimensions.get('window').width * 0.002}px;
`;
