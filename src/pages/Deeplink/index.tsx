import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { BarCodeReadEvent } from 'react-native-camera';
import * as Progress from 'react-native-progress';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import { QRCode } from '../../types/QRCode';
import { checkConnection } from '../../utils/checkConnection';
import { BackStringContainer, BackStringText, Container, ContentContainer, DescriptionText, IconBackground, TitleText } from './styles';
import { Edit, Play, CloseSquare, Hide, Login } from 'react-native-iconly'
import { IconRectButton } from '../../components/IconRectButton';
import Pulse from '../../assets/images/Icons/editor/pulse.svg';
import CloudSyncIcon from '../../assets/images/Icons/cloud_sync_icon_lg.svg';
import theme from '../../global/styles/theme';
import { LOG } from '../../config';

const log = LOG.extend('Deeplink');

interface PopUp {
  title: string;
  label: string;
  icon: string;
  press: string;
}

interface DeeplinkQrCodeProps {
  title: string;
  description: string;
  icon: any;
  iconBackgroundColor: 'BLUE' | 'RED';
  button?: any;
  backString?: any;
}

type IDeeplinkStatus = 'IsEditable' | 'ContainsGift' | 'DoesNotBelongToIcods' | 'AlreadyAssociated' | 'NotLogged' | 'NotProcessed' | 'Verifying'

