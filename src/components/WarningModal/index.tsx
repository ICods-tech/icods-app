import React from 'react';
import Modal from 'react-native-modal';
import {
  Footer,
  Container,
  InfoTitle,
  CloseButton,
  BottomButton,
  IconContainer,
  ModalContainer,
  InfoDescription,
  FooterButtonText,
  InfoTextContainer,
  CloseButtonContainer,
  InfoTitleContainer,
  InfoDescriptionContainer,
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
  handleAsyncConfirmed?: () => Promise<void>,
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
  title,
  visible,
  icon: Icon,
  pressedOut,
  confirmText,
  description,
  iconly: Iconly,
  handleCancelled,
  handleConfirmed,
  handleAsyncConfirmed,
  iconBackgroundColor,
  isFooterButtonsActived = false,
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
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ModalContainer isFooterButtonsActived={isFooterButtonsActived}>

          {
            !isFooterButtonsActived && (
              <CloseButtonContainer>
                <CloseButton onPress={pressedOut}>
                  <CloseSquare color={theme.colors.title}
                    height={RFValue(24)}
                    width={RFValue(24)}
                  />
                </CloseButton>
              </CloseButtonContainer>)
          }

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

          <InfoTextContainer>
            <InfoTitleContainer>
              <InfoTitle>
                {title}
              </InfoTitle>
            </InfoTitleContainer>
            <InfoDescriptionContainer>
              <InfoDescription>
                {description}
              </InfoDescription>
            </InfoDescriptionContainer>
          </InfoTextContainer>

          {isFooterButtonsActived && (
            <Footer>
              <BottomButton
                onPress={handleCancelled ? handleCancelled :
                  (() => { pressedOut() })}>
                <FooterButtonText color="cancel">cancelar</FooterButtonText>
              </BottomButton>

              <BottomButton
                onPress={handleConfirmed ? handleConfirmed :
                  (() => { handleAsyncConfirmed!() })}>
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