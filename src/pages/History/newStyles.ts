import styled from 'styled-components/native';
import CloudRightSmallIcon from '../../assets/images/cloud-right-stripe-sm.svg';
import CloudLeftLargeIcon from '../../assets/images/cloud-left-stripe-lg.svg';
import LargeSearch from '../../assets/images/Icons/large-search.svg'

import { RFValue } from 'react-native-responsive-fontsize';
import { Dimensions, FlatList } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { FilteredQRCodesByDate } from '.';

export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.colors.shape};
`;

export const Content = styled.View`
    flex: 1;
    margin-top: ${RFValue(27)}px;
    padding: 0 ${RFValue(15)}px;
    /* background-color: purple;        */
`;

export const QRCodeTitleContainer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    /* background-color: green; */
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

export const QRCodeList = styled.ScrollView.attrs({
    showsVerticalScrollIndicator: false,
    contentContainerStyle: {
        paddingBottom: getBottomSpace() + RFValue(83)
    }
})`
    height: 100%;
    /* background-color: red; */
`;


export const QRCodeFlatList = styled(
    FlatList as new () => FlatList<FilteredQRCodesByDate>
    ).attrs({
    showsVerticalScrollIndicator: false,
    contentContainerStyle: {
        paddingBottom: getBottomSpace() + RFValue(83)
    }
})`
`;

export const NotFountContainer = styled.View`
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
    font-family: ${({theme}) => theme.fonts.bold};


    color: ${({theme}) => theme.colors.title};
    text-align: center;
    letter-spacing: ${RFValue(0.18)}px;
`;

export const NoResultsFoundDescriptionText = styled.Text`
    font-size: ${RFValue(16)}px;
    font-family: ${({theme}) => theme.fonts.semi_bold};


    color: ${({theme}) => theme.colors.text};
    text-align: center;
    letter-spacing: ${RFValue(0.5)}px;
`;