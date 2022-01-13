import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { BarCodeReadEvent } from 'react-native-camera';
import * as Progress from 'react-native-progress';
import { RFValue } from 'react-native-responsive-fontsize';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import { QRCode } from '../../types/QRCode';
import { checkConnection } from '../../utils/checkConnection';
import { Container, QRCodeText } from './styles';


interface PopUp {
  title: string;
  label: string;
  icon: string;
  press: string;
}

interface DeepLinkProps {
  route: {
    path: string
  }
}

const DeepLink = (props: DeepLinkProps) => {
  const qrCodeIdFromDeeplink = props.route.path ? props.route.path : '';
  const navigation = useNavigation();
  const { user } = useAuth();
  const userConditionalPage = (user ? 'Dashboard' : 'SignIn') as never;
  const [qrCodeValidate, setQrCodeValidate] = useState(false);
  const [qrcode, setQrcode] = useState<QRCode>();
  const [qrcodeText, setQrcodeText] = useState('Seu iCod está sendo verificado...')

  const qrCodeIsEditable = () => {
    setQrcodeText('Agora é a hora de você editar o iCod')
    navigation.navigate('Editor' as never, { qrcode, isHistoryDetails: false } as never);
  }

  const qrCodeContainsGift = async (id: string) => {
    if (user) {
      await api.post(`/received_qrcode/${id}`, {});
    }

    setQrcodeText('Agora é a hora de você visualizar o iCod')
    navigation.navigate('VideoPlayer' as never, { qrcode, isHistoryDetails: false } as never);
  }

  const qrCodeDoesNotBelongsIcods = () => {
    setQrcodeText('Esse QR Code não pertence ao iCods')
    navigation.navigate('Scanner' as never, { qrcode, isHistoryDetails: false } as never);
  }

  const qrCodeAlreadyAssociated = () => {
    setQrcodeText('Esse iCod já foi lido por algum outro usuário')
    navigation.navigate(userConditionalPage, { qrcode, isHistoryDetails: false } as never);
  }

  const qrCodeBelongsToIcodsButIsNotActive = () => {
    setQrcodeText('É necessário realizar o Login para editar o iCod')
    navigation.navigate('SignIn' as never, { qrcode, isHistoryDetails: false } as never);
  }

  const qrCodeContainsGiftButIsNotProcessed = () => {
    setQrcodeText('Estamos processando o seu vídeo...')
    navigation.navigate(userConditionalPage, { qrcode, isHistoryDetails: false } as never);
  }

  const verifyQRCodeContent = (qrCode: QRCode) => {
    console.log('QRCODISON', qrCode);
    
    if (qrCode.status === 'INACTIVE' && !user) {
      qrCodeBelongsToIcodsButIsNotActive();
      return;
    }

    if (qrCode.status === 'IN_PROGRESS') {
      qrCodeContainsGiftButIsNotProcessed();
      return;
    }

    if (qrCode.status === 'ACTIVE') {
      const { id } = qrCode;
      if (qrCode.receivedUser === null || qrCode.receivedUser.id === user?.id) {
        qrCodeContainsGift(id);
      }
      else {
        qrCodeAlreadyAssociated();
      }

      return;
    } else {
      qrCodeIsEditable();
    }
  }


  const handleQRCode = async (data: string) => {
    const splittedData = data.split('/');
    let qrCodeId = splittedData[splittedData.length - 1];
    if (qrCodeValidate) return;

    const connection = await checkConnection();
    if (!connection) {
      navigation.navigate('ConnectionProblems' as never);
      return;
    }
    console.log('Vou chamar a API', data);
    
    await api
      .get(`qrcodes/${qrCodeId}`)
      .then((response: any) => {
        const qrCode: QRCode = response.data;
        setQrcode(qrCode);
        verifyQRCodeContent(qrCode);
      })
      .catch((error: any) => {
        console.log(error.message);
        qrCodeDoesNotBelongsIcods();
      });

    setQrCodeValidate(true);
  } 

  useEffect(()=>{
    console.log('Chamei o componente de loading');
    handleQRCode(qrCodeIdFromDeeplink)
  }, [])

  return (
    <Container>
      <QRCodeText>
        {qrcodeText}
      </QRCodeText>
      <Progress.Circle
        size={RFValue(120)}
        indeterminate={true}
        borderWidth={16}
        thickness={8}
        color={"#2b90d9"}
      />
    </Container>
  );
};

export default DeepLink;
