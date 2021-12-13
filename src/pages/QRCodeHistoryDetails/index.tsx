import React, { useCallback, useEffect, useState } from 'react';
import { CardColors } from '../../components/History/HistoryCards';
import { Colors } from '../../interfaces/colors';
import { 
  ColorButton, 
  ColorsButtonList, 
  Container, 
  Content, 
  Separator, 
  TitleQRCode,
  QRCodeContainer,
  QRCodeImgContainer,
  QRCodeTemplateImg,
  ColorSelectContainer,
  TitleColorSelect,
  OptionsButtonsQRContainer,
  ColorsSelectContainer,
} from './styles';
import { colorsIconsList } from '../../components/History/FilterModal'
import { ColorsSelect } from '../../components/ColorsSelect';
import { HeaderHistory } from '../../components/History/HeaderHistory';
import { IconRectButton } from '../../components/IconRectButton';
import { LoginSocialButton } from '../../components/Authentication/LoginSocialButton';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components/native';
import api from '../../services/api';
import FavoritedIcon from '../../assets/images/Icons/favorited-line.svg';
import HistoryFooter from '../../components/LoggedFooter';
import NotFavoritedIcon from '../../assets/images/Icons/notFavorited-line.svg';
import PlayIcon from '../../assets/images/Icons/playIcon.svg';
import ShareIcon from '../../assets/images/Icons/shareIcon.svg';

export interface QRCodeHistoryDetailsProps {
  id: string;
  color: Colors;
  favorited?: boolean;
}

interface RouteParams {
  route: {
    params: {
      id: string,
      color: Colors,
      favorite: boolean,
      creator: string,
      link: string
    }
  }
}

const QRCodeHistoryDetails = ({ route }: RouteParams) => {
  const navigation = useNavigation()
  const { id, color, creator, favorite, link } = route.params;
  const [updatedFavorite, setUpdatedFavorite] = useState<boolean>(favorite)
  const [updatedColor, setUpdatedColor] = useState<Colors>(color)
  const theme = useTheme();
  const handleFavoriteQRCode = useCallback(async (id: string) => {
    await api.patch(`received_qrcode/favorite/${id}`)
    setUpdatedFavorite(!updatedFavorite)
  }, [updatedFavorite])

  const handleChangeQRCodeColor = useCallback(async (color: Colors) => {
    await api.patch(`received_qrcode/color/${id}`, {
      color: (color === 'noFilter') ? 'noColor' : color
    })
    setUpdatedColor(color)
  }, [updatedColor])

  return (
    <Container>
      <HeaderHistory
        favorite={false}
        qrCodeDetails={true}
        setFavorite={() => { }}
        setColorAndDate={() => { }}
      />
      <Content>
        <QRCodeContainer>
          <TitleQRCode>iCOD {id.substr(id.length - 8)}</TitleQRCode>
          <QRCodeImgContainer updatedColor={updatedColor}>
            <QRCodeTemplateImg />
          </QRCodeImgContainer>
        </QRCodeContainer>

        <ColorSelectContainer>
          <TitleColorSelect>Alterar cor</TitleColorSelect>
            <ColorsSelect 
              data={colorsIconsList}
              selectedColor={updatedColor}
              setSelectedColor={handleChangeQRCodeColor}
            />
        </ColorSelectContainer>
        <OptionsButtonsQRContainer>
        <IconRectButton 
            onPress={() => {
              navigation.navigate('VideoPlayer', {
                qrcode: {
                  link
              }
            })
            }}
            text="Visualizar Conteúdo"
            icon={PlayIcon}
          />
          <Separator />
          <IconRectButton 
            onPress={() => {}}
            text="Compartilhar"
            icon={ShareIcon}
          />
          <Separator />   


          {creator !== 'Você' && (
            updatedFavorite ?
              <LoginSocialButton
                title="Desfazer Curtida iCod"
                background={'Blue'}
                style={{
                    width: RFValue(262),  
                    borderColor: theme.colors.primary,
                    backgroundColor: theme.colors.primary,
                    borderRadius: RFValue(131),
                  }}
                textColor={theme.colors.shape}
                icon={FavoritedIcon}
                onPress={() => handleFavoriteQRCode(id)}
              />
              : 
              <LoginSocialButton
                title="Curtir iCod"
                style={{
                  width: RFValue(260),
                  borderRadius: RFValue(131),
                  borderWidth: 2,
                  borderColor: 'black',
                }}
                icon={NotFavoritedIcon}
                onPress={() => handleFavoriteQRCode(id)}
              />
          )}
        </OptionsButtonsQRContainer>
      </Content>
      <HistoryFooter
        isHistory
      />
    </Container >
  )
}

export default QRCodeHistoryDetails;