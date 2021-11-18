import React from 'react';
import Modal from 'react-native-modal';
import UserIcon from '../../../assets/images/Icons/user_icon.svg'
import ReportProblemIcon from '../../../assets/images/Icons/report_problem_icon.svg'
import SignOutIcon from '../../../assets/images/Icons/sign_out_icon.svg'
import { RFValue } from 'react-native-responsive-fontsize';
import styles from './styles'

import { 
  View, 
  Text, 
  TouchableOpacity, 
  TouchableWithoutFeedback 
} from 'react-native'


interface ModalInterface {
  visible: boolean,
  pressedOut: () => void,
  profilePage: () => void,
  supportPage: () => void,
  signOut: () => Promise<void>
}

const ModalMoreDashboard = ({ 
  visible, 
  pressedOut, 
  supportPage, 
  profilePage, 
  signOut 
}: ModalInterface) => {
  return (
    <Modal
      style={styles.dropdownStyle}
      animationIn={"fadeIn"}
      animationOut={"fadeOut"}
      isVisible={visible}
      onBackdropPress={pressedOut}
    >
          <View >
            <TouchableOpacity style={styles.dropdownEdgeOptions} onPress={profilePage}>
              <UserIcon 
                width={RFValue(16)}
                height={RFValue(16)}
              />
              <Text style={styles.dropdownOptionsText}>Conta</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dropdownSecondOption}>
              <ReportProblemIcon 
                width={RFValue(16)}
                height={RFValue(16)}
              />
              <Text style={styles.dropdownOptionsText} onPress={supportPage}>Suporte</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.dropdownEdgeOptions} onPress={signOut}>
              <SignOutIcon 
                width={RFValue(16)}
                height={RFValue(16)}
              />
              <Text style={styles.dropdownOptionsText}>Sair</Text>
            </TouchableOpacity>
          </View>
    </Modal>
  )
}

export default ModalMoreDashboard