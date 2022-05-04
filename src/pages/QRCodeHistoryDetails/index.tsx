import React, { useCallback, useEffect, useState } from 'react';
import { Colors } from '../../interfaces/colors';
import {
  Container,
  Content,
  Separator,
  TitleQRCode,
  IconsContainer,
  QRCodeContainer,
  QRCodeImgContainer,
  QRCodeTemplateImg,
  ColorSelectContainer,
  QRCodeInfoTopContainer,
  TitleColorSelect,
  OptionsButtonsQRContainer,
  QRCodeInfoContainer,
  SaveChangesContainer,
} from './styles';
import { colorsIconsList } from '../../components/History/FilterModal'
import { ColorsSelect } from '../../components/ColorsSelect';
import { HeaderHistory } from '../../components/History/HeaderHistory';
import { IconRectButton } from '../../components/IconRectButton';
import { RFValue } from 'react-native-responsive-fontsize';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components/native';
import api from '../../services/api';
import { FavoriteButton } from '../../components/FavoriteButton';
import HistoryFooter from '../../components/LoggedFooter';
import SaveIcon from '../../assets/images/Icons/save-icon.svg';
import SaveIconModal from '../../assets/images/Icons/save-changes-icon.svg';
import { Play, Unlock } from 'react-native-iconly'
import { ShareButton } from '../../components/ShareButton';
import { ChangeInfoModal } from '../../components/ChangeInfoModal';
import Toast from 'react-native-toast-message';

export interface QRCodeHistoryDetailsProps {
  id: string;
  color: Colors;
  favorited?: boolean;
}

export interface RouteParams {
  route: {
    params: {
      id: string,
      color: Colors,
      favorite: boolean,
      creator: string,
      link: string,
      onGoBack: (changed: boolean) => void
    }
  }
}

