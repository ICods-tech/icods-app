import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { SafeAreaView, Text, TouchableWithoutFeedback, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { Configuration, VESDK } from 'react-native-videoeditorsdk';
import { useTheme } from 'styled-components/native';
import ConfirmationIcon from '../../assets/images/Icons/confirmation_edit_icon.svg';
import Menu from '../../components/Editor/Menu';
import Header from '../../components/Header';
import { WarningModal } from '../../components/WarningModal';
import { LOG } from '../../config';
import { useBackHandler } from '../../utils/useBackHandler';
import styles, { HeaderContainer } from './styles';
const log = LOG.extend('Editor');

const Editor = ({ route, _ }: any) => {
  const navigation = useNavigation<any>();
  const theme = useTheme();
  const [modalVisible, setModalVisible] = useState(false);

  const { qrcode } = route.params;
  const [camera, setCamera] = useState<RNCamera>();
  const [type, setType] = useState(false);
  const [flash, setFlash] = useState(false);
  const [focus, setFocus] = useState(RNCamera.Constants.AutoFocus.on);
  const [cameraZoom, setCameraZoom] = useState(0.0);
  const [isRecording, setIsRecording] = useState(false);
  const [video, setVideo] = useState('');

  const [recordedData, setRecordedData] = useState('');

  const handleCancel = () => {
    setModalVisible(false);
    openEditor();
  };

  const handleConfirm = () => {
    if (video === '') {
      return;
    }

    setModalVisible(false);
    navigation.navigate('Processing', { qrcode, video });
  };

  const handleFlipCamera = () => {
    setType(!type);
  };

  const handleFlashCamera = () => {
    setFlash(!flash);
  };

  const takePicture = async () => {
    if (camera) {
      try {
        log.info('Iniciando a gravação');
        setIsRecording(true);
        const data = await camera.recordAsync({
          quality: RNCamera.Constants.VideoQuality['1080p'],
          videoBitrate: 1000 * 1000 * 5, // 5 Mbps
          orientation: 'portrait',
          maxDuration: 30,
          maxFileSize: 100 * 1024 * 1024,
          // path: `${RNFS.TemporaryDirectoryPath}/${ Date.now() }.mkv`
        });

        log.debug(data);

        setRecordedData(data.uri);
      } catch (err) {
        log.error(err);
      }
    }
  };

  const onRecordEnd = () => {
    setIsRecording(false);
    log.info('Parando a gravação');
  };

  const stopVideo = () => {
    if (camera) {
      camera.stopRecording();
      setIsRecording(false);
      log.info('Parando a gravação');
    }
  };

  const openEditor = () => {
    if (recordedData != null) {
      const video = recordedData;

      const configuration: Configuration = {
        // Configure sticker tool
        sticker: {
          // Enable personal stickers
          personalStickers: true,
          // Configure stickers
          categories: [
            // Create sticker category with stickers
            // Reorder and use existing sticker categories
            { identifier: 'imgly_sticker_category_animated' },
            { identifier: 'imgly_sticker_category_emoticons' },
            // Modify existing sticker category
            {
              identifier: 'imgly_sticker_category_shapes',
              items: [
                { identifier: 'imgly_sticker_shapes_badge_01' },
                { identifier: 'imgly_sticker_shapes_arrow_02' },
                { identifier: 'imgly_sticker_shapes_spray_03' },
              ],
            },
          ],
        },
      };

      VESDK.unlockWithLicense(require('./vesdk_license.json'));

      VESDK.openEditor(video, configuration).then(
        async (result) => {
          log.debug(result);
          const { video } = result;
          setModalVisible(true);

          setVideo(video);
        },
        (error) => {
          log.error(error);
        },
      );
    }
  };

  const customBackButtonBehaviour = () => {
    navigation.navigate('TabBarRoutes', { screen: 'Início', initial: false });
  };

  useBackHandler(() => {
    customBackButtonBehaviour();
    return true;
  });

  return (
    <SafeAreaView style={styles.container}>
      <RNCamera
        style={{ flex: 1 }}
        ref={(camera: RNCamera) => {
          setCamera(camera);
        }}
        type={
          type ? RNCamera.Constants.Type.front : RNCamera.Constants.Type.back
        }
        autoFocus={focus}
        flashMode={
          flash
            ? RNCamera.Constants.FlashMode.torch
            : RNCamera.Constants.FlashMode.off
        }
        zoom={cameraZoom}
        onRecordingEnd={onRecordEnd}
        faceDetectionMode={RNCamera.Constants.FaceDetection.Mode.accurate}
        captureAudio={true}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        androidRecordAudioPermissionOptions={{
          title: 'Permission to use audio recording',
          message: 'We need your permission to use your audio',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}>
        {!isRecording && (
          <>
            <HeaderContainer>
              <Header
                title=""
                customBackBehavior={() =>
                  navigation.navigate('TabBarRoutes', {
                    screen: 'Início',
                    initial: false,
                  })
                }
              />
            </HeaderContainer>
            {recordedData !== '' && (
              <TouchableWithoutFeedback onPress={openEditor}>
                <View style={styles.buttonNext}>
                  <Text style={{ color: '#fff' }}>Próximo</Text>
                </View>
              </TouchableWithoutFeedback>
            )}
          </>
        )}
        <Menu
          handleFlipCamera={handleFlipCamera}
          handleTakePicture={takePicture}
          handleFlashCamera={handleFlashCamera}
          handleStopVideo={stopVideo}
          isRecording={isRecording}
        />
      </RNCamera>
      <WarningModal
        title="Confirma a edição do iCod?"
        description="Caso confirme, não será mais
        permitido a edição desse iCod"
        visible={modalVisible}
        onCloseModal={handleCancel}
        iconBackgroundColor={theme.colors.primary}
        icon={ConfirmationIcon}
        isFooterButtonsActived
        handleConfirmed={handleConfirm}
      />
    </SafeAreaView>
  );
};

export default Editor;
