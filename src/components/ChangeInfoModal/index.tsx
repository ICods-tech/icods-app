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
  visible: boolean,
  title: string,
  description: string,
  iconBackgroundColor: string,
  confirmText?: string,
  pressedOut: () => void,
  cancelButtonPressed?: () => void,
  confirmed: () => Promise<void>,
  icon: any,
  initialDateValue?: undefined
}

export interface colorsIconsProps {
  key: string;
  icon:  React.FC<SvgProps>;
}

export function ChangeInfoModal({
    icon,
    iconBackgroundColor,
    title,
    description,
    visible, 
    pressedOut, 
    confirmText,
    cancelButtonPressed,
    confirmed
  }: ModalInterface){
  return (
    <Container>
      <Modal
        style={{alignSelf: 'center'}}
        animationIn={"fadeIn"}
        animationOut={"fadeOut"}
        isVisible={visible}
        onBackdropPress={pressedOut}
      >
        <ModalContainer>
          <CloseButtonContainer
          >
            <CloseModalIcon onPress={() => {
                pressedOut()
            }}/>
          </CloseButtonContainer>
          <IconContainer
            style={{ backgroundColor: iconBackgroundColor }}
          >
            { icon }
          </IconContainer>
          <ChangeInfoTextContainer>
            <ChangeInfoTitle>
              { title }
            </ChangeInfoTitle>
            <ChangeInfoDescription>
              { description}
            </ChangeInfoDescription>
          </ChangeInfoTextContainer>
          <Footer>
            <BottomButton 
              onPress={cancelButtonPressed ? cancelButtonPressed : (() => {
                pressedOut()
            })}>
              <ModalCancelButtonText>cancelar</ModalCancelButtonText>
            </BottomButton>
            
            <BottomButton
              onPress={() => {
                confirmed()
              }}
              >
              <ModalConfirmButtonText>{ confirmText! ? confirmText : 'confirmar' }</ModalConfirmButtonText>
            </BottomButton>
          </Footer>
        </ModalContainer>
      </Modal>
    </Container>
  )
}