import React from 'react';
import Modal from 'react-native-modal';
import ReportProblemIcon from '../../../assets/images/Icons/report_problem_icon.svg';
import { RFValue } from 'react-native-responsive-fontsize';
import { User, Logout, Paper, Send } from 'react-native-iconly';
import { ButtonsContainer, Container, NavigationButton, NavigationButtonText } from './styles';
import { useTheme } from 'styled-components/native';
import { Share } from 'react-native';

interface ModalInterface {
  aboutPage: () => void;
  visible: boolean;
  pressedOut: () => void;
  profilePage: () => void;
  signOut: () => Promise<void>;
  supportPage: () => void;
}

export function ModalMoreDashboard({
  visible,
  pressedOut,
  supportPage,
  aboutPage,
  profilePage,
  signOut,
}: ModalInterface) {
  const theme = useTheme();

  const onSharePress = async () => {
    const appUrl = "https://icodsmobile.page.link/indicacao";
    await Share.share({
      message: `O que acha de criar vídeos via QR Code? Com este aplicativo você consegue de forma simples e gratuita!\n\n ${appUrl} `
    });
  };
  return (
    <Modal
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      isVisible={visible}
      onBackdropPress={pressedOut}
      useNativeDriver
    >
      <Container>
        <ButtonsContainer>
          <NavigationButton onPress={profilePage}>
            <User
              color={theme.colors.black}
              width={RFValue(16)}
              height={RFValue(16)}
            />
            <NavigationButtonText>Conta</NavigationButtonText>
          </NavigationButton>

          <NavigationButton onPress={supportPage}>
            <ReportProblemIcon
              color={theme.colors.black}
              width={RFValue(16)}
              height={RFValue(16)}
            />
            <NavigationButtonText>Suporte</NavigationButtonText>
          </NavigationButton>

          <NavigationButton onPress={aboutPage}>
            <Paper
              color={theme.colors.black}
              width={RFValue(16)}
              height={RFValue(16)}
            />
            <NavigationButtonText>Sobre</NavigationButtonText>
          </NavigationButton>

          <NavigationButton onPress={onSharePress}>
            <Send
              color={theme.colors.black}
              width={RFValue(16)}
              height={RFValue(16)}
            />
            <NavigationButtonText>Compartilhar</NavigationButtonText>
          </NavigationButton>

          <NavigationButton onPress={signOut}>
            <Logout
              color={theme.colors.black}
              width={RFValue(16)}
              height={RFValue(16)}
            />
            <NavigationButtonText>Sair</NavigationButtonText>
          </NavigationButton>
        </ButtonsContainer>
      </Container>
    </Modal>
  );
}
