import React, { useCallback } from 'react';
import Video from 'react-native-video-player';
import { Container, IconsContainer, VideoContainer } from './styles';
import VideoPlayerFooter from '../../components/VideoPlayer/VideoPlayerFooter';
import { useAuth } from '../../hooks/auth';
import Header from '../../components/Header';

const VideoPlayer = ( { route, _ }: any ) => {
  const { user } = useAuth();
  const { qrcode:{
    updatedFavorite, 
    link, 
    setUpdatedFavorite,
  }, isHistoryDetails } = route.params;
  const url = 'https://bucket-nodejs.s3.amazonaws.com/LOGOVETOR_1.mp4';
  const page = isHistoryDetails ? "back" : user ? 'Dashboard': 'SignIn';
  return (
    <Container>
      <Header page="" navigate={page} color="#FFFFFF" isVideoPlayer/>
      <VideoContainer>
        <Video 
          video={{ uri: link ? link : url}}
          videoWidth={1600}
          videoHeight={900}
          autoplay={true}
          loop={true}
          customStyles={{
            video:{
              height: '100%',
            }
          }}
        />
      </VideoContainer>
      <IconsContainer>
        <VideoPlayerFooter 
          url={ link ? link : url } 
          updatedFavorite={updatedFavorite}
          setUpdatedFavorite={setUpdatedFavorite}
        />
      </IconsContainer>
    </Container>
  );
}

export default VideoPlayer;