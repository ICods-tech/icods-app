import React, { useRef, useState } from 'react';
import Video from 'react-native-video-player';
import { Container, IconsContainer, VideoContainer } from './styles';
import VideoPlayerFooter from '../../components/VideoPlayer/VideoPlayerFooter';
import { useAuth } from '../../hooks/auth';
import Header from '../../components/Header';

const VideoPlayer = ( { route, _ }: any ) =>
{
  const {user} = useAuth();

  const { qrcode } = route.params;
  const url = 'https://bucket-nodejs.s3.amazonaws.com/LOGOVETOR_1.mp4';

  return (
    <Container>
      <Header page="" navigate={ user ? 'Dashboard' : 'SignIn' } color="#FFFFFF" isVideoPlayer/>
      <VideoContainer>
        <Video 
          video={{ uri: qrcode.link ? qrcode.link : url}}
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
        <VideoPlayerFooter url={ qrcode.link ? qrcode.link : url } />
      </IconsContainer>


    </Container>
  );
}

export default VideoPlayer;