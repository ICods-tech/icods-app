import { Dimensions } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import RightArrow from '../../assets/images/Icons/Right-arrow.svg';

export const ActivitiesContainer = styled.View`
  margin-top: ${RFValue(52)}px;
  align-items: center;
`

export const Container = styled.View`
  flex: 1;
  height: ${Dimensions.get('window').height}px;
  background-color: #fff;
`

export const CategoriesOuterContainer = styled.View`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: ${RFValue(20)}px;
  justify-content: flex-start;
  height: ${RFValue(356)}px;
`

export const CategoriesInnerContainer = styled.View`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: ${RFValue(20)}px;
  justify-content: space-between;
  height: ${RFValue(180)}px;
`

export const CategoryContainer = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  height: ${RFValue(42)}px;
  align-items: center;
  width: ${RFValue(280)}px;
  justify-content: space-between;
`

export const CategoriesHeader = styled.View`
  display: flex;
  margin-top: ${RFValue(20)}px;
  margin-bottom: ${RFValue(56)}px;
`

export const CategoriesText = styled.Text`
  font-style: normal;
  font-weight: 800;
  font-size: ${RFValue(16)}px;
  line-height: ${RFValue(19)}px;
  letter-spacing: ${Dimensions.get('window').width*0.002}px;
  color: #282C37;
`

export const RightArrowIcon = styled(RightArrow)`
  margin-left: auto;
`