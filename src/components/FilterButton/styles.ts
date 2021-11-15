import styled from 'styled-components/native';
import Filter from '../../assets/images/Icons/filter_search.svg';
import { BorderlessButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled(BorderlessButton)`
    height: ${RFValue(32)}px;
    width: ${RFValue(32)}px;
`;


export const FilterIcon = styled(Filter).attrs({
    width: RFValue(32),
    height: RFValue(32),
})``;