const QRCodeHistoryDetails = ({ route }: RouteParams) => {
  const navigation = useNavigation<any>()
  const { id, color: initialColorState, creator, favorite: initialFavoriteState, link, onGoBack } = route.params;

  const [changesWereMade, setChangesWereMade] = useState(false);
  const [updatedFavorite, setUpdatedFavorite] = useState<boolean>(initialFavoriteState)
  const [updatedColor, setUpdatedColor] = useState<Colors>(initialColorState)
  const [lastSavedFavorite, setLastSavedFavorite] = useState<boolean>(initialFavoriteState)
  const [lastSavedColor, setLastSavedColor] = useState<Colors>(initialColorState)

  const [saveChangesModalOpen, setSaveChangesModalOpen] = useState(false)
  const theme = useTheme();

  const handleFavoriteQRCode = useCallback(async (id: string) => {
    await api.patch(`received_qrcode/favorite/${id}`, { favorited: updatedFavorite })
    setLastSavedFavorite(updatedFavorite)
  }, [updatedFavorite, lastSavedFavorite])


  const handleChangeQRCodeColor = useCallback(async (color: Colors) => {
    await api.patch(`received_qrcode/color/${id}`, {
      color: (color === 'noFilter') ? 'noColor' : color
    })
    setLastSavedColor(updatedColor)
  }, [updatedColor, lastSavedColor])


  const PlayIcon = () => <Play set={'bulk'} style={{ borderColor: theme.colors.primary, borderWidth: RFValue(2), borderRadius: RFValue(16) }} filled={false} primaryColor={theme.colors.primary} secondaryColor={'white'} />
  const UnlockIcon = () => <Unlock set={'bold'} color={theme.colors.primary} />

  // useEffect(() => { 
  //   handleFavoriteQRCode(id);
  // }, [updatedFavorite]);
  return (
    <Container>
      <HeaderHistory
        favorite={false}
        qrCodeDetails={true}
        backButtonPressed={() => {
          const colorIsDifferent = updatedColor !== lastSavedColor
          const favoriteIsDifferent = updatedFavorite !== lastSavedFavorite

          if (colorIsDifferent || favoriteIsDifferent) {
            setSaveChangesModalOpen(true)
          } else {
            onGoBack(changesWereMade)
            navigation.goBack()
          }
        }}
        setFavorite={() => { }}
        setColorAndDate={() => { }}
      />
      <ChangeInfoModal
        title={'Você precisa salvar as alterações'}
        description={'Você realizou alterações no QR Code e está saindo sem salva-las'}
        icon={<SaveIconModal />}
        iconBackgroundColor={theme.colors.warning}
        visible={saveChangesModalOpen}
        confirmText='Salvar'
        pressedOut={() => setSaveChangesModalOpen(!saveChangesModalOpen)}
        handleSaveUpdatesconfirmed={async () => {
          updatedColor !== lastSavedColor && await handleChangeQRCodeColor(updatedColor)
          updatedFavorite !== lastSavedFavorite && await handleFavoriteQRCode(id)
          setSaveChangesModalOpen(false)
          onGoBack(true)
          navigation.goBack()
        }}
      />
      <Content>
        <QRCodeInfoContainer>
          <QRCodeInfoTopContainer>
            <QRCodeContainer>
              <TitleQRCode>iCOD {id.substr(id.length - 8)}</TitleQRCode>
              <QRCodeImgContainer updatedColor={updatedColor}>
                <QRCodeTemplateImg />
              </QRCodeImgContainer>
            </QRCodeContainer>
            <IconsContainer>
              {creator !== 'Você'
                ? <FavoriteButton
                  style={{ marginBottom: RFValue(16) }}
                  onPress={() => setUpdatedFavorite(!updatedFavorite)}
                  background='WHITE'
                  favorite={updatedFavorite}
                /> : <></>}
              <ShareButton
                onPress={() => { }}
                background='WHITE'
              />
            </IconsContainer>
          </QRCodeInfoTopContainer>
          <ColorSelectContainer>
            <TitleColorSelect>Alterar cor</TitleColorSelect>
            <ColorsSelect
              data={colorsIconsList}
              selectedColor={updatedColor}
              setSelectedColor={(color: Colors) => setUpdatedColor(color)}
            />
          </ColorSelectContainer>
          <OptionsButtonsQRContainer>
            <IconRectButton
              color={'White'}
              onPress={() => { }}
              style={{ width: RFValue(212) }}
              text="Público"
              icon={UnlockIcon}
            />
            <Separator />
            <IconRectButton
              color={'White'}
              onPress={() => {
                if (link) {
                  navigation.navigate('VideoPlayer', {
                    qrcode: {
                      link,
                      updatedFavorite,
                      setUpdatedFavorite,
                    },
                    isHistoryDetails: true
                  })
                }
              }}
              style={{ width: RFValue(212) }}
              text="Visualizar Conteúdo"
              icon={PlayIcon}
            />
          </OptionsButtonsQRContainer>
        </QRCodeInfoContainer>
      </Content>
      <SaveChangesContainer>
        <IconRectButton
          onPress={() => {
            const colorsAreDifferent = updatedColor !== lastSavedColor
            const favoritesAreDifferent = updatedFavorite !== lastSavedFavorite

            if (colorsAreDifferent || favoritesAreDifferent) {
              colorsAreDifferent && handleChangeQRCodeColor(updatedColor)
              favoritesAreDifferent && handleFavoriteQRCode(id)
              Toast.show({
                type: 'success',
                position: 'bottom',
                text1: 'As alterações foram salvas com sucesso',
                visibilityTime: 1200,
                bottomOffset: 100,
              })

              setChangesWereMade(true)
            }
          }}
          style={{ width: RFValue(212) }}
          text="Salvar alterações"
          icon={SaveIcon}
        />
      </SaveChangesContainer>
      <HistoryFooter
        isHistory
      />
    </Container >
  )
}

export default QRCodeHistoryDetails;