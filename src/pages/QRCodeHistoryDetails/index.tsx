import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, Animated, TouchableOpacity } from 'react-native';
import styles from './styles';
import { HeaderHistory } from '../../components/History/HeaderHistory';
import HistoryFooter from '../../components/LoggedFooter';
import QRCodeTemplate from '../../assets/images/qrCodeLargeTemplate.svg'
import { colorsIconsList } from '../../components/History/FilterModal'
import api from '../../services/api';
import { CardColors } from '../../components/History/HistoryCards';
import PlayIcon from '../../assets/images/Icons/playIcon.svg'
import ShareIcon from '../../assets/images/Icons/shareIcon.svg'
import FavoritedIcon from '../../assets/images/Icons/favorited-line.svg'
import NotFavoritedIcon from '../../assets/images/Icons/notFavorited-line.svg'
import ButtonAuthentication from '../../components/Button';
import Toast from 'react-native-toast-message';
import { Colors } from '../../interfaces/colors';
import { ColorButton, ColorsButtonList, Separator } from './newStyles';

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
      creator: string
    }
  }
}

const QRCodeHistoryDetails = ({ route }: RouteParams) => {
  const { id, color, creator, favorite } = route.params
  const [updatedFavorite, setUpdatedFavorite] = useState<boolean>(favorite)
  const [updatedColor, setUpdatedColor] = useState<Colors>(color)

  const handleFavoriteQRCode = useCallback(async (id: string) => {
    await api.patch(`received_qrcode/favorite/${id}`)
    setUpdatedFavorite(!updatedFavorite)
    !updatedFavorite && Toast.show({
      type: 'success',
      position: 'bottom',
      text1: 'Você curtiu o iCod',
      visibilityTime: 1200,
      bottomOffset: 100,
    })
  }, [updatedFavorite])

  const handleChangeQRCodeColor = useCallback(async (color: Colors) => {
    await api.patch(`received_qrcode/color/${id}`, { color })
    setUpdatedColor(color)
  }, [updatedColor])

  return (
    <SafeAreaView style={styles.background}>
      <HeaderHistory
        favorite={false}
        qrCodeDetails={true}
        setFavorite={() => { }}
        setColorAndDate={() => { }}
      />
      <View style={styles.container}>
        <View style={styles.codeContainer}>
          <Text style={styles.headersText}>iCOD {id.substr(id.length - 8)}</Text>
          <View style={{ borderWidth: 4, borderColor: (updatedColor !== 'noColor' && updatedColor !== 'noFilter') ? CardColors[updatedColor] : 'white', borderRadius: 6 }}>
            <QRCodeTemplate />
          </View>
        </View>
        <View style={styles.colorContainer}>
          <Text style={styles.headersText}>Alterar cor</Text>
          <ColorsButtonList 
                data={colorsIconsList}
                keyExtractor={(item) => item.key}
                renderItem={({item}) => {
                  const {icon: Icon, key} = item;
                  return (
                    <ColorButton
                      onPress={() =>{ handleChangeQRCodeColor(key as Colors) }}
                      selectedColor={updatedColor}
                      color={key as Colors}
                    >
                    <Icon/>
                  </ColorButton>
                    )
                  }
                }
                ItemSeparatorComponent={() => <Separator />}
              />
          {/* <View style={styles.colorIconsContainer}>
            {colorsIconsList.map(color => {
              const {key, icon: Icon} = color;
              return (
                <TouchableOpacity
                  onPress={() => { handleChangeQRCodeColor(key as Colors) }}
                  style={(
                    (updatedColor == key)
                    || (updatedColor == 'noColor' && key === 'noFilter')) && styles.selectedColor}
                >
                  {Icon}
                </TouchableOpacity>
              )
            })}
          </View> */}
        </View>
        <View style={{
          marginTop: 36,
          display: 'flex',
          justifyContent: 'space-between',
          height: creator === 'Você' ? 90 : 140,
        }}>
          <ButtonAuthentication
            pressed={() => { }}
            text="Visualizar Conteúdo"
            icon={<PlayIcon style={{ marginRight: 8 }} />}
          />
          <ButtonAuthentication
            pressed={() => { }}
            text="Compartilhar"
            icon={<ShareIcon style={{ marginRight: 8 }} />}
          />
          {creator !== 'Você' && (
            updatedFavorite ?
              <ButtonAuthentication
                pressed={() => handleFavoriteQRCode(id)}
                text="Desfazer Curtida iCod"
                icon={<FavoritedIcon style={{ marginRight: 8 }}
                />}
              />
              : <ButtonAuthentication
                pressed={() => handleFavoriteQRCode(id)}
                text="Curtir iCod"
                notActivated
                icon={<NotFavoritedIcon style={{ marginRight: 8 }}
                />}
              />
          )}
        </View>
      </View>
      <HistoryFooter
        isHistory
      />
    </SafeAreaView >
  )
}

export default QRCodeHistoryDetails;