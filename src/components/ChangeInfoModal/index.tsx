import React from 'react';
import Modal from 'react-native-modal';
import {
  Container,
  Footer,
  ModalContainer,
  BottomButton,
  IconContainer,
  ChangeInfoTitle,
  ChangeInfoDescription,
  ChangeInfoTextContainer,
  CloseButton,
  FooterButtonText,
  CloseButtonContainer,
} from './styles';
import { CloseSquare } from 'react-native-iconly';
import { useTheme } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { User as IconProps } from 'react-native-iconly';

interface ModalInterface {
  confirmText?: string,
  handleCancelled?: () => void,
  handleConfirmed?: () => void,
  handleSaveUpdatesconfirmed: () => Promise<void>,
  description: string,
  icon: typeof IconProps,
  iconBackgroundColor: string,
  initialDateValue?: undefined
  pressedOut: () => void,
  title: string,
  visible: boolean,
}

export function ChangeInfoModal({
  confirmText,
  description,
  icon: Icon,
  iconBackgroundColor,
  handleCancelled,
  handleConfirmed,
  handleSaveUpdatesconfirmed,
  pressedOut,
  title,
  visible,
}: ModalInterface) {
  const theme = useTheme();
  return (
    <Container>
      <Modal
        animationIn={"fadeIn"}
        animationOut={"fadeOut"}
        isVisible={visible}
        onBackdropPress={pressedOut}
        useNativeDriver
      >
        <ModalContainer>
          <CloseButtonContainer>
            <CloseButton onPress={() => { pressedOut(), console.log('teste') }}>
              <CloseSquare color={theme.colors.title}
                height={RFValue(24)}
                width={RFValue(24)}
              />
            </CloseButton>
          </CloseButtonContainer>

          <IconContainer
            backgroundColor={iconBackgroundColor}
          >
            <Icon
              set='bold'
              color={theme.colors.shape}
              width={RFValue(24)}
              height={RFValue(24)}
            />
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
              onPress={handleCancelled ? handleCancelled : (() => { pressedOut() })}>
              <FooterButtonText color="cancel">cancelar</FooterButtonText>
            </BottomButton>

            <BottomButton
              onPress={handleConfirmed ? handleConfirmed : (() => { handleSaveUpdatesconfirmed() })}>
              <FooterButtonText color="save">{confirmText ? confirmText : 'confirmar'}</FooterButtonText>
            </BottomButton>
          </Footer>

        </ModalContainer>
      </Modal>
    </Container>
  )
}