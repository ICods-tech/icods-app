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
import { SvgProps } from 'react-native-svg';

interface ModalInterface {
  confirmText?: string,
  handleCancelled?: () => void,
  handleConfirmed?: () => void,
  handleSaveUpdatesconfirmed?: () => Promise<void>,
  description: string,
  iconly?: typeof IconProps,
  icon?: React.FC<SvgProps>,
  iconBackgroundColor: string,
  initialDateValue?: undefined
  isFooterButtonsActived?: boolean,
  pressedOut: () => void,
  title: string,
  visible: boolean,
}

export function WarningModal({
  confirmText,
  description,
  iconly: Iconly,
  icon: Icon,
  iconBackgroundColor,
  isFooterButtonsActived = false,
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
            {
              (Iconly && (<Iconly
                set='bold'
                color={theme.colors.shape}
                width={RFValue(24)}
                height={RFValue(24)}
              />)) ||

              (Icon && (<Icon />))
            }

          </IconContainer>

          <ChangeInfoTextContainer>
            <ChangeInfoTitle>
              {title}
            </ChangeInfoTitle>
            <ChangeInfoDescription>
              {description}
            </ChangeInfoDescription>
          </ChangeInfoTextContainer>

          {isFooterButtonsActived && (
            <Footer>
              <BottomButton
                onPress={handleCancelled ? handleCancelled :
                  (() => { pressedOut() })}>
                <FooterButtonText color="cancel">cancelar</FooterButtonText>
              </BottomButton>

              <BottomButton
                onPress={handleConfirmed ? handleConfirmed :
                  (() => { handleSaveUpdatesconfirmed!() })}>
                <FooterButtonText color="save">{confirmText ? confirmText : 'confirmar'}</FooterButtonText>
              </BottomButton>
            </Footer>
          )
          }
        </ModalContainer>
      </Modal>
    </Container>
  )
}