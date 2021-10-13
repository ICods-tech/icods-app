import styled from 'styled-components/native';

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
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
`;

export const ScannerPopUPSubContainerTitle = styled.Text`
  font-size: 16px;
  font-weight: 800;
  line-height: 22px;

  letter-spacing: 0.002px;
  color: #282C37;
`;

export const ScannerPopUPSubContainerText = styled.Text`
  margin-top: 15px;
  font-size: 14px;
  font-weight: 600;
  line-height: 22px;

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
