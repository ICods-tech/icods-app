import React, { useState } from 'react';
import { View, Text, SafeAreaView, ColorValue, StyleSheet, Dimensions, Alert, Modal } from 'react-native';
import { BarCodeReadEvent, RNCamera } from 'react-native-camera';
import Header from '../../components/Header';
import Mask from '../../components/Scanner/Mask';
import styles from './styles';
import ScannerPopUP from '../../components/Scanner/ScannerPopUP';
import api from '../../services/api';
import { QRCode } from '../../types/QRCode';
import { useAuth } from '../../hooks/auth';
import LoggedFooter from '../../components/LoggedFooter';
import { useNavigation } from '@react-navigation/native';
import { checkConnection } from '../../utils/checkConnection';


interface PopUp
{
  title: string;
  label: string;
  icon: string;
  press: string;
}

const Scanner = () =>
{
  const navigation = useNavigation();
  const { user } = useAuth();
  const page = user ? 'Dashboard' : 'SignIn';
  const [ camera, setCamera ] = useState<RNCamera>();
  const [ qrCodeValidate, setQrCodeValidate ] = useState( false );
  const [ qrcode, setQrcode ] = useState<QRCode>();
  const [ popUp, setPopUp ] = useState<PopUp>();

  const handleCloseButton = () => {
    if(popUp?.press == 'Scanner') {
      setQrCodeValidate( false );
      setQrcode( undefined );
    }
    navigation.navigate(popUp?.press || 'Scanner', {qrcode});
  }

  const qrCodeIsEditable = () => {
    setPopUp( {
      title: 'QR Code lido com sucesso',
      label: 'Agora é a vez de você editar',
      icon: 'check',
      press: 'Editor',
    } );
  }

  const qrCodeContainsGift = async (id: string) => {
    setPopUp( {
      title: 'Você tem um presente iCods',
      label: 'Agora é a vez de você visualiza-lo',
      icon: 'gift',
      press: 'VideoPlayer',
    } );

    if (user)  {
      await api.post(`/received_qrcode/${id}`, {});
    }
  }

  const qrCodeisNotBelongsIcods = () => {
    setPopUp( {
      title: 'O QR Code não pertence ao iCods',
      label: 'Tente escanear um QR Code da iCods',
      icon: 'close',
      press: 'Scanner',
    });
  }

  const qrCodeIsAssociated = () => {
    setPopUp( {
      title: 'QR Code já associado',
      label: 'Esse QR Code já foi lido por algum outro usuário',
      icon: 'eye_close',
      press: page,
    });
  }

  const qrCodeBelongsToIcodsButIsNotActive = () => {
    setPopUp( {
      title: 'Necessidade de Login',
      label: 'Para prosseguir, você precisa está conectado com uma conta ativa',
      icon: 'edicion',
      press: 'Register',
    });
  }

  const qrCodeContainsGiftButIsNotProcessed = () => {
    setPopUp( {
      title: 'Seu vídeo está indo para a nuvem',
      label: 'Estamos processando o vídeo para que ele fique pronto para a visualização em alguns minutos',
      icon: 'cloud_sync',
      press: page,
    } );
  }

  const verifyQRCodeContent = (qrCode: QRCode) => {
    if (qrCode.status === 'INACTIVE' && !user ){
      qrCodeBelongsToIcodsButIsNotActive();
      return;
    }
    
    if (qrCode.status === 'IN_PROGRESS') {
      qrCodeContainsGiftButIsNotProcessed();
      return;
    }

    if ( qrCode.status === 'ACTIVE' ){
      const {id} = qrCode;
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

  const barcodeRecognized = async ( { data }: BarCodeReadEvent ) =>
  {
    if ( qrCodeValidate ) return;
    
    const connection = await checkConnection();
    if (!connection) {
      navigation.navigate('ConnectionProblems');
      return;
    } 
    
    await api
    .get( `qrcodes/${ data }` )
    .then( ( response: any ) =>
    {
      const qrCode: QRCode = response.data;
      setQrcode( qrCode );
      verifyQRCodeContent(qrCode);
    })
    .catch( ( error: any ) =>
    {
      console.log(error.message);
      qrCodeisNotBelongsIcods();
    });
    
    setQrCodeValidate( true );
  };


  return (
    
    <SafeAreaView style={ styles.container }>
      <RNCamera
        ref={ ( camera: RNCamera ) =>
        {
          setCamera( camera );
        } }
        style={ { flex: 1 } }
        onBarCodeRead={ barcodeRecognized }>
        <Mask read={ qrCodeValidate } />

        <View style={ styles.textContainer }>
          <Header page="Escanear" navigate={ page } color="#FFFFFF" />
          <View style={ { alignItems: 'center', justifyContent: 'center' } }>
            <Text style={ styles.textParagraph }>
              Aponte o QR CODE para região abaixo
            </Text>
          </View>
        </View>

        { qrCodeValidate && (
          <ScannerPopUP
            press={ handleCloseButton }
            title={ popUp?.title }
            subtitle={ popUp?.label }
            icon={ popUp?.icon }
          />
        ) }

        { user &&
          <LoggedFooter 
            isScanner={true}
          />
        }
      </RNCamera>
    </SafeAreaView>
  );
};

export default Scanner;
