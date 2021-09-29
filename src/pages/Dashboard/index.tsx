import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native'
import { 
  View, 
  Text, 
  TouchableWithoutFeedback, 
} from 'react-native';

import { 
  CloudLargeContainer, 
  CloudSmallContainer, 
  Container, 
  Header, 
  HighlightButtonList, 
  HighlightTitle, 
  WelcomeContainer, 
  WelcomeTitle, 
  WelcomeTitleContainer 
} from './newStyles';

import styles from './styles';

import { HighlightButton } from '../../components/Dashboard/HighlightButton';
import HeaderDashboard from '../../components/Dashboard/HeaderDashboard'
import BottomAuthentication from '../../components/Authentication/BottomAuthentication'
import { useAuth } from '../../hooks/auth'
import extracNameAndSurname from '../../utils/extractNameAndSurname'
import CloudLeftLarge from '../../assets/images/cloud-left-stripe-lg.svg'
import CloudRightSmall from '../../assets/images/cloud-right-stripe-sm.svg'
import DashboardFooter from '../../components/LoggedFooter'
import ModalMoreDashboard from '../../components/Dashboard/ModalMoreDashboard'

import SocialIcon from '../../assets/images/Icons/social.svg';
import HistoryIcon from '../../assets/images/Icons/history.svg';
import ScanIcon from '../../assets/images/Icons/qrcode_scan.svg';
import { RFValue } from 'react-native-responsive-fontsize';


const Dashboard = () => {
  const navigation = useNavigation()
  const [choosenActivityScope, setChoosenActivityScope] = useState<'all' | 'mine'>('all')
  const [modalVisible, setModalVisible] = useState(false)
  const { user, signOut } = useAuth()
  const { name, surname } = user ? extracNameAndSurname(user.name) : { name: '', surname: '' }

  return (
    <Container>

      <Header>
        <HeaderDashboard
          name={name}
          surname={surname}
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
          onPress={() => {}}
        />
      </HighlightButtonList>  


        <View>
        <View style={styles.activitiesContainer}>
          <View style={styles.activitiesHeader}>
            <Text style={styles.activitiesText}>Atividades</Text>
            <View style={styles.specificActivitiesContainer}>
              <TouchableWithoutFeedback onPress={() => setChoosenActivityScope('all')}>
                <View style={choosenActivityScope === 'all' && styles.allActivitiesTextWrapper}>
                  <Text
                    style={choosenActivityScope === 'all'
                    ? styles.allActivitiesTextSelection
                    : styles.allActivitiesText}>Todas</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => setChoosenActivityScope('mine')}>
                <View style={choosenActivityScope === 'mine'
                  ? styles.myActivitiesTextWrapperSelected
                  : styles.myActivitiesTextWrapper}>
                  <Text
                    style={choosenActivityScope === 'mine'
                    ? styles.myActivitiesTextSelection
                    : styles.myActivitiesText}>Minhas</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
          <View style={styles.belowActivitiesTextContainer}>
            <Text style={styles.belowActivitiesText}>Fique por dentro de tudo que aconteceu</Text>
          </View>
        </View>
      <DashboardFooter
        isDashboard={true}
        />
        </View>
    </Container>
  )
}

export default Dashboard;