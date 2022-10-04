import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Mask from '../../components/Scanner/Mask';
import api from '../../services/api';
import styles from './styles';

import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, StatusBar, Text, View } from 'react-native';
import { BarCodeReadEvent, RNCamera } from 'react-native-camera';
import { SvgProps } from 'react-native-svg';
import { useTheme } from 'styled-components/native';
import { WarningModal } from '../../components/WarningModal';
import { LOG } from '../../config';
import { useAuth, User } from '../../hooks/auth';
import { QRCode } from '../../types/QRCode';
import { checkConnection } from '../../utils/checkConnection';

import CancelIcon from '../../assets/images/Icons/scanner/cancel_icon.svg';
import CheckIcon from '../../assets/images/Icons/scanner/check_icon.svg';
import CloudSyncIcon from '../../assets/images/Icons/scanner/cloud_sync_icon.svg';
import EyeCloseIcon from '../../assets/images/Icons/scanner/eye_close_icon.svg';
import GiftIcon from '../../assets/images/Icons/scanner/gift_icon.svg';
import EdicionIcon from '../../assets/images/Icons/scanner/login_icon.svg';
import theme from '../../global/styles/theme';
import { useBackHandler } from '../../utils/useBackHandler';

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
    path: string;
  };
}

const defaultPopUp = {
  icon: GiftIcon,
  title: '',
  press: '',
  description: '',
  backgroundColor: theme.colors.primary,
};

const Scanner = (props: ScannerProps) => {
  const theme = useTheme();
  const { user } = useAuth();
  const navigation = useNavigation<any>();

  const qrCodeIdFromDeeplink = props.route.path ? props.route.path : '';
  const page = user ? 'TabBarRoutes' : 'SignIn';

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [camera, setCamera] = useState<RNCamera>();
  const [qrCodeValidate, setQrCodeValidate] = useState(false);
  const [qrcode, setQrcode] = useState<QRCode>();
  const [popUp, setPopUp] = useState<PopUp>(defaultPopUp as PopUp);

  const customBackButtonBehaviour = () => user ? navigation.navigate("TabBarRoutes", { screen: "Início", initial: false }) : navigation.navigate("SignIn")

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
  };

  //TODO: Associar usuário ao qrCode - Conversar com o time das galaxias
  const qrCodeContainsGift = async (id: string | null) => {
    setPopUp({
      title: 'Você tem um presente iCods',
      description: 'Agora é a vez de você visualiza-lo',
      icon: GiftIcon,
      press: 'VideoPlayer',
      backgroundColor: theme.colors.primary,
    });
    if (user && id) {
      await api.post(`/received_qrcode/${id}`, {});
    }
  };
  const qrCodeisNotBelongsIcods = () => {
    setPopUp({
      title: 'O QR Code não pertence ao iCods',
      description: 'Tente escanear um QR Code da iCods',
      icon: CancelIcon,
      press: 'Scanner',
      backgroundColor: theme.colors.attention,
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const qrCodeIsAssociated = () => {
    setPopUp({
      title: 'QR Code já associado',
      description: 'Esse QR Code já foi lido por algum outro usuário',
      icon: EyeCloseIcon,
      press: page,
      backgroundColor: theme.colors.attention,
    });
  };

  const qrCodeBelongsToIcodsButIsNotActive = () => {
    setPopUp({
      title: 'Necessidade de Login',
      description: 'Faça o login para prosseguir na edição do QR Code',
      icon: EdicionIcon,
      press: 'SignIn',
      backgroundColor: theme.colors.primary,
    });
  };

  const qrCodeContainsGiftButIsNotProcessed = () => {
    setPopUp({
      title: 'Seu vídeo está indo para a nuvem',
      description:
        'Estamos processando o vídeo, em breve estará disponível para visualização',
      icon: CloudSyncIcon,
      press: page,
      backgroundColor: theme.colors.primary,
    });
  };


  const showFavoriteIcon = (userFavorite: User, qrcodeFavorite: QRCode | undefined) => {
    if (userFavorite) {
      const qrcodeCreatedByUser = qrcodeFavorite?.user === 'Você'

      return qrcodeCreatedByUser ? false : true
    }

    return false
  }

  const handleCloseButton = () => {
    console.log(popUp);

    if (popUp?.press === 'Scanner') {
      setQrcode(undefined);
      setQrCodeValidate(false);
    }

    navigation.navigate(popUp?.press || 'Scanner', {
      qrcode,
      isHistoryDetails: false,
      showFavoriteIcon: !user,
    });
  };

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
      // if (qrCode.receivedUser.id === user?.id) {
      const qrCodeId = qrCode.receivedUser === null ? id : null;
      qrCodeContainsGift(qrCodeId);
      // }
      // else {
      //   qrCodeIsAssociated();
      // }

      return;
    } else {
      qrCodeIsEditable();
    }
  };

  const barcodeRecognized = async ({ data }: BarCodeReadEvent) => {
    await handleQRCode(data);
  };

  const handleQRCode = async (data: string) => {
    let splittedData = data.split('=');
    if (splittedData === undefined || splittedData.length < 2) {
      qrCodeisNotBelongsIcods();
      handleOpenModal();
      return;
    }

    splittedData = splittedData[2].split('&');

    if (splittedData === undefined) {
      qrCodeisNotBelongsIcods();
      handleOpenModal();
      return;
    }

    let qrCodeId = splittedData[0];

    if (qrCodeValidate) {
      return;
    }

    const connection = await checkConnection();
    if (!connection) {
      return;
    }

    await api
      .get(`qrcodes/${qrCodeId}`)
      .then((response: any) => {
        const qrCode: QRCode = response.data;
        setQrcode(qrCode);
        log.info(qrCode);
        verifyQRCodeContent(qrCode);
        log.info(response.config);
        handleOpenModal();
      })
      .catch((error: any) => {
        log.error(error.message);
        qrCodeisNotBelongsIcods();
        handleOpenModal();
      });

    setQrCodeValidate(true);
  };

  useBackHandler(() => {
    navigation.navigate(page);
    return true;
  });

  useEffect(() => {
    qrCodeIdFromDeeplink.length && handleQRCode(qrCodeIdFromDeeplink);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qrCodeIdFromDeeplink]);
  qrCodeContainsGift;
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={theme.colors.primary}
        barStyle="light-content"
        translucent={false}
      />
      <RNCamera
        ref={(camera: RNCamera) => {
          setCamera(camera);
        }}
        style={{ flex: 1 }}
        onBarCodeRead={barcodeRecognized}>
        <Mask read={qrCodeValidate} />

        <View style={styles.textContainer}>
          <Header title="Escanear" whiteMode={true} customBackBehavior={customBackButtonBehaviour} />
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
          isTimeout
          onCloseModal={() => handleCloseButton()}
          setIsVisible={setIsVisible}
          iconBackgroundColor={popUp.backgroundColor}
        />
      </RNCamera>
    </SafeAreaView>
  );
};

export default Scanner;
