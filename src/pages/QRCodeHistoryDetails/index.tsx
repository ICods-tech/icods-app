import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {Play, Unlock} from 'react-native-iconly';
import {RFValue} from 'react-native-responsive-fontsize';
import {useTheme} from 'styled-components/native';
import SaveIcon from '../../assets/images/Icons/save-icon.svg';
import ConfirmUpdate from '../../assets/images/Icons/saved_icon.svg';
import {ColorsSelect} from '../../components/ColorsSelect';
import {FavoriteButton} from '../../components/FavoriteButton';
import {colorsIconsList} from '../../components/History/FilterModal';
import {HeaderHistory} from '../../components/History/HeaderHistory';
import {IconReactButton} from '../../components/IconReactButton';
import {ShareButton} from '../../components/ShareButton';
import {WarningModal} from '../../components/WarningModal';
import {Colors} from '../../interfaces/colors';
import api from '../../services/api';
import {
  ColorSelectContainer,
  Container,
  ContainerButton,
  Content,
  IconsContainer,
  OptionsButtonsQRContainer,
  QRCodeContainer,
  QRCodeImgContainer,
  QRCodeInfoContainer,
  QRCodeInfoTopContainer,
  QRCodeTemplateImg,
  Separator,
  TitleColorSelect,
  TitleQRCode,
} from './styles';

import {displayToast} from '../../utils/Toast';
import {useBackHandler} from '../../utils/useBackHandler';

export interface QRCodeHistoryDetailsProps {
  id: string;
  color: Colors;
  favorited?: boolean;
}

export interface RouteParams {
  route: {
    params: {
      id: string;
      color: Colors;
      favorite: boolean;
      creator: string;
      link: string;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onGoBack: (changed: boolean) => void;
    };
  };
}

const QRCodeHistoryDetails = ({route}: RouteParams) => {
  const navigation = useNavigation<any>();
  const {
    id,
    color: initialColorState,
    creator,
    favorite: initialFavoriteState,
    link,
    onGoBack,
  } = route.params;

  const [changesWereMade, setChangesWereMade] = useState(false);
  const [updatedFavorite, setUpdatedFavorite] = useState<boolean>(
    initialFavoriteState,
  );
  const [updatedColor, setUpdatedColor] = useState<Colors>(initialColorState);
  const [lastSavedFavorite, setLastSavedFavorite] = useState<boolean>(
    initialFavoriteState,
  );
  const [lastSavedColor, setLastSavedColor] = useState<Colors>(
    initialColorState,
  );

  const [saveChangesModalOpen, setSaveChangesModalOpen] = useState(false);

  function handleCloseModal() {
    setSaveChangesModalOpen(false);
    navigation.goBack();
  }

  function handleOpenModal() {
    setSaveChangesModalOpen(true);
  }

  const theme = useTheme();

  const handleFavoriteQRCode = useCallback(
    async (id: string) => {
      await api.patch(`received_qrcode/favorite/${id}`, {
        favorited: updatedFavorite,
      });
      setLastSavedFavorite(updatedFavorite);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [updatedFavorite, lastSavedFavorite],
  );

  const handleChangeQRCodeColor = useCallback(
    async (color: Colors) => {
      await api.patch(`received_qrcode/color/${id}`, {
        color: color === 'noFilter' ? 'noColor' : color,
      });
      setLastSavedColor(updatedColor);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [updatedColor, lastSavedColor],
  );

  const PlayIcon = () => (
    <Play
      set={'bulk'}
      style={{
        borderColor: theme.colors.primary,
        borderWidth: RFValue(2),
        borderRadius: RFValue(16),
      }}
      filled={false}
      primaryColor={theme.colors.primary}
      secondaryColor={'white'}
    />
  );
  const UnlockIcon = () => <Unlock set={'bold'} color={theme.colors.primary} />;

  function isColorDifferent() {
    return updatedColor !== lastSavedColor;
  }

  function isFavoriteDifferent() {
    return updatedFavorite !== lastSavedFavorite;
  }

  function qrCodeChangedWithoutSave() {
    return isColorDifferent() || isFavoriteDifferent();
  }

  useBackHandler(() => {
    if (qrCodeChangedWithoutSave()) {
      saveChangesModalOpen ? handleCloseModal() : handleOpenModal();
      return true;
    }
    return false;
  });

  return (
    <Container>
      <HeaderHistory
        favorite={false}
        qrCodeDetails={true}
        backButtonPressed={() => {
          if (qrCodeChangedWithoutSave()) {
            handleOpenModal();
          } else {
            onGoBack(changesWereMade);
            navigation.goBack();
          }
        }}
        setFavorite={() => {}}
        setColorAndDate={() => {}}
      />
      <WarningModal
        title={'Você precisa salvar as alterações'}
        description={
          'Você realizou alterações no QR Code e está saindo sem salva-las'
        }
        icon={ConfirmUpdate}
        iconBackgroundColor={theme.colors.primary}
        isFooterButtonsActived
        visible={saveChangesModalOpen}
        confirmText="Salvar"
        onCloseModal={handleCloseModal}
        handleAsyncConfirmed={async () => {
          isColorDifferent() && (await handleChangeQRCodeColor(updatedColor));
          isFavoriteDifferent() && (await handleFavoriteQRCode(id));
          handleCloseModal();
          onGoBack(true);
        }}
      />
      <Content>
        <QRCodeInfoContainer>
          <QRCodeInfoTopContainer>
            <QRCodeContainer>
              <TitleQRCode>iCOD {id.substring(id.length - 8)}</TitleQRCode>
              <QRCodeImgContainer updatedColor={updatedColor}>
                <QRCodeTemplateImg />
              </QRCodeImgContainer>
            </QRCodeContainer>
            <IconsContainer>
              {creator !== 'Você' ? (
                <FavoriteButton
                  style={{marginBottom: RFValue(16)}}
                  onPress={() => setUpdatedFavorite(!updatedFavorite)}
                  background="WHITE"
                  favorite={updatedFavorite}
                />
              ) : (
                <></>
              )}
              <ShareButton onPress={() => {}} background="WHITE" />
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
            <IconReactButton
              color={'White'}
              onPress={() => {}}
              style={{width: RFValue(212)}}
              text="Público"
              icon={UnlockIcon}
            />
            <Separator />
            <IconReactButton
              color={'White'}
              onPress={() => {
                if (link) {
                  navigation.navigate('VideoPlayer', {
                    qrcode: {
                      link,
                      updatedFavorite,
                      setUpdatedFavorite,
                    },
                    isHistoryDetails: true,
                  });
                }
              }}
              style={{width: RFValue(212)}}
              text="Visualizar Conteúdo"
              icon={PlayIcon}
            />
          </OptionsButtonsQRContainer>
        </QRCodeInfoContainer>
        <ContainerButton>
          <IconReactButton
            onPress={() => {
              if (qrCodeChangedWithoutSave()) {
                isColorDifferent() && handleChangeQRCodeColor(updatedColor);
                isFavoriteDifferent() && handleFavoriteQRCode(id);
                displayToast({
                  type: 'success',
                  message1: 'As alterações foram salvas com sucesso',
                  duration: 1200,
                });
                setChangesWereMade(true);
              }
            }}
            style={{width: RFValue(212)}}
            text="Salvar alterações"
            icon={SaveIcon}
          />
        </ContainerButton>
      </Content>
    </Container>
  );
};

export default QRCodeHistoryDetails;
