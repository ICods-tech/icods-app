import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Keyboard, TextInput } from 'react-native';
import { CloseSquare, Password, User as IconProps } from 'react-native-iconly';
import Modal from 'react-native-modal';
import { RFValue } from 'react-native-responsive-fontsize';
import { SvgProps } from 'react-native-svg';
import { useTheme } from 'styled-components/native';
import { delay } from '../../utils/delay';
import PasswordInput from '../PasswordInput';
import {
  BottomButton,
  CloseButton,
  CloseButtonContainer,
  Container, Footer,
  FooterButtonText,
  IconContainer, InfoTextContainer,
  InfoTitle,
  InfoTitleContainer,
  ModalContainer,
  PasswordsContainer
} from './styles';

import { LOG } from '../../config';
import Toast from 'react-native-toast-message';
import api from '../../services/api';
const log = LOG.extend('ChangePasswordModal');


interface ModalInterface {
  confirmText?: string,
  handleCancelled?: () => void,
  handleConfirmed?: () => void,
  handleAsyncConfirmed?: () => Promise<void>,
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

export function ChangePasswordModal({
  title,
  visible,
  isTimeout = false,
  icon: Icon,
  onCloseModal,
  confirmText,
  setIsVisible,
  iconly: Iconly,
  handleCancelled,
  iconBackgroundColor,
  isFooterButtonsActived = false,
}: ModalInterface) {
  const theme = useTheme();

  const [myTimeout, setMyTimeout] = useState<NodeJS.Timeout>();
  const passwordInputRef = useRef<TextInput>(null);
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');

  const [isErrored, setIsErrored] = useState({
    currentPassword: false,
    newPassword: false,
    passwordNewConfirmation: false,
  });
  
  const clearInputs = useCallback(() => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
    setIsErrored({
      currentPassword: false,
      newPassword: false,
      passwordNewConfirmation: false,
    })    
  },[]);


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


  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setIsKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setIsKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [Keyboard]);


  const handleChangePassword = (async () => {
    try {
      await api.patch('resetPassword', {
        old_password: currentPassword,
        password: newPassword,
        password_confirmation: confirmNewPassword
      })
      onCloseModal();
      Toast.show({
        type: 'success',
        position: 'bottom',
        text1: 'Sua senha foi alterada com sucesso!',
        visibilityTime: 1000,
        bottomOffset: 100,
      });
      clearInputs()
    } catch (error: any) {
      // Melhorar tratamento de erros
      const erro = error.response.data;
      if(erro === 'Password confirmation must match new password'){
        setIsErrored({
          ...isErrored,
          newPassword: true,
          passwordNewConfirmation: true,
        })
      }
      if(erro === 'Old Password does not match'){
        setIsErrored({
          ...isErrored,
          currentPassword: true,
        })
      }
      log.error(error.message);
    }
  });



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
            <PasswordsContainer>
              <PasswordInput
                  ref={passwordInputRef}
                  iconly={Password}
                  defaultValue={currentPassword}
                  placeholder="Senha atual"
                  onChangeText={setCurrentPassword}
                  returnKeyType="send"
                  isErrored={isErrored.currentPassword}
                  value={currentPassword}
                />
              <PasswordInput
                  ref={passwordInputRef}
                  iconly={Password}
                  defaultValue={newPassword}
                  placeholder="Nova senha"
                  onChangeText={setNewPassword}
                  isErrored={isErrored.newPassword}
                  returnKeyType="send"
                  value={newPassword}
                />
              <PasswordInput
                  ref={passwordInputRef}
                  iconly={Password}
                  defaultValue={confirmNewPassword}
                  placeholder="Confirmar nova senha"
                  onChangeText={setConfirmNewPassword}
                  isErrored={isErrored.passwordNewConfirmation}
                  returnKeyType="send"
                  value={confirmNewPassword}
                />
            </PasswordsContainer>
          </InfoTextContainer>

          {isFooterButtonsActived && (
            <Footer>
              <BottomButton
                onPress={handleCancelled ? handleCancelled :
                  (() => { onCloseModal(), clearInputs() })}>
                <FooterButtonText color="cancel">cancelar</FooterButtonText>
              </BottomButton>

              <BottomButton
                onPress={handleChangePassword}>
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