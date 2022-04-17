import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
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
  WelcomeTitleContainer,
} from './styles';

import {useAuth} from '../../hooks/auth';
import {useTheme} from 'styled-components';
import {HighlightButton} from '../../components/Dashboard/HighlightButton';
import {ModalMoreDashboard} from '../../components/Dashboard/ModalMoreDashboard';

import HeaderDashboard from '../../components/Dashboard/HeaderDashboard';
import extractNameAndSurname from '../../utils/extractNameAndSurname';
import LoggedFooter from '../../components/LoggedFooter';
import CloudRightSmall from '../../assets/images/cloud-right-stripe-sm.svg';
import CloudLeftLarge from '../../assets/images/cloud-left-stripe-lg.svg';
import SocialIcon from '../../assets/images/Icons/social.svg';
import HistoryIcon from '../../assets/images/Icons/history.svg';
import ScanIcon from '../../assets/images/Icons/qrcode_scan.svg';
import analytics from '@react-native-firebase/analytics';

const Dashboard = () => {
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const [choosenActivityScope, setChoosenActivityScope] = useState<
    'all' | 'mine'
  >('all');
  const [modalVisible, setModalVisible] = useState(false);
  const {user, signOut} = useAuth();
  const {name, lastname} = user
    ? extractNameAndSurname(user.username)
    : {name: '', lastname: ''};
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
    navigation.navigate('Support');
  }
  function handleOpenProfilePage() {
    setModalVisible(false);
    navigation.navigate('Profile');
  }
  function handleOpenAboutPage() {
    setModalVisible(false);
    navigation.navigate('About');
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
          <WelcomeTitle>Bem vindo{'\n'}ao iCODS!</WelcomeTitle>

          <CloudLargeContainer>
            <CloudLeftLarge style={{position: 'absolute', left: 15, top: 0}} />
            <CloudRightSmall
              style={{position: 'absolute', right: 15, bottom: 0}}
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
            onPress={() => navigation.navigate('Scanner')}
          />

          <HighlightButton
            text="Histórico"
            icon={HistoryIcon}
            onPress={() => navigation.navigate('History')}
          />

          <HighlightButton
            text="Social"
            icon={SocialIcon}
            onPress={() => navigation.navigate('Working', {type: 'Social'})}
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

      <LoggedFooter isDashboard={true} />
    </Container>
  );
};

export default Dashboard;
