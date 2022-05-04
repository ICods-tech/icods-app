import React from 'react';
import Modal from 'react-native-modal';
import ReportProblemIcon from '../../../assets/images/Icons/report_problem_icon.svg';
import { RFValue } from 'react-native-responsive-fontsize';
import { User, Logout, Paper } from 'react-native-iconly';
import { ButtonsContainer, Container, NavigationButton, NavigationButtonText } from './styles';
import { useTheme } from 'styled-components/native';

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
              color={theme.colors.dark}
              width={RFValue(16)}
              height={RFValue(16)}
            />
            <NavigationButtonText>Conta</NavigationButtonText>
          </NavigationButton>

          <NavigationButton onPress={supportPage}>
            <ReportProblemIcon
              color={theme.colors.dark}
              width={RFValue(16)}
              height={RFValue(16)}
            />
            <NavigationButtonText>Suporte</NavigationButtonText>
          </NavigationButton>

          <NavigationButton onPress={aboutPage}>
            <Paper
              color={theme.colors.dark}
              width={RFValue(16)}
              height={RFValue(16)}
            />
            <NavigationButtonText>Sobre</NavigationButtonText>
          </NavigationButton>

          <NavigationButton onPress={signOut}>
            <Logout
              color={theme.colors.dark}
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
