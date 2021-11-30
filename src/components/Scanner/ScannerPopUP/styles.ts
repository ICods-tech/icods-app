import styled from 'styled-components/native';

interface LabelStyleProps {
  color: '#2B90D9' | '#DF2C2C',
}

export const ScannerPopUPModal = styled.Modal`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const ScannerPopUPContainer = styled.View`
  width: 100%;
  height: 100%;
  background-color: #f0000000;
  align-items: center;
  justify-content: center;
`;

export const ScannerPopUPSubContainer = styled.View`
  background-color: #fff;
  width: 80%;
  height: 28%;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
`;

export const ScannerPopUPSubContainerIconContainer = styled.View`
  margin-top: 16px;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
`;

export const ScannerPopUPSubContainerTitle = styled.Text`
  font-size: 16px;
  font-weight: 800;
  line-height: 22px;
  font-family: Manrope;

  letter-spacing: 0.002px;
  color: #282C37;
`;

export const ScannerPopUPSubContainerText = styled.Text`
  width: 90%;
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

export const ScannerPopUPSubContainerCloseButton = styled.TouchableOpacity`
  position: absolute;

  width: 25px;
  height: 25px;

  right: 15px;
  top: 15px;

  align-items: center;
  justify-content: center;
`;

export const ScannerPopUpContainerButtons = styled.View`
  margin: 16px 0;
  width: 90%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const ScannerPopUpContainerButtonsTouchableButton = styled.TouchableOpacity`

`;

export const ScannerPopUpContainerButtonsButtonLabel = styled.Text<LabelStyleProps>`
  color: ${(props) => props.color};
  font-size: 16px;
`;
