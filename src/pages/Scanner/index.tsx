import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Mask from '../../components/Scanner/Mask';
import styles from './styles';
import api from '../../services/api';
import LoggedFooter from '../../components/LoggedFooter';

import { View, Text, SafeAreaView } from 'react-native';
import { BarCodeReadEvent, RNCamera } from 'react-native-camera';
import { QRCode } from '../../types/QRCode';
import { useAuth } from '../../hooks/auth';
import { useNavigation } from '@react-navigation/native';
import { checkConnection } from '../../utils/checkConnection';
import { LOG } from '../../config';
import { useTheme } from 'styled-components/native';
import { WarningModal } from '../../components/WarningModal';
import { SvgProps } from 'react-native-svg';

import CancelIcon from '../../assets/images/Icons/scanner/cancel_icon.svg';
import CheckIcon from '../../assets/images/Icons/scanner/check_icon.svg';
import CloudSyncIcon from '../../assets/images/Icons/scanner/cloud_sync_icon.svg';
import GiftIcon from '../../assets/images/Icons/scanner/gift_icon.svg';
import EdicionIcon from '../../assets/images/Icons/scanner/login_icon.svg';
import EyeCloseIcon from '../../assets/images/Icons/scanner/eye_close_icon.svg';
import theme from '../../global/styles/theme';

const log = LOG.extend('Scanner');

interface PopUp {
  icon: React.FC<SvgProps>;
  title: string;
  press: string;
  description: string;
  backgroundColor: string;
}

interface ScannerProps {
  route: {
    path: string
  }
}

const defaultPopUp = {
  icon: GiftIcon,
  title: '',
  press: '',
  description: '',
  backgroundColor: theme.colors.primary,
}

const Scanner = (props: ScannerProps) => {
  const theme = useTheme();
  const { user } = useAuth();
  const navigation = useNavigation<any>();

  const qrCodeIdFromDeeplink = props.route.path ? props.route.path : '';
  const page = user ? 'Dashboard' : 'SignIn';

  const [camera, setCamera] = useState<RNCamera>();
  const [qrCodeValidate, setQrCodeValidate] = useState(false);
  const [qrcode, setQrcode] = useState<QRCode>();
  const [popUp, setPopUp] = useState<PopUp>(defaultPopUp as PopUp);

  const [isVisible, setIsVisible] = useState(false);

  function handleOpenModal() {
    setIsVisible(true);
  }

  const qrCodeIsEditable = () => {
    setPopUp({
      title: 'QR Code lido com sucesso',
      description: 'Agora é a vez de você editar',
      icon: CheckIcon,
      press: 'Editor',
      backgroundColor: theme.colors.success,
    });
  }

  const qrCodeContainsGift = async (id: string) => {
    setPopUp({
      title: 'Você tem um presente iCods',
      description: 'Agora é a vez de você visualiza-lo',
      icon: GiftIcon,
      press: 'VideoPlayer',
      backgroundColor: theme.colors.primary,
    });

    if (user) {
      await api.post(`/received_qrcode/${id}`, {});
    }
  }
  const qrCodeisNotBelongsIcods = () => {
    setPopUp({
      title: 'O QR Code não pertence ao iCods',
      description: 'Tente escanear um QR Code da iCods',
      icon: CancelIcon,
      press: 'Scanner',
      backgroundColor: theme.colors.attention,
    });
  }

  const qrCodeIsAssociated = () => {
    setPopUp({
      title: 'QR Code já associado',
      description: 'Esse QR Code já foi lido por algum outro usuário',
      icon: EyeCloseIcon,
      press: page,
      backgroundColor: theme.colors.attention,
    });
  }

  const qrCodeBelongsToIcodsButIsNotActive = () => {
    setPopUp({
      title: 'Necessidade de Login',
      description: 'Faça o login para prosseguir na edição do QR Code',
      icon: EdicionIcon,
      press: 'SignIn',
      backgroundColor: theme.colors.primary,
    });
  }

  const qrCodeContainsGiftButIsNotProcessed = () => {
    setPopUp({
      title: 'Seu vídeo está indo para a nuvem',
      description: 'Estamos processando o vídeo para que ele fique pronto para a visualização em alguns minutos',
      icon: CloudSyncIcon,
      press: page,
      backgroundColor: theme.colors.primary,
    });
  }

  const handleCloseButton = () => {
    if (popUp?.press == 'Scanner') {
      setQrCodeValidate(false);
      setQrcode(undefined);
    }
    navigation.navigate(popUp?.press || 'Scanner', { qrcode, isHistoryDetails: false });
  }

  const verifyQRCodeContent = (qrCode: QRCode) => {
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
        qrCodeIsAssociated();
      }

      return;
    } else {
      qrCodeIsEditable();
    }
  }

  const barcodeRecognized = async ({ data }: BarCodeReadEvent) => {
    await handleQRCode(data)
  };

  const handleQRCode = async (data: string) => {

    try {
      let splittedData = data.split('=');
      splittedData = splittedData[2].split('&');
      let qrCodeId = splittedData[0];
      if (qrCodeValidate) return;

      const connection = await checkConnection();
      if (!connection) {
        navigation.navigate('ConnectionProblems');
        return;
      }
      const response = await api.get(`qrcodes/${qrCodeId}`)
      const qrCode: QRCode = response.data;
      setQrcode(qrCode);
      verifyQRCodeContent(qrCode);

    } catch (error: any) {
      log.error(error.message);
      qrCodeisNotBelongsIcods();
      handleOpenModal();
    };

    setQrCodeValidate(true);
    handleOpenModal();
  }

  useEffect(() => {
    qrCodeIdFromDeeplink.length && handleQRCode(qrCodeIdFromDeeplink);
  }, [qrCodeIdFromDeeplink])
  qrCodeContainsGift
  return (

    <SafeAreaView style={styles.container}>
      <RNCamera
        ref={(camera: RNCamera) => {
          setCamera(camera);
        }}
        style={{ flex: 1 }}
        onBarCodeRead={barcodeRecognized}>
        <Mask read={qrCodeValidate} />

        <View style={styles.textContainer}>
          <Header page="Escanear" navigate={page} color={theme.colors.shape} />
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.textParagraph}>
              Aponte o QR CODE para região abaixo
            </Text>
          </View>
        </View>

        <WarningModal
          title={popUp.title}
          description={popUp.description}
          visible={isVisible}
          icon={popUp.icon}
          isTimout
          onCloseModal={handleCloseButton}
          setIsVisible={setIsVisible}
          iconBackgroundColor={popUp.backgroundColor}

        />
        {/* </>
        )} */}

        {user &&
          <LoggedFooter
            isScanner={true}
          />
        }
      </RNCamera>
    </SafeAreaView>
  );
};

export default Scanner;
