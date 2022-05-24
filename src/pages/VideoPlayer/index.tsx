import React, { useRef } from 'react';
import Video, { LoadError } from 'react-native-video';
import { Container, IconsContainer, TouchableOpacity, VideoContainer, VideoContainerHeader } from './styles';
import VideoPlayerFooter from '../../components/VideoPlayer/VideoPlayerFooter';
import { useAuth } from '../../hooks/auth';
import { LOG } from '../../config';
import ChevronLeft from '../../assets/images/Icons/chevron-left.svg'
import { useNavigation } from '@react-navigation/native';

const log = LOG.extend('Register');

const VideoPlayer = ({ route, _ }: any) => {
  const { user } = useAuth();
  const navigation = useNavigation<any>();

  const { qrcode: {
    updatedFavorite,
    link,
    setUpdatedFavorite,
  }, isHistoryDetails } = route.params;
  const page = isHistoryDetails ? "back" : user ? 'Dashboard' : 'SignIn';
  const player = useRef(null);
  const url = 'https://icods-studio.s3.amazonaws.com/icods.mp4';
  const videoError = (err: LoadError) => {
    log.error(err);
  }

  return (
    <Container>
      <VideoContainerHeader>
        <TouchableOpacity
          onPress={() => {
            if (page === 'back') {
              navigation.goBack();
            } else {
              navigation.navigate(`${page}`);
            }
          }}>
          <ChevronLeft />
        </TouchableOpacity>
      </VideoContainerHeader>
      <VideoContainer>
        {/* Criar uma forma de veririfcar se o link está funcional pois sempre ele é valido
        Caso o link seja inválido, direcionar par ao modal feito no figma */}
        <Video
          source={{ uri: link || url }}
          ref={player}
          style={{ width: '100%', height: '100%' }}
          controls={true}
          resizeMode={'cover'}
          onError={videoError} // Callback when video cannot be loaded
        />
      </VideoContainer>
      <IconsContainer>
        <VideoPlayerFooter
          url={link ? link : url}
          updatedFavorite={updatedFavorite}
          setUpdatedFavorite={setUpdatedFavorite}
        />
      </IconsContainer>
    </Container>
  );
}

export default VideoPlayer;