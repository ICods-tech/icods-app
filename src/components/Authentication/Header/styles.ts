import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import LinearGradient from 'react-native-linear-gradient';
import Logo from '../../../assets/images/logo-home.svg';
import { Dimensions, Platform } from 'react-native';
interface ContainerProps {
    isInputFocus: boolean;
}
export const Gradient = styled(LinearGradient).attrs({ 
      start:{ x: 0, y: 0 },
      end:{ x: 0, y: 1 },
      colors:['#2B90D9', '#53C4E8'],
      style:{ flex: 1 }
})<ContainerProps>`
    display: ${({isInputFocus}) => isInputFocus ? 'none' : 'flex'};
    height: ${Dimensions.get('window').height*0.25}px;
`;
export const Container = styled.View`
    height: 100%;
    width: 100%;
    align-items: center;
    justify-content: center;
`;

export const IcodsLogo = styled(Logo).attrs({
    width: RFValue(249),
    height: RFValue(140)
})`
`;

export const Title = styled.Text`
   font-size: ${RFValue(14)}px;
   font-weight: 500;
   text-align: center;
   margin-top: ${RFValue(4)}px;

   color: ${({theme}) => theme.colors.shape};
   letter-spacing: ${Dimensions.get('window').width*0.002}px;
`;
