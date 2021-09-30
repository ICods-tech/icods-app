import { Dimensions } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.colors.shape};
`;

export const Header = styled.View`
    height: ${RFValue(100)}px;
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
    flex: 1;
    padding: 0 ${RFValue(16)}px;
    /* align-items: center; */
    /* justify-content: space-between; */
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

export const HightLightListContainer = styled.View`
    height: ${RFValue(160)}px;
`;

export const HighlightButtonList = styled.ScrollView.attrs({
    showsHorizontalScrollIndicator: false,
    horizontal: true,
    contentContainerStyle: { 
        paddingHorizontal: RFValue(16),
    }
})`
    margin-top: ${RFValue(28)}px;
`;

export const FeedContainer = styled.View`
    margin-top: ${RFValue(43)}px;
    padding: 0 ${RFValue(24)}px;
    flex: 1;
`;

export const FeedHeader = styled.View`
    flex-direction: row;
    justify-content: space-between;
`

export const FeedTitle = styled.Text`
    font-size: ${RFValue(26)}px;
    font-weight: 700;
    color: ${({theme}) => theme.colors.title};
    letter-spacing: ${Dimensions.get('window').width*0.002}px;
`;

export const FeedOptionsTitleContainer = styled.View`
    flex-direction: row;
    align-self: flex-end;
    justify-content: center;

    height: ${RFValue(27)}px;   
    width: ${RFValue(177)}px;
`;

interface FeedOptionsTitleProps {
    active: 'all' | 'mine';
}

export const FeedOptionTitleButton = styled(RectButton)`
    align-items: center;
    justify-content: space-between;
    width: ${RFValue(89)}px;
`;

export const FeedOptionTitleAll = styled.Text<FeedOptionsTitleProps>`
    font-size: ${RFValue(14)}px;
    letter-spacing: ${Dimensions.get('window').width*0.002}px;
    font-weight: 600;
    color: ${({theme, active }) => active === 'all' ? 
        theme.colors.primary : theme.colors.text};
`;

export const FeedOptionTitleMine = styled.Text<FeedOptionsTitleProps>`
    font-size: ${RFValue(14)}px;
    letter-spacing: ${Dimensions.get('window').width*0.002}px;
    font-weight: 600;
    color: ${({theme, active }) => active === 'mine' ? 
        theme.colors.primary : theme.colors.text};
`;

export const FeedOptionsTitleBorderAll = styled.View<FeedOptionsTitleProps>`
    /* margin-top: ${RFValue(8)}px; */
    width: 100%;
    height: ${RFValue(2)}px;
    background-color: ${({theme, active}) => active === 'all' ? 
    theme.colors.primary : theme.colors.transparent};
`;


export const FeedOptionsTitleBorderMine = styled.View<FeedOptionsTitleProps>`
    /* margin-top: ${RFValue(8)}px; */
    width: 100%;
    height: ${RFValue(2)}px;
    background-color: ${({theme, active}) => active === 'mine' ? 
    theme.colors.primary : theme.colors.transparent};
`;

export const FeedSubTitleContainer = styled.View`
    margin-top: ${RFValue(13)}px;
`;

export const FeedSubTitle = styled.Text`
    font-size: ${RFValue(14)}px;
    color: ${({theme}) => theme.colors.text};
    letter-spacing: ${Dimensions.get('window').width*0.002}px;
`;