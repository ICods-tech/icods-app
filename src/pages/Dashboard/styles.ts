import {Dimensions} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import styled, {css} from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.white};
`;

export const Header = styled.View``;

export const WelcomeContainer = styled.View`
  margin-top: ${RFValue(36)}px;
  margin-bottom: ${RFValue(10)}px;
  padding: 0 ${RFValue(15)}px;
`;

export const WelcomeTitleContainer = styled.View`
  flex-direction: row;
  margin-bottom: ${RFValue(10)}px;
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
  font-size: ${RFValue(28)}px;
  font-family: ${({theme}) => theme.fonts.extra_bold};
  color: ${({theme}) => theme.colors.dark_800};
  line-height: ${RFValue(38)}px;
`;

export const HighlightTitle = styled.Text`
  color: ${({theme}) => theme.colors.text};
  font-size: ${RFValue(14)}px;
  font-family: ${({theme}) => theme.fonts.regular};
  letter-spacing: ${Dimensions.get('window').width * 0.002}px;
`;

export const HightLightListContainer = styled.View`
  height: ${RFValue(130)}px;
  margin-top: ${RFValue(10)}px;
`;

export const HighlightButtonList = styled.ScrollView.attrs({
  showsHorizontalScrollIndicator: false,
  horizontal: true,
  contentContainerStyle: {
    paddingHorizontal: RFValue(15),
  },
})`
  margin-top: ${RFValue(1)}px;
`;

export const FeedContainer = styled.View`
  margin-top: ${RFValue(31)}px;
  padding: 0 ${RFValue(15)}px;
  flex: 1;
`;

export const FeedHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: ${RFValue(22)}px;
`;

export const FeedTitle = styled.Text`
  font-size: ${RFValue(28)}px;
  font-family: ${({theme}) => theme.fonts.extra_bold};

  line-height: ${RFValue(38)}px;
  color: ${({theme}) => theme.colors.dark_800};
`;

export const FeedOptionsTitleContainer = styled.View`
  flex-direction: row;
  align-self: flex-end;
  justify-content: center;
  height: ${RFValue(27)}px;
  margin-left: ${RFValue(26)}px;
`;

interface FeedOptionsTitleProps {
  active: boolean;
}

export const FeedOptionTitleButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})<FeedOptionsTitleProps>`
  align-items: center;
  height: 100%;
  width: ${RFValue(70)}px;
  padding-bottom: ${RFValue(8)}px;

  ${({active}) =>
    active
      ? css`
          border-bottom-width: ${RFValue(2)}px;
          border-bottom-color: ${({theme}) => theme.colors.primary};
        `
      : css`
          border-bottom-width: ${RFValue(2)}px;
          border-bottom-color: transparent;
        `};
`;

export const FeedOptionTitle = styled.Text<FeedOptionsTitleProps>`
  font-size: ${RFValue(14)}px;
  font-family: ${({theme}) => theme.fonts.semi_bold};
  letter-spacing: ${Dimensions.get('window').width * 0.002}px;
  ${({active}) =>
    active
      ? css`
          color: ${({theme}) => theme.colors.primary};
        `
      : css`
          color: ${({theme}) => theme.colors.subtitle};
        `};
`;

export const FeedSubTitleContainer = styled.View``;

export const FeedSubTitle = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({theme}) => theme.fonts.regular};

  color: ${({theme}) => theme.colors.gray};
  letter-spacing: ${Dimensions.get('window').width * 0.002}px;
`;
