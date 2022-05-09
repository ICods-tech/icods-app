import styled from 'styled-components/native';

export const ForgotPasswordPopUPModal = styled.Modal`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const ForgotPasswordPopUPContainer = styled.View`
  width: 100%;
  height: 100%;
  background: ${({theme}) => theme.colors.darkOpacity04}

  align-items: center;
  justify-content: center;
`;

export const ForgotPasswordPopUPSubContainer = styled.View`
  background-color: #fff;
  width: 80%;
  height: 24%;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
`;

export const ForgotPasswordPopUPSubContainerIconContainer = styled.View`
  margin-top: 16px;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
`;

export const ForgotPasswordPopUPSubContainerTitle = styled.Text`
  font-size: 16px;
  font-weight: 800;
  line-height: 22px;
  font-family: Manrope;

  letter-spacing: 0.002px;
  color: #282C37;
`;

export const ForgotPasswordPopUPSubContainerText = styled.Text`
  width: 76%;
  text-align: center;
  margin-top: 15px;
  font-size: 14px;
  font-weight: 600;
  line-height: 22px;
  font-family: Manrope;

  letter-spacing: 0.002px;
  color: #282C37;
  opacity: 0.57;
`;
