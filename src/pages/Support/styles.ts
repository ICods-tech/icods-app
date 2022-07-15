import { Dimensions } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import CloudRightSmallIcon from '../../assets/images/cloud-right-stripe-spt.svg';

export const Title = styled.Text`
  font-size: ${RFValue(26)}px;

  font-family: ${({ theme }) => theme.fonts.extra_bold};
  color: ${({ theme }) => theme.colors.title};

  letter-spacing: ${Dimensions.get('window').width * 0.001}px;

  margin-left: ${RFValue(17)}px;
  margin-bottom: 4px;
`;

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.shape};
  padding: 0 ${RFValue(15)}px;
`;

export const ContainerTitle = styled.View`
  width: 100%;
  margin-top: ${RFValue(36)}px;
  margin-bottom: ${RFValue(48)}px;
`;

export const ContainerBodyMessage = styled.View`
  width: 100%;
  margin-top: ${RFValue(12)}px;
`;

export const BodyMessage = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.semi_bold};
  font-size: ${RFValue(16)}px;
  opacity: 0.87;
  letter-spacing: ${Dimensions.get('window').width * 0.0005}px;
`;

export const InputContainer = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    height: RFValue(232),
  }
})`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.cloudly};
  margin-top: ${RFValue(36)}px;
  margin-bottom: ${RFValue(36)}px;
  padding: ${RFValue(18)}px;
`;

export const Input = styled.TextInput`
  height: 100%;
  width: 100%;
  text-align: justify;
`;

export const ContainerButton = styled.View`
  width: 80%;
  margin-top: ${RFValue(16)}px;
  margin-bottom: ${RFValue(36)}px;
  height: ${RFValue(38)}px;
  align-items: center;
  justify-content: center;
  align-self: center;
`;

export const CloudContainer = styled.View`
  padding-left: ${RFValue(49)}px;
  padding-right: ${RFValue(36)}px;
`;

export const CloudRightSmall = styled(CloudRightSmallIcon).attrs({
  width: RFValue(36),
  height: RFValue(36),
})`
  align-self: flex-end;
`;
