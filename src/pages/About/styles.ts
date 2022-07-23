import {Dimensions} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import RightArrow from '../../assets/images/Icons/Right-arrow.svg';

export const ActivitiesContainer = styled.View`
  margin-top: ${RFValue(52)}px;
  align-items: center;
`;

export const Container = styled.View`
  flex: 1;
  height: ${Dimensions.get('window').height}px;
  background-color: #fff;
  padding: 0 ${RFValue(15)}px;
`;

export const CategoriesInnerContainer = styled.View`
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  height: ${RFValue(180)}px;
`;

export const AboutButtonContainer = styled.View`
  margin-bottom: ${RFValue(10)}px;
`;

export const CategoriesHeader = styled.View`
  margin-top: ${RFValue(56)}px;
  margin-bottom: ${RFValue(56)}px;
`;

export const CategoriesText = styled.Text`
  font-size: ${RFValue(16)}px;
  line-height: ${RFValue(19)}px;
  letter-spacing: ${Dimensions.get('window').width * 0.002}px;
  color: ${({theme}) => theme.colors.black};
  font-family: ${({theme}) => theme.fonts.medium};
`;
export const CategoriesTextTitle = styled.Text`
  font-weight: 800;
  font-size: ${RFValue(16)}px;
  line-height: ${RFValue(19)}px;
  letter-spacing: ${Dimensions.get('window').width * 0.002}px;
  color: ${({theme}) => theme.colors.black};
  font-family: ${({theme}) => theme.fonts.semi_bold};
`;

export const CategoryContainer = styled.TouchableOpacity`
  flex-direction: row;
  height: ${RFValue(42)}px;
  align-items: center;
  width: ${RFValue(280)}px;
  justify-content: space-between;
`;

export const RightArrowIcon = styled(RightArrow)`
  margin-left: auto;
`;