const DeepLink = ({ route, _ }: any) => {

  const url = route.params;
  const qrCodeIdFromDeeplink = url ? url : '';
  const navigation = useNavigation();
  const { user } = useAuth();
  const userConditionalPage = (user ? 'Dashboard' : 'SignIn') as never;
  const [qrCodeValidate, setQrCodeValidate] = useState(false);
  const [qrcode, setQrcode] = useState<QRCode>();
  const [deeplinkStatus, setDeeplinkStatus] = useState<IDeeplinkStatus>('Verifying');
  const [notProcessedTimer, setNotProcessedTimer] = useState(20);

  const DeeplinkQrCode = ({ title, description, icon, iconBackgroundColor, button, backString }: DeeplinkQrCodeProps) => {
    return (
      <Container>
        <ContentContainer>
          <IconBackground
            style={{ backgroundColor: iconBackgroundColor === 'BLUE' ? theme.colors.primary : theme.colors.attention }}
          >
            {icon}
          </IconBackground>
          <TitleText>{title}</TitleText>
          <DescriptionText>{description}</DescriptionText>
          {button!}
          {backString!}
        </ContentContainer>
      </Container>
    )
  }

  const possibleQrCodeStatus = {
    IsEditable: () => DeeplinkQrCode({
      title: 'QR Code editável',
      description: 'Esse QR Code está pronto para ser personalizado do seu jeito!',
      icon: <Edit size={RFPercentage(6)} set="bold" primaryColor="white" />,
      iconBackgroundColor: 'BLUE',
      button: <IconRectButton
        text='Editar QR Code'
        onPress={() => {
          navigation.navigate('Editor' as never, { qrcode, isHistoryDetails: false } as never);
        }}
        icon={() => <Edit size={RFPercentage(3)} set="bold" primaryColor="white" />}
      />,
      backString: <BackStringContainer onPress={() => navigation.navigate(userConditionalPage)}>
        <BackStringText>Voltar</BackStringText>
      </BackStringContainer>
    }),

    ContainsGift: () => DeeplinkQrCode({
      title: 'Um presente para você',
      description: 'Você acaba de receber um vídeo único e especial, visualize e aproveite!',
      icon: <Play size={RFPercentage(18)} set="bulk" primaryColor='white' secondaryColor='#2B90D9' />,
      iconBackgroundColor: 'BLUE',
      button: <IconRectButton
        text='Visualizar Vídeo'
        onPress={() => {
          navigation.navigate('VideoPlayer' as never, { qrcode, isHistoryDetails: false } as never);
        }}
      />,
      backString: <BackStringContainer onPress={() => navigation.navigate(userConditionalPage)}>
        <BackStringText>Voltar</BackStringText>
      </BackStringContainer>
    }),

    DoesNotBelongToIcods: () => DeeplinkQrCode({
      title: 'QR Code não pertence ao iCods',
      description: 'Esse QR Code não faz parte do iCods, adquira um QR Code nas lojas parceiras ou entre em contato conosco!',
      icon: <CloseSquare size={RFPercentage(18)} set="bulk" primaryColor='white' secondaryColor='#DF2C2C' />,
      iconBackgroundColor: 'RED',
      button: <IconRectButton
        text='Voltar'
        onPress={() => {
          navigation.navigate(userConditionalPage);
        }}
        icon={() => <Play size={RFPercentage(3)} set="light" primaryColor="" />}
      />,
      backString: <BackStringContainer onPress={() => navigation.navigate((user ? 'Support' : 'SignIn') as never)}>
        <BackStringText>Entrar em contato</BackStringText>
      </BackStringContainer>
    }),

    AlreadyAssociated: () => DeeplinkQrCode({
      title: 'QR Code já associado',
      description: 'Poxa...Esse QR Code já foi lido por outro usuário, tente escanear outro!',
      icon: <Hide size={RFPercentage(8)} set="bold" primaryColor='white' />,
      iconBackgroundColor: 'RED',
      button: <IconRectButton
        text='Voltar'
        onPress={() => {
          navigation.navigate(userConditionalPage);
        }}
        icon={() => <Play size={RFPercentage(3)} set="light" primaryColor="" />}
      />
    }),

    NotLogged: () => DeeplinkQrCode({
      title: 'Aguarde um momento',
      description: 'Estamos processando o vídeo para que ele fique pronto para visualização',
      icon: <Login size={RFPercentage(8)} set="bold" primaryColor='white' />,
      iconBackgroundColor: 'BLUE',
      button: <IconRectButton
        text='Fazer Login'
        onPress={() => {
          navigation.navigate(userConditionalPage);
        }}
        icon={() => <Play size={RFPercentage(3)} set="light" primaryColor="" />}
      />,
      backString: <BackStringContainer onPress={() => navigation.navigate(userConditionalPage)}>
        <BackStringText>Voltar</BackStringText>
      </BackStringContainer>
    }),

    Verifying: () => DeeplinkQrCode({
      title: 'Aguarde um momento',
      description: 'Estamos processando seu iCod e garantimos que será rapido! Assim que concluído, você ja pode presenteá-lo!',
      icon: <Pulse />,
      iconBackgroundColor: 'BLUE'
    }),

    NotProcessed: () => DeeplinkQrCode({
      title: 'Aguarde um momento',
      description: 'Estamos processando seu iCod e garantimos que será rapido! Assim que concluído, você ja pode presenteá-lo!',
      icon: <CloudSyncIcon />,
      iconBackgroundColor: 'BLUE',
      button: <IconRectButton
        text={notProcessedTimer === 0 ? 'Tentar novamente' : `Aguarde ${notProcessedTimer} seg`}
        color={notProcessedTimer === 0 ? 'Blue' : 'Gray'}
        onPress={async () => {
          if (notProcessedTimer === 0) {
            await handleQRCode({ url: `=${qrCodeIdFromDeeplink.url}` })
          }
        }}
        icon={() => <Play size={RFPercentage(3)} set="light" primaryColor="" />}
      />,
    }),
  } as { [key in IDeeplinkStatus]: () => JSX.Element }

  const qrCodeIsEditable = () => setDeeplinkStatus('IsEditable')

  const qrCodeContainsGift = async (id: string, receivedUserAlreadyExists: boolean) => {
    if (user && !receivedUserAlreadyExists) {
      await api.post(`/received_qrcode/${id}`, {});
    }

    setDeeplinkStatus('ContainsGift')
  }

  const qrCodeDoesNotBelongToICods = () => setDeeplinkStatus('DoesNotBelongToIcods')

  const qrCodeAlreadyAssociated = () => setDeeplinkStatus('AlreadyAssociated')

  const qrCodeIsNotActiveBecauseUserIsNotLogged = () => setDeeplinkStatus('NotLogged')

  const qrCodeContainsGiftButIsNotProcessed = () => setDeeplinkStatus('NotProcessed')

  const verifyQRCodeContent = async (qrCode: QRCode) => {
    if (qrCode.status === 'INACTIVE' && !user) {
      qrCodeIsNotActiveBecauseUserIsNotLogged();
      return;
    }

    if (qrCode.status === 'IN_PROGRESS') {
      qrCodeContainsGiftButIsNotProcessed();
      setNotProcessedTimer(20);
      return;
    }

    if (qrCode.status === 'ACTIVE') {
      const { id } = qrCode;
      if (qrCode.receivedUser === null || qrCode.receivedUser.id === user?.id) {
        await qrCodeContainsGift(id, !!qrCode.receivedUser);
      }
      else {
        qrCodeAlreadyAssociated();
      }

      return;
    } else {
      qrCodeIsEditable();
    }
  }


  const handleQRCode = async (data: { url: string }) => {
    const splittedData = data.url.split('=');
    let qrCodeId = splittedData[splittedData.length - 1];

    const connection = await checkConnection();
    if (!connection) {
      navigation.navigate('ConnectionProblems' as never);
      return;
    }
    log.info('Chamando a API', qrCodeId);

    try {
      const response = await api.get(`qrcodes/${qrCodeId}`)
      const qrCode: QRCode = response.data;
      setQrcode(qrCode);
      await verifyQRCodeContent(qrCode);
    } catch (error: any) {
      log.error(error.message);
      qrCodeDoesNotBelongToICods();
    }
    // setQrCodeValidate(true);
  }

  useEffect(() => {
    handleQRCode(qrCodeIdFromDeeplink)
  }, [])

  useEffect(() => {
    if (notProcessedTimer !== 0) {
      const timer = setTimeout(() => {
        setNotProcessedTimer(notProcessedTimer - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [qrCodeIdFromDeeplink, deeplinkStatus, notProcessedTimer])

  return possibleQrCodeStatus[deeplinkStatus]()
};

export default DeepLink;
