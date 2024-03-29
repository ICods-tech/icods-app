import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { TouchableWithoutFeedback, ColorValue, SafeAreaView, Text, View } from 'react-native';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import styles from './styles';

import Pulse from '../../assets/images/Icons/editor/pulse.svg';
import ErrorProcessing from '../../assets/images/Icons/editor/error_processing.svg';
import analytics from '@react-native-firebase/analytics';
import { LOG } from '../../config';

const log = LOG.extend('Processing');

const Processing = ({ route, _ }: any) => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const { qrcode, video } = route.params;
  const [color, setColor] = useState<ColorValue>('#2B90D9');
  const [textTitle, setTextTitle] = useState('Aguarde um momento');
  const [text, setText] = useState('Estamos processando seu iCod e garantimos que será rapido! Assim que concluído, você ja pode presenteá-lo!');

  const [processedError, setProcessedError] = useState(false);


  const sendVideo = async () => {
    setColor('#2B90D9');
    setTextTitle('Aguarde um momento');
    setText('Estamos processando seu iCod e garantimos que será rapido! Assim que concluído, você ja pode presenteá-lo!');
    setProcessedError(false);

    let formData = new FormData();
    const name = (Math.random().toString(36) + '00000000000000000').slice(2, 8 + 2);
    formData.append('file', {
      uri: video,
      type: 'video/mp4',
      name
    });

    try {
      await api.post(`/qrcodes/${qrcode.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      await analytics().logEvent('send_video', {
        id: qrcode.id,
        user_id: user.id,
        video: name
      });
      navigation.navigate("TabBarRoutes", { screen: "Início", initial: false } as unknown as undefined);
    } catch (error) {
      log.error(error);
      setColor('#DF2C2C');
      setTextTitle('Erro no Processamento');
      setText('Identificamos um problema relacionado ao processamento do seu iCod, verifique sua conexão e tente novamente.');
      setProcessedError(true);
    }
  }

  useEffect((): void => {
    sendVideo();
  }, [qrcode, video]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.iconContainer, { backgroundColor: color, }]}>
        {processedError ? <ErrorProcessing /> : <Pulse />}
      </View>
      <Text style={styles.textTile}>{textTitle}</Text>
      <Text style={styles.text}>{text}</Text>
      {processedError &&
        <TouchableWithoutFeedback onPress={sendVideo}>
          <View style={styles.errorButton}>
            <Text style={styles.errorButtonText}>Tentar Novamente</Text>
          </View>
        </TouchableWithoutFeedback>

      }
    </SafeAreaView >
  );
}

export default Processing;
