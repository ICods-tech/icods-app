import styled from 'styled-components/native';
import CloudRightSmallIcon from '../../assets/images/cloud-right-stripe-sm.svg';
import CloudLeftLargeIcon from '../../assets/images/cloud-left-stripe-lg.svg';
import { RFValue } from 'react-native-responsive-fontsize';
import { Dimensions } from 'react-native';

export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.colors.shape};
`;

export const Content = styled.View`
    margin-top: ${RFValue(27)}px;
    padding: 0 ${RFValue(15)}px;
    background-color: purple;
`;

export const QRCodeTitleContainer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: green;
`;

export const QRCodeTitleDate = styled.Text`
    font-family: ${({theme}) => theme.fonts.extra_bold};
    font-size: ${RFValue(16)}px;
    
    color: ${({theme}) => theme.colors.title};
    
    letter-spacing: ${Dimensions.get('window').width*0.002}px;
`;


export const CloudContainer = styled.View`
    flex: 1;
    padding-left: ${RFValue(49)}px;
    padding-right: ${RFValue(36)}px;
`;

export const CloudLeftLarge = styled(CloudLeftLargeIcon).attrs({
    width: RFValue(42),
    height: RFValue(27),
})`
    align-self: flex-start;
`;

export const CloudRightSmall = styled(CloudRightSmallIcon).attrs({
    width: RFValue(33),
    height: RFValue(32),
})`
    align-self: flex-end;
`;

