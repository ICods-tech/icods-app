import React, { useEffect, useState } from "react";
import { ForgotPasswordPopUPContainer, ForgotPasswordPopUPModal, ForgotPasswordPopUPSubContainer, ForgotPasswordPopUPSubContainerIconContainer, ForgotPasswordPopUPSubContainerText, ForgotPasswordPopUPSubContainerTitle } from './styles';
import MailIcon from '../../../assets/images/Icons/mail_icon.svg'

interface ForgotPasswordPopUPProps {
  isVisible: boolean;
  setIsVisible: (status: boolean) => void;
}

const ForgotPasswordPopUP = ({isVisible, setIsVisible}: ForgotPasswordPopUPProps) => {

  useEffect(()=>{
    setTimeout(() => {setIsVisible(false);}, 3000);
  }, [isVisible])

  return (
    <ForgotPasswordPopUPModal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => {}}
    >
      <ForgotPasswordPopUPContainer>
        <ForgotPasswordPopUPSubContainer>
          <ForgotPasswordPopUPSubContainerIconContainer>
            <MailIcon />
          </ForgotPasswordPopUPSubContainerIconContainer>
          <ForgotPasswordPopUPSubContainerTitle>
            Enviamos um e-mail para você
          </ForgotPasswordPopUPSubContainerTitle>
          <ForgotPasswordPopUPSubContainerText>
            Cheque nas caixa de entrada e spam só para garantir ;
          </ForgotPasswordPopUPSubContainerText>
        </ForgotPasswordPopUPSubContainer>
      </ForgotPasswordPopUPContainer>

    </ForgotPasswordPopUPModal>
  );
}

export {ForgotPasswordPopUP}
