import styled from 'styled-components/native';
import Filter from '../../assets/images/Icons/filter_search.svg';
import { BorderlessButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled(BorderlessButton)`
    height: ${RFValue(32)}px;
    width: ${RFValue(32)}px;
`;

export const FilterItemContainer = styled.View`
    display: flex; 
    align-items: center;
    justify-content: center;
    width: ${RFValue(32)}px;
    height: ${RFValue(32)}px;
    border-radius: ${RFValue(16)}px;
    background: #4790d3;
`

export const FilterIcon = styled(Filter).attrs({
    width: RFValue(32),
    height: RFValue(32),
})``;