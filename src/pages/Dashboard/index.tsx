import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  CloudLargeContainer,
  CloudSmallContainer,
  Container,
  FeedContainer,
  FeedHeader,
  FeedOptionsTitleContainer,
  FeedOptionTitle,
  FeedOptionTitleButton,
  FeedSubTitle,
  FeedSubTitleContainer,
  FeedTitle,
  Header,
  HighlightButtonList,
  HighlightTitle,
  HightLightListContainer,
  WelcomeContainer,
  WelcomeTitle,
  WelcomeTitleContainer
} from './styles';

import { useTheme } from 'styled-components';
import { HighlightButton } from '../../components/Dashboard/HighlightButton';
import { ModalMoreDashboard } from '../../components/Dashboard/ModalMoreDashboard';
import { useAuth } from '../../hooks/auth';

import analytics from '@react-native-firebase/analytics';
import CloudLeftLarge from '../../assets/images/cloud-left-stripe-lg.svg';
import CloudRightSmall from '../../assets/images/cloud-right-stripe-sm.svg';
import HistoryIcon from '../../assets/images/Icons/history.svg';
import ScanIcon from '../../assets/images/Icons/qrcode_scan.svg';
import SocialIcon from '../../assets/images/Icons/social.svg';
import HeaderDashboard from '../../components/Dashboard/HeaderDashboard';
import extractNameAndSurname from '../../utils/extractNameAndSurname';

const Dashboard = () => {
  const theme = useTheme();
  const { navigate } = useNavigation();
  const [choosenActivityScope, setChoosenActivityScope] = useState<
    'all' | 'mine'
  >('all');
  const [modalVisible, setModalVisible] = useState(false);
  const { user, signOut } = useAuth();
  const { name, lastname } = user
    ? extractNameAndSurname(user.username)
    : { name: '', lastname: '' };
  const nameAndLastname = `${name} ${lastname ? lastname : ''}`;
  const avatar = `https://ui-avatars.com/api/?size=1000&name=${nameAndLastname}&length=2&background=${theme.colors.profilePic}&rounded=true`;

  function handleOpenDashboardModal() {
    setModalVisible(true);
  }
  function handleCloseDashBoardModal() {
    setModalVisible(false);
  }
  function handleOpenSupportPage() {
    setModalVisible(false);
    navigate('Support');
  }
  function handleOpenProfilePage() {
    setModalVisible(false);
    navigate('Profile');
  }
  function handleOpenAboutPage() {
    setModalVisible(false);
    navigate('About');
  }
  async function handleSignOut() {
    setModalVisible(false);
    await signOut();
    await analytics().resetAnalyticsData();
  }

  return (
    <Container>
      <Header>
        <HeaderDashboard
          name={name}
          surname={lastname}
          avatar={avatar}
          ellipsisPressed={handleOpenDashboardModal}
        />
        <ModalMoreDashboard
          visible={modalVisible}
          pressedOut={handleCloseDashBoardModal}
          supportPage={handleOpenSupportPage}
          profilePage={handleOpenProfilePage}
          aboutPage={handleOpenAboutPage}
          signOut={handleSignOut}
        />
      </Header>

      <WelcomeContainer>
        <WelcomeTitleContainer>
          <WelcomeTitle>Bem vindo{'\n'}ao iCods!</WelcomeTitle>

          <CloudLargeContainer>
            <CloudLeftLarge style={{ position: 'absolute', left: 15, top: 0 }} />
            <CloudRightSmall
              style={{ position: 'absolute', right: 15, bottom: 0 }}
            />
          </CloudLargeContainer>
        </WelcomeTitleContainer>

        <CloudSmallContainer></CloudSmallContainer>
        <HighlightTitle>Selecione uma das opções abaixo</HighlightTitle>
      </WelcomeContainer>

      <HightLightListContainer>
        <HighlightButtonList>
          <HighlightButton
            text="Escanear"
            icon={ScanIcon}
            onPress={() => navigate('Escanear')}
          />

          <HighlightButton
            text="Histórico"
            icon={HistoryIcon}
            onPress={() => navigate('Histórico')}
          />

          <HighlightButton
            text="Social"
            icon={SocialIcon}
            onPress={() => navigate('Social')}
          />
        </HighlightButtonList>
      </HightLightListContainer>

      <FeedContainer>
        <FeedHeader>
          <FeedTitle>Atividades</FeedTitle>

          <FeedOptionsTitleContainer>
            <FeedOptionTitleButton
              onPress={() => setChoosenActivityScope('all')}
              active={choosenActivityScope === 'all'}>
              <FeedOptionTitle active={choosenActivityScope === 'all'}>
                Todas
              </FeedOptionTitle>
            </FeedOptionTitleButton>

            <FeedOptionTitleButton
              onPress={() => setChoosenActivityScope('mine')}
              active={choosenActivityScope === 'mine'}>
              <FeedOptionTitle active={choosenActivityScope === 'mine'}>
                Minhas
              </FeedOptionTitle>
            </FeedOptionTitleButton>
          </FeedOptionsTitleContainer>
        </FeedHeader>

        <FeedSubTitleContainer>
          <FeedSubTitle>Fique por dentro de tudo que aconteceu</FeedSubTitle>
        </FeedSubTitleContainer>
      </FeedContainer>

    </Container>
  );
};

export default Dashboard;
