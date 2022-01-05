import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Dimensions } from 'react-native';

export const ModalContainer = styled.Modal`
   flex: 1;
   align-items: center;
   justify-content: center;
`;

export const ScreenContainer = styled.View`
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    align-items: center;
    justify-content: center;
`;

export const SubContainer = styled.View`
    background-color: #fff;
    width: 80%;
    height: 75%;
    border-radius: 4px;
    align-items: center;
    justify-content: center;
    padding: 0;
`;

export const Title = styled.Text`
    fontFamily: Manrope;
    fontStyle: normal;
    fontWeight: 800;
    fontSize: 14px;
    lineHeight: 22px;
    margin: 16px 0;
    color: rgba(0, 0, 0, 0.87);
`;

export const TextContainer = styled.ScrollView`
    width: 90%;
    height: 50%;
`;

export const TextContainerTitle = styled.Text`
    fontFamily: Manrope;
    fontStyle: normal;
    fontWeight: 800;
    fontSize: 14px;
    lineHeight: 19px;
    marginTop: 8px;
    color: rgba(0, 0, 0, 0.87);
`;

export const TextContainerText = styled.Text`
    width: 95%;
    fontFamily: Manrope;
    fontStyle: normal;
    fontWeight: 400;
    fontSize: 14px;
    lineHeight: 19px;
    color: rgba(0, 0, 0, 0.87);
`;

export const ButtonsContainer = styled.View`
    width: 90%;
    height: 10%;
    margin: 8px 0;
    flex-direction: row;
    justify-content: flex-end;
`;

export const BottomButton = styled.TouchableOpacity`
    margin-left: ${RFValue(8)}px;
    
    align-items: center;
    justify-content: center;
    margin: 0 4px;
`;

export const ButtonLabelConfirm = styled.Text`
    text-transform: uppercase;
    font-family: ${({ theme }) => theme.fonts.medium};
    font-size: ${RFValue(14)}px;
    letter-spacing: ${Dimensions.get('window').width * 0.001}px;
    
    color: ${({ theme }) => theme.colors.primary};
`;

export const ButtonLabelCancel = styled.Text`
    text-transform: uppercase;
    font-family: ${({ theme }) => theme.fonts.medium};
    font-size: ${RFValue(14)}px;
    letter-spacing: ${Dimensions.get('window').width * 0.001}px;
    
    color: ${({ theme }) => theme.colors.cancelButton};
    opacity: 0.40;
`;
