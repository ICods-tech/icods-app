import React from 'react';
import Modal from 'react-native-modal';
import {
  Container,
  Footer,
  ModalContainer,
  ModalConfirmButtonText,
  ModalCancelButtonText,
  BottomButton,
  IconContainer,
  CloseButtonContainer,
  ChangeInfoTitle,
  ChangeInfoDescription,
  ChangeInfoTextContainer,
} from './styles';
import { SvgProps } from 'react-native-svg';
import CloseModalIcon from '../../assets/images/Icons/Profile/close-modal-icon.svg'

interface ModalInterface {
  confirmText?: string,
  handleCancelled?: () => void,
  handleConfirmed?: () => void,
  handleSaveUpdatesconfirmed: () => Promise<void>,
  description: string,
  icon: any,
  iconBackgroundColor: string,
  initialDateValue?: undefined
  pressedOut: () => void,
  title: string,
  visible: boolean,
}

export interface colorsIconsProps {
  key: string;
  icon: React.FC<SvgProps>;
}

export function ChangeInfoModal({
  confirmText,
  description,
  icon,
  iconBackgroundColor,
  handleCancelled,
  handleConfirmed,
  handleSaveUpdatesconfirmed,
  pressedOut,
  title,
  visible,
}: ModalInterface) {
  return (
    <Container>
      <Modal
        animationIn={"fadeIn"}
        animationOut={"fadeOut"}
        isVisible={visible}
        onBackdropPress={pressedOut}
        useNativeDriver
        coverScreen={false}
      >
        <ModalContainer>
          <CloseButtonContainer
          >
            <CloseModalIcon onPress={() => {
              pressedOut()
            }} />
          </CloseButtonContainer>
          <IconContainer
            style={{ backgroundColor: iconBackgroundColor }}
          >
            {icon}
          </IconContainer>
          <ChangeInfoTextContainer>
            <ChangeInfoTitle>
              {title}
            </ChangeInfoTitle>
            <ChangeInfoDescription>
              {description}
            </ChangeInfoDescription>
          </ChangeInfoTextContainer>
          <Footer>
            <BottomButton
              onPress={handleCancelled ? handleCancelled : (() => {
                pressedOut()
              })}>
              <ModalCancelButtonText>cancelar</ModalCancelButtonText>
            </BottomButton>

            <BottomButton
              onPress={handleConfirmed ? handleConfirmed : (() => {
                handleSaveUpdatesconfirmed()
              })}>
              <ModalConfirmButtonText>{confirmText! ? confirmText : 'confirmar'}</ModalConfirmButtonText>
            </BottomButton>
          </Footer>
        </ModalContainer>
      </Modal>
    </Container>
  )
}