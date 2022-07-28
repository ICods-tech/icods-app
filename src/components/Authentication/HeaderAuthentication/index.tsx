import React from 'react';
import { StatusBar, View } from 'react-native';
import { useTheme } from 'styled-components/native';
import Asteroid from '../../../assets/images/asteroid_image_2.svg';
import IcodsIcon from '../../../assets/images/icods_icon.svg';
import styles from './styles';

const HeaderAuthentication = () => {
  const theme = useTheme()
  return (
    <View>
      <StatusBar
        backgroundColor={theme.colors.primary}
        barStyle="light-content"
      />
      <View style={styles.container}>
        <View style={styles.iconPanel}>
          <Asteroid style={{ marginRight: -4 }} />
          <IcodsIcon style={styles.icodsIcon} />
        </View>
      </View>
    </View>
  )
}

export default HeaderAuthentication;