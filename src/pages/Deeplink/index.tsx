import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {CloseSquare, Edit, Hide, Login, Play} from 'react-native-iconly';
import {RFPercentage} from 'react-native-responsive-fontsize';
import CloudSyncIcon from '../../assets/images/Icons/cloud_sync_icon_lg.svg';
import Pulse from '../../assets/images/Icons/editor/pulse.svg';
import {IconReactButton} from '../../components/IconReactButton';
import {LOG} from '../../config';
import theme from '../../global/styles/theme';
import {useAuth} from '../../hooks/auth';
import api from '../../services/api';
import {QRCode} from '../../types/QRCode';
import {checkConnection} from '../../utils/checkConnection';
import {
  BackStringContainer,
  BackStringText,
  Container,
  ContentContainer,
  DescriptionText,
  IconBackground,
  TitleText,
} from './styles';

const log = LOG.extend('Deeplink');

interface DeeplinkQrCodeProps {
  title: string;
  description: string;
  icon: any;
  iconBackgroundColor: 'BLUE' | 'RED';
  button?: any;
  backString?: any;
}

type IDeeplinkStatus =
  | 'IsEditable'
  | 'ContainsGift'
  | 'DoesNotBelongToIcods'
  | 'AlreadyAssociated'
  | 'NotLogged'
  | 'NotProcessed'
  | 'Verifying';

