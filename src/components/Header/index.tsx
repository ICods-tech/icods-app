import React from 'react';
import {View, TouchableOpacity, Text, ColorValue} from 'react-native';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import BackButton from '../../assets/images/back.svg';
import BackButtonWhite from '../../assets/images/back-button-white.svg';

interface HeaderProps {
  page: string;
  navigate: string;
  color?: ColorValue;
  isVideoPlayer?: boolean;
}

const Header = ({page, navigate, color, isVideoPlayer}: HeaderProps): JSX.Element => {
  const navigation = useNavigation();

  return (
    <View style={[styles.container]}>
      <TouchableOpacity
        onPress={() => {
          if (navigate === 'back') {
            navigation.goBack();
          } else {
            navigation.navigate(`${navigate}`);
          }
        }}>
        {isVideoPlayer ? <BackButtonWhite/> : <BackButton /> }
      </TouchableOpacity>
      <Text
        style={[
          styles.title,
          {
            color: color ? color : '#282C37',
          },
        ]}>
        {page}
      </Text>
    </View>
  );
};

export default Header;
