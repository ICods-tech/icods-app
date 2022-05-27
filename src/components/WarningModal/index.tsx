import React, { useState } from 'react';
import { CloseSquare, User as IconProps } from 'react-native-iconly';
import Modal from 'react-native-modal';
import { RFValue } from 'react-native-responsive-fontsize';
import { SvgProps } from 'react-native-svg';
import { useTheme } from 'styled-components/native';
import { delay } from '../../utils/delay';
import {
  BottomButton,
  CloseButton,
  CloseButtonContainer,
  Container, Footer,
  FooterButtonText,
  IconContainer,
  InfoDescription,
  InfoDescriptionContainer,
  InfoTextContainer,
  InfoTitle,
  InfoTitleContainer,
  ModalContainer
} from './styles';

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
  isTimeout?: boolean,
  onCloseModal: () => void,
  setIsVisible?: (value: boolean) => void,
  title: string,
  visible: boolean,
}

export function WarningModal({
  title,
  visible,
  isTimeout = false,
  icon: Icon,
  onCloseModal,
  confirmText,
  setIsVisible,
  description,
  iconly: Iconly,
  handleCancelled,
  handleConfirmed,
  handleAsyncConfirmed,
  iconBackgroundColor,
  isFooterButtonsActived = false,
}: ModalInterface) {
  const theme = useTheme();

  const [myTimeout, setMyTimeout] = useState<NodeJS.Timeout>();

  function cleanTimoutAndCloseModal() {
    if (myTimeout) {
      clearTimeout(myTimeout as NodeJS.Timeout);
    }
    setIsVisible!(false)
    onCloseModal()
  }

  function initializeModal() {
    if (isTimeout) {
      delay(3500).then(() => {
        setIsVisible!(false)
        onCloseModal()
      })
    }
  }



  return (
    <Container>
      <Modal
        animationIn={"fadeIn"}
        animationOut={"fadeOut"}
        isVisible={visible}
        onModalShow={initializeModal}
        onBackdropPress={isTimeout ? cleanTimoutAndCloseModal : onCloseModal}
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
                <CloseButton onPress={isTimeout ? cleanTimoutAndCloseModal : onCloseModal}>
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
                  (() => { onCloseModal() })}>
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