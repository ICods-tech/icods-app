import styled from 'styled-components/native';
import CloudLeftLargeIcon from '../../assets/images/cloud-left-stripe-lg.svg';
import CloudRightSmallIcon from '../../assets/images/cloud-right-stripe-sm.svg';
import FavoriteCardButton from '../../assets/images/Icons/favorite_qrcode_card.svg';
import LargeSearch from '../../assets/images/Icons/large-search.svg';
import NotFavoritedCardButton from '../../assets/images/Icons/notFavorited_qrcode_card.svg';
import Delete from '../../assets/images/Icons/trash_qrcode_card.svg';

import { Dimensions, FlatList } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import { FilteredQRCodes, FilteredQRCodesByDate } from '.';

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.shape};
`;

export const Content = styled.View`
    flex: 1;
    padding: 0 ${RFValue(15)}px;
    margin-top: ${RFValue(8)}px;
`;

export const QRCodeTitleContainer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-top: ${RFValue(16)}px;
`;

export const QRCodeTitleDate = styled.Text`
    font-family: ${({ theme }) => theme.fonts.extra_bold};
    font-size: ${RFValue(16)}px;
    
    color: ${({ theme }) => theme.colors.title};
    
    letter-spacing: ${Dimensions.get('window').width * 0.002}px;
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

export const QRCodeOptionsContainer = styled.View`
    flex-direction: row;
    height: 100%;
    width: ${RFValue(105)}px;
    align-items: center;
    justify-content: center;
`;

export const FavoritedButton = styled.TouchableOpacity`
    height: ${RFValue(45)}px;
    width: ${RFValue(45)}px;
`;

export const FavoriteCardButtonIcon = styled(FavoriteCardButton).attrs({
    width: RFValue(45),
    height: RFValue(45),
})``;

export const NotFavoritedCardButtonIcon = styled(NotFavoritedCardButton).attrs({
    width: RFValue(45),
    height: RFValue(45),
})``;

export const DeleteButton = styled.TouchableOpacity`
    height: ${RFValue(45)}px;
    width: ${RFValue(45)}px;

    margin-left: ${RFValue(15)}px;
`;

export const DeleteButtonIcon = styled(Delete).attrs({
    width: RFValue(45),
    height: RFValue(45),
})`
`;

export const QRCodeDateList = styled(
    FlatList as new () => FlatList<FilteredQRCodesByDate>
).attrs({
    showsVerticalScrollIndicator: false,
    contentContainerStyle: {
        paddingBottom: getBottomSpace() + RFValue(83),
    }
})``;

export const QRCodeList = styled(
    FlatList as new () => FlatList<FilteredQRCodes>
).attrs({
    showsVerticalScrollIndicator: false,
})``;

export const NotFoundContainer = styled.View`
    margin-top: ${RFValue(98)}px;
    align-items: center;
    justify-content: center;
 `;

export const LargeSearchIcon = styled(LargeSearch).attrs({
    width: RFValue(120),
    height: RFValue(120),
})``;

export const NoResultsFoundText = styled.Text`
    font-size: ${RFValue(24)}px;
    font-family: ${({ theme }) => theme.fonts.bold};
    color: ${({ theme }) => theme.colors.title};
    text-align: center;
    letter-spacing: ${RFValue(0.18)}px;
`;

export const NoResultsFoundDescriptionText = styled.Text`
    font-size: ${RFValue(16)}px;
    font-family: ${({ theme }) => theme.fonts.semi_bold};
    color: ${({ theme }) => theme.colors.text};
    text-align: center;
    letter-spacing: ${RFValue(0.5)}px;
`;