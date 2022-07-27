import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import theme from '../../global/styles/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  textContainer: {
    position: 'absolute',
    paddingHorizontal: RFValue(15),
    paddingVertical: RFValue(20),
    justifyContent: 'space-around',
  },

  textParagraph: {
    marginTop: RFValue(36),
    marginLeft: RFValue(16),
    fontSize: RFValue(16),
    color: theme.colors.white,
    fontFamily: theme.fonts.medium,
  },
});

export default styles;
