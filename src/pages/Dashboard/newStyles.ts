import { Dimensions } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.colors.shape};
`;

export const Header = styled.View`
    height: ${RFValue(80)}px;
`;

export const WelcomeContainer = styled.View`
    margin-top: ${RFValue(28)}px;
    padding: 0 ${RFValue(24)}px;
`;

export const WelcomeTitleContainer = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const CloudLargeContainer = styled.View`
    position: absolute;
    right: ${RFValue(70)};
`;

export const CloudSmallContainer = styled.View`
    position: absolute;
    bottom: 0;
    right: ${RFValue(21)}px;
`;

export const WelcomeTitle = styled.Text`
    font-size: ${RFValue(26)}px;
    font-weight: 700;
    letter-spacing: ${Dimensions.get('window').width*0.002}px;
    color: ${({theme}) => theme.colors.title};
`;

export const HighlightTitle = styled.Text`
    color: ${({theme}) => theme.colors.text};
    font-size: ${RFValue(14)}px;
    letter-spacing: ${Dimensions.get('window').width*0.002}px;
`;

export const HighlightButtonList = styled.ScrollView.attrs({
    showsHorizontalScrollIndicator: false,
    horizontal: true,
    contentContainerStyle: { paddingHorizontal: RFValue(16)}
})`
    margin-top: ${RFValue(28)}px;
    margin-bottom: ${RFValue(43)}px;
`;