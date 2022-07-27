import { useNavigation } from '@react-navigation/native';
import { Moment } from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { LogBox, SafeAreaView } from 'react-native';
import * as Progress from 'react-native-progress';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components/native';
import { Colors } from '../../@types/interfaces';
import { Spacer } from '../../components/atoms/Spacer';
import { HeaderHistory } from '../../components/History/HeaderHistory';
import { HistoryCards } from '../../components/History/HistoryCards';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import { filteredQRCodesByDatePlaceholder } from '../../utils/filteredQRCodesByDatePlaceholder';
import formattedDate from '../../utils/formatDates';
import {
  CloudContainer,
  CloudLeftLarge,
  CloudRightSmall,
  Container,
  Content,
  LargeSearchIcon,
  NoResultsFoundDescriptionText,
  NoResultsFoundText,
  NotFoundContainer,
  QRCodeDateList,
  QRCodeList,
  QRCodeTitleContainer,
  QRCodeTitleDate,
} from './styles';

LogBox.ignoreLogs(['EventEmitter.removeListener']);

export interface FilteredQRCodes {
  id: string;
  enabled: boolean;
  link: string;
  status: string;
  content: string;
  favorited: boolean;
  postId: string | null;
  comparisonDate: string;
  qrCodeCreatorName: string;
  color: Colors;
}

export interface FilteredQRCodesByDate {
  [date: string]: FilteredQRCodes[];
}

const History = () => {
  const { token } = useAuth();
  const navigation = useNavigation<any>();
  const theme = useTheme();
  const [reloadState, setReloadState] = useState(false);
  const [qrCodes, setQRCodes] = useState<FilteredQRCodesByDate[]>(
    filteredQRCodesByDatePlaceholder,
  );
  const [color, setColor] = useState<Colors>('noFilter');
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Moment | undefined>(
    undefined,
  );
  const [favoriteFilter, setFavoriteFilter] = useState<boolean>(false);

  function handleFavoriteFilter() {
    setFavoriteFilter(!favoriteFilter);
  }

  const loadQRCodes = useCallback(
    async (
      color: String,
      selectedDate: Date | undefined,
      favoriteFilter: boolean,
    ) => {
      try {
        console.log('fui chamado porra', { color, selectedDate, favoriteFilter, token });

        const dateObject = selectedDate ? {
          month: selectedDate.getMonth(),
          year: selectedDate.getFullYear(),
        } : {}

        console.log('ESSE É O OBJETO QUE EU TO PASSANDO PRA API', {
          color,
          favorite: favoriteFilter.toString(),
          ...dateObject
        },)

        const response = await api.get('filtered_qrcodes/data', {
          params: {
            color,
            favorite: favoriteFilter.toString(),
            ...dateObject
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setQRCodes(response.data.data);
        setLoading(false);
        setReloadState(false);
      } catch (err: any) {
        console.log("ERRO INSANO")
        console.log(err.response.data)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [reloadState],
  );

  useEffect(() => {
    loadQRCodes(color, selectedDate?.toDate(), favoriteFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reloadState]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <HeaderHistory
          selectedColor={color}
          setSelectedColor={setColor}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          setColorAndDate={() => {
            loadQRCodes(color, selectedDate?.toDate(), favoriteFilter);
          }}
          favorite={favoriteFilter}
          setFavorite={() => {
            handleFavoriteFilter();
            loadQRCodes(color, selectedDate?.toDate(), !favoriteFilter);
          }}
        />
        <Content>
          <QRCodeDateList
            data={qrCodes}
            refreshing={loading}
            onRefresh={() => loadQRCodes(color, selectedDate?.toDate(), favoriteFilter)}
            keyExtractor={(item) => {
              const [date] = Object.keys(item);
              return date;
            }}
            renderItem={({ item }) => {
              const [date] = Object.keys(item);
              if (date !== '0' && date !== null && date !== undefined) {
                return (
                  <>
                    <QRCodeTitleContainer>
                      <QRCodeTitleDate>{date}</QRCodeTitleDate>
                      <CloudContainer>
                        <CloudLeftLarge />
                        <CloudRightSmall />
                      </CloudContainer>
                    </QRCodeTitleContainer>

                    <QRCodeList
                      data={item[date]}
                      keyExtractor={(item) => item.id}
                      ItemSeparatorComponent={() => <Spacer bottom={8} />}
                      renderItem={({ item }) => {
                        const {
                          id,
                          color,
                          comparisonDate,
                          favorited,
                          qrCodeCreatorName,
                          link,
                          status,
                        } = item;
                        return (
                          <>
                            <HistoryCards
                              pressed={() => {
                                navigation.navigate('QRCodeHistoryDetails', {
                                  onGoBack: (changed: boolean) => {
                                    changed && setReloadState(!reloadState);
                                  },
                                  id,
                                  color,
                                  creator: qrCodeCreatorName,
                                  favorite: favorited,
                                  status,
                                  link,
                                });
                              }}
                              key={id}
                              id={id}
                              creator={qrCodeCreatorName}
                              date={formattedDate(new Date(comparisonDate))}
                              color={color}
                              link={link}
                              favorite={favorited}
                              privacy="Público"
                            />
                          </>
                        );
                      }}
                    />
                  </>
                );
              } else if (!qrCodes[0]['0'].length && loading) {
                return (
                  <NotFoundContainer>
                    <Progress.Circle
                      size={RFValue(120)}
                      indeterminate={true}
                      borderWidth={16}
                      thickness={8}
                      color={theme.colors.primary}
                    />
                  </NotFoundContainer>
                );
              } else {
                return (
                  <NotFoundContainer>
                    <LargeSearchIcon />
                    <NoResultsFoundText>
                      Nenhum resultado obtido
                    </NoResultsFoundText>
                    <NoResultsFoundDescriptionText>
                      Tente realizar uma filtragem mais específica dos iCods
                    </NoResultsFoundDescriptionText>
                  </NotFoundContainer>
                );
              }
            }}
          />
        </Content>
      </Container>
    </SafeAreaView>
  );
};

export default History;
