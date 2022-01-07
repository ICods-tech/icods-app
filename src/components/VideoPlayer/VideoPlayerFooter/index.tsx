import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Share } from 'react-native';
import styles from './styles';
import RNFS from 'react-native-fs';
import IconDownload from '../../../assets/images/icon_download.svg';
import HeartVideoIcon from '../../../assets/images/heartvideoicon.svg';
import HeartVideoIconFilled from '../../../assets/images/heartvideoiconfilled.svg';
import IconShare from '../../../assets/images/icon_share.svg';
import { useAuth } from '../../../hooks/auth';
import { useNavigation } from '@react-navigation/native';

interface VideoPlayerFooterProps
{
  url: string;
  updatedFavorite: boolean;
  setUpdatedFavorite: (updatedFavorite: boolean) => void;
}

const VideoPlayerFooter = ( { url, updatedFavorite, setUpdatedFavorite }: VideoPlayerFooterProps ) =>
{
  const { user } = useAuth();
  const navigation = useNavigation();
  const path = `${ RNFS.PicturesDirectoryPath }/${ Date.now() }.mp4`;
  const [favoriteButton, setFavoritedButton] = useState<boolean>(updatedFavorite);
  
  console.log('ANTES: ', favoriteButton);
  const onDownloadPress = async () =>
  {
    const headers = {
      'Accept': 'video/mp4',
      'Content-Type': 'video/mp4'
    }

    const options: RNFS.DownloadFileOptions = {
      fromUrl: url,
      toFile: path,
      headers: headers
    }

    const response = RNFS.downloadFile(options);
  }

  const onSharePress = async () =>
  {
    const result = await Share.share( {
      message: `${ url } \n\nConfira essa recordação enviada para mim através do iCods. `,
      url,
    } );
  };

  const onLikePress = async () =>
  {
    if( user ){
      setFavoritedButton(!favoriteButton)
      setUpdatedFavorite(!updatedFavorite)
      console.log('DEPOIS: ', favoriteButton)
    }else{
      navigation.navigate( "GiftOpen" );
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={ onDownloadPress }>
        <IconDownload />
      </TouchableOpacity>
      
      <TouchableOpacity onPress={ onLikePress }>
        { favoriteButton ? 
            <HeartVideoIconFilled />
            : 
            <HeartVideoIcon/>
          }
      </TouchableOpacity>
      
      <TouchableOpacity onPress={ onSharePress }>
        <IconShare />
      </TouchableOpacity>
    </View>
  );
}

export default VideoPlayerFooter;
