import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native'
import { 
  CloudLargeContainer, 
  CloudSmallContainer, 
  Container, 
  FeedContainer, 
  FeedHeader, 
  FeedOptionsTitleBorderAll, 
  FeedOptionsTitleBorderMine, 
  FeedOptionsTitleContainer, 
  FeedOptionTitleAll, 
  FeedOptionTitleButton, 
  FeedOptionTitleMine, 
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

import { HighlightButton } from '../../components/Dashboard/HighlightButton';
import { useAuth } from '../../hooks/auth'

import HeaderDashboard from '../../components/Dashboard/HeaderDashboard'
import extractNameAndSurname from '../../utils/extractNameAndSurname'
import LoggedFooter from '../../components/LoggedFooter'
import ModalMoreDashboard from '../../components/Dashboard/ModalMoreDashboard'

import CloudRightSmall from '../../assets/images/cloud-right-stripe-sm.svg'
import CloudLeftLarge from '../../assets/images/cloud-left-stripe-lg.svg'
import SocialIcon from '../../assets/images/Icons/social.svg';
import HistoryIcon from '../../assets/images/Icons/history.svg';
import ScanIcon from '../../assets/images/Icons/qrcode_scan.svg';
import { useTheme } from 'styled-components';


const Dashboard = () => {
  const theme = useTheme();
  const navigation = useNavigation()
  const [choosenActivityScope, setChoosenActivityScope] = useState<'all' | 'mine'>('all')
  const [modalVisible, setModalVisible] = useState(false)
  const { user, signOut } = useAuth()
  const { name, surname } = user ? extractNameAndSurname(user.name) : { name: '', surname: '' }
  const nameAndSurname = `${name} ${surname ? surname : ''}`;
  const avatar = `https://ui-avatars.com/api/?size=1000&name=${nameAndSurname}&length=2&background=${theme.colors.profilePic}&rounded=true`;

  return (
    <Container>
      <Header>
        <HeaderDashboard
          name={name}
          surname={surname}
          avatar={avatar}
          ellipsisPressed={() => setModalVisible(!modalVisible)}
        />
        <ModalMoreDashboard
          visible={modalVisible}
          pressedOut={() => setModalVisible(!modalVisible)}
          supportPage={() =>{
            setModalVisible(false)
            navigation.navigate('Support')
          }}
          profilePage={() => {
            setModalVisible(false)
            navigation.navigate('Profile')
          }}
          aboutPage={() => {
            setModalVisible(false)
            navigation.navigate('About')
          }}
          signOut={async () => {
            setModalVisible(false)
            await signOut()
          }}
        />
      </Header>
      
      <WelcomeContainer>
          <WelcomeTitleContainer>
            <WelcomeTitle>Bem vindo{"\n"}ao iCODS!</WelcomeTitle>
            
            <CloudLargeContainer>
              <CloudLeftLarge  style={{position: 'absolute', left: 15,  top: 0}}/>
              <CloudRightSmall style={{position: 'absolute', right: 15, bottom: 0}}/>
            </CloudLargeContainer>
          </WelcomeTitleContainer>

          <CloudSmallContainer>
          </CloudSmallContainer>
        <HighlightTitle>Selecione uma das opções abaixo</HighlightTitle>
      </WelcomeContainer>
        
      <HightLightListContainer>
        <HighlightButtonList>
          <HighlightButton 
            text='Escanear'
            icon={ScanIcon}
            onPress={() => navigation.navigate('Scanner')}
            />
          
          <HighlightButton 
            text='Histórico'
            icon={HistoryIcon}
            onPress={() => navigation.navigate('History')}
            />
          
          <HighlightButton 
            text='Social'
            icon={SocialIcon}
            onPress={() => navigation.navigate('Working', { type: 'Social' })}
            />
        </HighlightButtonList>  
      </HightLightListContainer>  

      <FeedContainer>
            <FeedHeader>
              <FeedTitle>Atividades</FeedTitle>
              
              <FeedOptionsTitleContainer>
                <FeedOptionTitleButton 
                  onPress={() => setChoosenActivityScope('all')}>
                    <>
                    <FeedOptionTitleAll 
                      active={choosenActivityScope}
                    >Todas</FeedOptionTitleAll>
                  <FeedOptionsTitleBorderAll active={choosenActivityScope}></FeedOptionsTitleBorderAll>
                  </>
                </FeedOptionTitleButton>
                
                <FeedOptionTitleButton 
                  onPress={() => setChoosenActivityScope('mine')}>
                    <FeedOptionTitleMine
                      active={choosenActivityScope}>
                      Minhas</FeedOptionTitleMine>
                    <FeedOptionsTitleBorderMine active={choosenActivityScope}></FeedOptionsTitleBorderMine>
                </FeedOptionTitleButton>
              </FeedOptionsTitleContainer>
            </FeedHeader>

            <FeedSubTitleContainer>
              <FeedSubTitle 
                >Fique por dentro de tudo que aconteceu
              </FeedSubTitle>
            </FeedSubTitleContainer>
      </FeedContainer>

      <LoggedFooter
        isDashboard={true}
        />
    </Container>
  )
}

export default Dashboard;