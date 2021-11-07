import styled from 'styled-components/native';
import NotFavorited from '../../assets/images/Icons/favorite_search.svg';
import Favorited from '../../assets/images/Icons/favorited_search.svg';
import { BorderlessButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

export const Button = styled(BorderlessButton)`
    height: ${RFValue(32)}px;
    width: ${RFValue(32)}px;
`;

export const NotFavoriteIcon = styled(NotFavorited).attrs({
    width: RFValue(32),
    height: RFValue(32),
})``;

export const FavoritedIcon = styled(Favorited).attrs({
    width: RFValue(32),
    height: RFValue(32),
})``;