import React, { useEffect, useState } from "react";
import {
  CloseIconContainer,
  ForgotPasswordHeaderContainer,
  ForgotPasswordPopUPContainer,
  ForgotPasswordPopUPModal,
  ForgotPasswordPopUPSubContainer,
  ForgotPasswordPopUPSubContainerIconContainer,
  ForgotPasswordPopUPSubContainerText,
  ForgotPasswordPopUPSubContainerTitle,
} from "./styles";
import { Message } from "react-native-iconly";
import CloseIcon from "../../../assets/images/Icons/close-icon-top-modal.svg";

interface ForgotPasswordPopUPProps {
  isVisible: boolean;
  setIsVisible: (status: boolean) => void;
}

const ForgotPasswordPopUP = ({
  isVisible,
  setIsVisible,
}: ForgotPasswordPopUPProps) => {
  const CLOSE_POP_UP_TIME = 3000;

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(false);
    }, CLOSE_POP_UP_TIME);
  }, [isVisible]);

  return (
    <ForgotPasswordPopUPModal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => {}}
    >
      <ForgotPasswordPopUPContainer>
        <ForgotPasswordPopUPSubContainer>
          <ForgotPasswordHeaderContainer>
            <CloseIconContainer
              onPress={() => {
                setIsVisible(false);
              }}
            >
              <CloseIcon />
            </CloseIconContainer>
          </ForgotPasswordHeaderContainer>
          <ForgotPasswordPopUPSubContainerIconContainer>
            <Message />
          </ForgotPasswordPopUPSubContainerIconContainer>
          <ForgotPasswordPopUPSubContainerTitle>
            Enviamos um e-mail para você
          </ForgotPasswordPopUPSubContainerTitle>
          <ForgotPasswordPopUPSubContainerText>
            Verifique a caixa de entrada do seu e-mail!{"\n"}
            Ah, caso não esteja lá, confira no seu Spam 😉
          </ForgotPasswordPopUPSubContainerText>
        </ForgotPasswordPopUPSubContainer>
      </ForgotPasswordPopUPContainer>
    </ForgotPasswordPopUPModal>
  );
};

export { ForgotPasswordPopUP };