const DeepLink = ({route, _}: any) => {

  const url = route.params;
  const qrCodeIdFromDeeplink = url ? url : '';
  const navigation = useNavigation();
  const {user} = useAuth();
  const userConditionalPage = user ? 'TabBarRoutes' : 'SignIn';
  const [qrcode, setQrcode] = useState<QRCode>();
  const [deeplinkStatus, setDeeplinkStatus] = useState<IDeeplinkStatus>(
    'Verifying',
  );
  const DeeplinkQrCode = ({
    title,
    description,
    icon,
    iconBackgroundColor,
    button,
    backString,
  }: DeeplinkQrCodeProps) => {
    return (
      <Container>
        <ContentContainer>
          <IconBackground
            style={{
              backgroundColor:
                iconBackgroundColor === 'BLUE'
                  ? theme.colors.primary
                  : theme.colors.attention,
            }}>
            {icon}
          </IconBackground>
          <TitleText>{title}</TitleText>
          <DescriptionText>{description}</DescriptionText>
          {button!}
          {backString!}
        </ContentContainer>
      </Container>
    );
  };

  const qrCodeContainsGift = useCallback(
    async (id: string, receivedUserAlreadyExists: boolean) => {
      if (user && !receivedUserAlreadyExists) {
        await api.post(`/received_qrcode/${id}`, {});
      }

      setDeeplinkStatus('ContainsGift');
    },
    [user],
  );

  const verifyQRCodeContent = useCallback(
    async (qrCode: QRCode) => {
      if (qrCode.status === 'INACTIVE' && !user) {
        qrCodeIsNotActiveBecauseUserIsNotLogged();
        return;
      }

      if (qrCode.status === 'IN_PROGRESS') {
        qrCodeContainsGiftButIsNotProcessed();
        return;
      }

      if (qrCode.status === 'ACTIVE') {
        const {id} = qrCode;
        if (
          qrCode.receivedUser === null ||
          qrCode.receivedUser.id === user.id
        ) {
          await qrCodeContainsGift(id, !!qrCode.receivedUser);
        } else {
          qrCodeAlreadyAssociated();
        }

        return;
      } else {
        qrCodeIsEditable();
      }
    },
    [qrCodeContainsGift, qrcode, user],
  );

  useEffect(() => {
    if (!qrCodeIdFromDeeplink.url.length) {
      console.log('Deeplink: ', qrCodeIdFromDeeplink);
      return navigation.navigate(userConditionalPage as any);
    }
    async function handleQRCode(data: any) {
      const splittedData = data.url.split('=');
      let qrCodeId = splittedData[splittedData.length - 1];

      const connection = await checkConnection();
      if (!connection) {
        navigation.navigate('ConnectionProblems' as never);
        return;
      }
      log.info('Chamando a API', qrCodeId);

      try {
        const response = await api.get(`qrcodes/${qrCodeId}`);
        const qrCode: QRCode = response.data;
        setQrcode(qrCode);
        await verifyQRCodeContent(qrCode);
      } catch (error: any) {
        log.error(error.message);
        qrCodeDoesNotBelongToICods();
      }
    }
    handleQRCode(qrCodeIdFromDeeplink);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qrCodeIdFromDeeplink, setDeeplinkStatus]);

  const possibleQrCodeStatus = {
    IsEditable: () =>
      DeeplinkQrCode({
        title: 'QR Code editável',
        description:
          'Esse QR Code está pronto para ser personalizado do seu jeito!',
        icon: <Edit size={RFPercentage(6)} set="bold" primaryColor="white" />,
        iconBackgroundColor: 'BLUE',
        button: (
          <IconReactButton
            text="Editar QR Code"
            onPress={() => {
              navigation.navigate(
                'Editor' as never,
                {qrcode, isHistoryDetails: false} as never,
              );
            }}
            icon={() => (
              <Edit size={RFPercentage(3)} set="bold" primaryColor="white" />
            )}
          />
        ),
        backString: (
          <BackStringContainer
            onPress={() => navigation.navigate(userConditionalPage as any)}>
            <BackStringText>Voltar</BackStringText>
          </BackStringContainer>
        ),
      }),

    ContainsGift: () =>
      DeeplinkQrCode({
        title: 'Um presente para você',
        description:
          'Você acaba de receber um vídeo único e especial, visualize e aproveite!',
        icon: (
          <Play
            size={RFPercentage(18)}
            set="bulk"
            primaryColor="white"
            secondaryColor="#2B90D9"
          />
        ),
        iconBackgroundColor: 'BLUE',
        button: (
          <IconReactButton
            text="Visualizar Vídeo"
            onPress={() => {
              navigation.navigate(
                'VideoPlayer' as never,
                {qrcode, isHistoryDetails: false} as never,
              );
            }}
          />
        ),
        backString: (
          <BackStringContainer
            onPress={() => navigation.navigate(userConditionalPage as any)}>
            <BackStringText>Voltar</BackStringText>
          </BackStringContainer>
        ),
      }),

    DoesNotBelongToIcods: () =>
      DeeplinkQrCode({
        title: 'QR Code não pertence ao iCods',
        description:
          'Esse QR Code não faz parte do iCods, adquira um QR Code nas lojas parceiras ou entre em contato conosco!',
        icon: (
          <CloseSquare
            size={RFPercentage(18)}
            set="bulk"
            primaryColor="white"
            secondaryColor="#DF2C2C"
          />
        ),
        iconBackgroundColor: 'RED',
        button: (
          <IconReactButton
            text="Voltar"
            onPress={() => {
              navigation.navigate(userConditionalPage as any);
            }}
            icon={() => (
              <Play size={RFPercentage(3)} set="light" primaryColor="" />
            )}
          />
        ),
        backString: (
          <BackStringContainer
            onPress={() =>
              navigation.navigate((user ? 'Support' : 'SignIn') as never)
            }>
            <BackStringText>Entrar em contato</BackStringText>
          </BackStringContainer>
        ),
      }),

    AlreadyAssociated: () =>
      DeeplinkQrCode({
        title: 'QR Code já associado',
        description:
          'Poxa...Esse QR Code já foi lido por outro usuário, tente escanear outro!',
        icon: <Hide size={RFPercentage(8)} set="bold" primaryColor="white" />,
        iconBackgroundColor: 'RED',
        button: (
          <IconReactButton
            text="Voltar"
            onPress={() => {
              navigation.navigate(userConditionalPage as any);
            }}
            icon={() => (
              <Play size={RFPercentage(3)} set="light" primaryColor="" />
            )}
          />
        ),
      }),

    NotLogged: () =>
      DeeplinkQrCode({
        title: 'Necessidade de Login',
        description:
          'É necessário entrar na sua conta, para prosseguir na edição do vídeo.',
        icon: <Login size={RFPercentage(8)} set="bold" primaryColor="white" />,
        iconBackgroundColor: 'BLUE',
        button: (
          <IconReactButton
            text="Fazer Login"
            onPress={() => {
              navigation.navigate(userConditionalPage as any);
            }}
            icon={() => (
              <Play size={RFPercentage(3)} set="light" primaryColor="" />
            )}
          />
        ),
        backString: (
          <BackStringContainer
            onPress={() => navigation.navigate(userConditionalPage as any)}>
            <BackStringText>Voltar</BackStringText>
          </BackStringContainer>
        ),
      }),

    Verifying: () =>
      DeeplinkQrCode({
        title: 'Aguarde um momento',
        description:
          'Estamos processando seu iCod e garantimos que será rapido!',
        icon: <Pulse />,
        iconBackgroundColor: 'BLUE',
      }),

    NotProcessed: () =>
      DeeplinkQrCode({
        title: 'Aguarde um momento',
        description:
          'Estamos processando seu iCod! Tente escanear o QRCode novamente em alguns minutos!',
        icon: <CloudSyncIcon />,
        iconBackgroundColor: 'BLUE',
        button: (
          <IconReactButton
            text={'Ok'}
            color={'Blue'}
            onPress={() => navigation.navigate(userConditionalPage as any)}
            icon={() => (
              <Play size={RFPercentage(3)} set="light" primaryColor="" />
            )}
          />
        ),
      }),
  } as any;

  const qrCodeIsEditable = () => setDeeplinkStatus('IsEditable');

  const qrCodeDoesNotBelongToICods = () =>
    setDeeplinkStatus('DoesNotBelongToIcods');

  const qrCodeAlreadyAssociated = () => setDeeplinkStatus('AlreadyAssociated');

  const qrCodeIsNotActiveBecauseUserIsNotLogged = () =>
    setDeeplinkStatus('NotLogged');

  const qrCodeContainsGiftButIsNotProcessed = () =>
    setDeeplinkStatus('NotProcessed');

  return possibleQrCodeStatus[deeplinkStatus]();
};

export default DeepLink;
