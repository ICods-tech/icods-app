import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Share, TouchableOpacity, View} from 'react-native';
import RNFS from 'react-native-fs';
import HeartVideoIcon from '../../../assets/images/heartvideoicon.svg';
import HeartVideoIconFilled from '../../../assets/images/heartvideoiconfilled.svg';
import IconDownload from '../../../assets/images/icon_download.svg';
import IconShare from '../../../assets/images/icon_share.svg';
import {useAuth} from '../../../hooks/auth';
import styles from './styles';

interface VideoPlayerFooterProps {
  url: string;
  updatedFavorite: boolean;
  showFavoriteIcon?: boolean;
  setUpdatedFavorite: (updatedFavorite: boolean) => void;
}

const VideoPlayerFooter = ({
  url,
  updatedFavorite,
  setUpdatedFavorite,
  showFavoriteIcon = true,
}: VideoPlayerFooterProps) => {
  const {user} = useAuth();
  const navigation = useNavigation<any>();
  const path = `${RNFS.PicturesDirectoryPath}/${Date.now()}.mp4`;
  const [favoriteButton, setFavoritedButton] = useState<boolean>(
    updatedFavorite,
  );

  const onDownloadPress = async () => {
    const headers = {
      Accept: 'video/mp4',
      'Content-Type': 'video/mp4',
    };

    const options: RNFS.DownloadFileOptions = {
      fromUrl: url,
      toFile: path,
      headers: headers,
    };

    const response = RNFS.downloadFile(options);
  };

  const onSharePress = async () => {
    await Share.share({
      message: `${url} \n\nConfira essa recordação enviada para mim através do iCods. `,
      url,
    });
  };

  const onLikePress = async () => {
    if (user) {
      setFavoritedButton(!favoriteButton);
      setUpdatedFavorite(!updatedFavorite);
    } else {
      navigation.navigate('GiftOpen');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onDownloadPress}>
        <IconDownload />
      </TouchableOpacity>
      
      {showFavoriteIcon && (
        <TouchableOpacity onPress={onLikePress}>
          {favoriteButton ? <HeartVideoIconFilled /> : <HeartVideoIcon />}
        </TouchableOpacity>
      )} 

      <TouchableOpacity onPress={onSharePress}>
        <IconShare />
      </TouchableOpacity>
    </View>
  );
};

export default VideoPlayerFooter;
