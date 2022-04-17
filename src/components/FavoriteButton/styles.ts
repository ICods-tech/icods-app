import styled from 'styled-components/native';
import NotFavorited from '../../assets/images/Icons/favorite_search.svg';
import Favorited from '../../assets/images/Icons/favorited_search.svg';
import {BorderlessButton} from 'react-native-gesture-handler';
import {RFValue} from 'react-native-responsive-fontsize';

interface FavoriteItemContainerProps {
  background: 'WHITE' | 'BLUE';
}

export const Button = styled(BorderlessButton)`
  height: ${RFValue(32)}px;
  width: ${RFValue(32)}px;
`;

export const NotFavoriteIcon = styled(NotFavorited).attrs({
  width: RFValue(16),
  height: RFValue(16),
})``;

export const FavoriteItemContainer = styled.View<FavoriteItemContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${RFValue(32)}px;
  height: ${RFValue(32)}px;
  border-radius: ${RFValue(16)}px;
  background: ${({background, theme}) =>
    background === 'WHITE' ? theme.colors.shape : theme.colors.primary};
  shadow-color: black;
  shadow-opacity: 1;
  shadow-radius: 32px;
  elevation: ${({background}) => (background === 'WHITE' ? 6 : 0)};
`;

export const FavoritedIcon = styled(Favorited).attrs({
  width: RFValue(16),
  height: RFValue(16),
})``;
