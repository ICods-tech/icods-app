import styled from 'styled-components/native';

import {BorderlessButton} from 'react-native-gesture-handler';
import {RFValue} from 'react-native-responsive-fontsize';

export const Button = styled(BorderlessButton)`
  height: 100%;
  margin-bottom: ${RFValue(23.5)}px;
  align-items: center;
  justify-content: center;
`;
