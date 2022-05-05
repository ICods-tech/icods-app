import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { BarCodeReadEvent, RNCamera } from 'react-native-camera';
import { QRCode } from '../../types/QRCode';
import { checkConnection } from '../../utils/checkConnection';
import { useAuth } from '../../hooks/auth';
import { useNavigation } from '@react-navigation/native';
import { LOG } from '../../config';
import { WarningModal } from '../../components/WarningModal';
import { useTheme } from 'styled-components/native';
import { CloseSquare } from 'react-native-iconly';
import api from '../../services/api';
import Header from '../../components/Header';
import LoggedFooter from '../../components/LoggedFooter';
import Mask from '../../components/Scanner/Mask';
import styles from './styles';
import ScannerPopUP from '../../components/Scanner/ScannerPopUP';

const log = LOG.extend('Scanner');

interface PopUp {
  title: string;
  label: string;
  icon: string;
  press: string;
}

interface ScannerProps {
  route: {
    path: string
  }
}

const Scanner = (props: ScannerProps) => {
  const qrCodeIdFromDeeplink = props.route.path ? props.route.path : '';
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const { user } = useAuth();
  const page = user ? 'Dashboard' : 'SignIn';
  const [camera, setCamera] = useState<RNCamera>();
  const [qrCodeValidate, setQrCodeValidate] = useState(false);
  const [qrcode, setQrcode] = useState<QRCode>();
  const [popUp, setPopUp] = useState<PopUp>();

  const handleCloseButton = () => {
    if (popUp?.press == 'Scanner') {
      setQrCodeValidate(false);
      setQrcode(undefined);
    }
    navigation.navigate(popUp?.press || 'Scanner', { qrcode, isHistoryDetails: false });
  }

  const qrCodeIsEditable = () => {
    setPopUp({
      title: 'QR Code lido com sucesso',
      label: 'Agora é a vez de você editar',
      icon: 'check',
      press: 'Editor',
    });
  }

  const qrCodeContainsGift = async (id: string) => {
    setPopUp({
      title: 'Você tem um presente iCods',
      label: 'Agora é a vez de você visualiza-lo',
      icon: 'gift',
      press: 'VideoPlayer',
    });

    if (user) {
      await api.post(`/received_qrcode/${id}`, {});
    }
  }

  const qrCodeisNotBelongsIcods = () => {
    setPopUp({
      title: 'O QR Code não pertence ao iCods',
      label: 'Tente escanear um QR Code da iCods',
      icon: 'close',
      press: 'Scanner',
    });
  }

  const qrCodeIsAssociated = () => {
    setPopUp({
      title: 'QR Code já associado',
      label: 'Esse QR Code já foi lido por algum outro usuário',
      icon: 'eye_close',
      press: page,
    });
  }

  const qrCodeBelongsToIcodsButIsNotActive = () => {
    setPopUp({
      title: 'Necessidade de Login',
      label: 'Para prosseguir, você precisa está conectado com uma conta ativa',
      icon: 'edicion',
      press: 'SignIn',
    });
  }

  const qrCodeContainsGiftButIsNotProcessed = () => {
    setPopUp({
      title: 'Seu vídeo está indo para a nuvem',
      label: 'Estamos processando o vídeo para que ele fique pronto para a visualização em alguns minutos',
      icon: 'cloud_sync',
      press: page,
    });
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

    let splittedData = data.split('=');
    splittedData = splittedData[2].split('&');
    let qrCodeId = splittedData[0];
    if (qrCodeValidate) return;

    const connection = await checkConnection();
    if (!connection) {
      navigation.navigate('ConnectionProblems');
      return;
    }
    await api
      .get(`qrcodes/${qrCodeId}`)
      .then((response: any) => {
        const qrCode: QRCode = response.data;
        setQrcode(qrCode);
        verifyQRCodeContent(qrCode);
      })
      .catch((error: any) => {
        log.error(error.message);
        qrCodeisNotBelongsIcods();
      });

    setQrCodeValidate(true);
  }

  useEffect(() => {
    qrCodeIdFromDeeplink.length && handleQRCode(qrCodeIdFromDeeplink);
  }, [qrCodeIdFromDeeplink])

  // useEffect(() => {
  //   qrCodeBelongsToIcodsButIsNotActive()
  // }, [])
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
          <Header page="Escanear" navigate={page} color="#FFFFFF" />
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.textParagraph}>
              Aponte o QR CODE para região abaixo
            </Text>
          </View>
        </View>

        {qrCodeValidate && (
          <>
            {/* <ScannerPopUP
              press={handleCloseButton}
              title={popUp?.title}
              subtitle={popUp?.label}
              icon={popUp?.icon}
            /> */}
            <WarningModal
              title={popUp?.title!}
              description={popUp?.label!}
              confirmText='Salvar'
              iconly={CloseSquare}
              iconBackgroundColor={theme.colors.attention}
              visible={qrCodeValidate}
              pressedOut={handleCloseButton}
            // handleSaveUpdatesconfirmed={async () => {
            //   updatedColor !== lastSavedColor && await handleChangeQRCodeColor(updatedColor)
            //   updatedFavorite !== lastSavedFavorite && await handleFavoriteQRCode(id)
            //   setSaveChangesModalOpen(false)
            //   onGoBack(true)
            //   navigation.goBack()
            // }}
            />
          </>
        )}

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
