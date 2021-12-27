import React, { useCallback, useEffect, useState } from 'react';
import api from '../../services/api';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { SafeAreaView, Animated, LogBox } from 'react-native';
import { 
  CloudContainer, 
  CloudLeftLarge, 
  CloudRightSmall, 
  Container, 
  Content, 
  DeleteButton, 
  DeleteButtonIcon, 
  FavoriteCardButtonIcon, 
  FavoritedButton, 
  LargeSearchIcon, 
  NoResultsFoundDescriptionText, 
  NoResultsFoundText, 
  NotFavoritedCardButtonIcon, 
  NotFoundContainer,  
  QRCodeDateList, 
  QRCodeList, 
  QRCodeOptionsContainer, 
  QRCodeTitleContainer, 
  QRCodeTitleDate
} from './styles';
import { filteredQRCodesByDatePlaceholder } from '../../utils/filteredQRCodesByDatePlaceholder';
import { HistoryCards } from '../../components/History/HistoryCards';
import { HeaderHistory } from '../../components/History/HeaderHistory';
import LoggedFooter  from '../../components/LoggedFooter';
import formattedDate from '../../utils/formatDates';
import { RFValue } from 'react-native-responsive-fontsize';
import { Moment } from 'moment';
import * as Progress from 'react-native-progress';
import { useNavigation } from '@react-navigation/native';


LogBox.ignoreLogs(["EventEmitter.removeListener"]);

export interface FilteredQRCodes {
  id: string,
  enabled: boolean,
  link: string,
  content: string,
  favorited: boolean,
  postId: string | null,
  comparisonDate: string,
  qrCodeCreatorName: string,
  color: Colors
}

export interface FilteredQRCodesByDate {
  [date: string]: FilteredQRCodes[];
}

interface RouteParams {
  route: {
    params: {
      reload: boolean,
    }
  }
}

const History = ({ route }: RouteParams) => {
  const navigation = useNavigation();
  const reload = (route.params && route.params.reload) ? route.params.reload : false;

  const [reloadState, setReloadState] = useState(reload);
  const [qrCodes, setQRCodes] = useState<FilteredQRCodesByDate[]>(filteredQRCodesByDatePlaceholder)
  const [color, setColor] = useState<Colors>('noFilter')
  const [loading, setLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState<Moment | undefined>(undefined)
  const [reloadAfterDetails, setReloadAfterDetails] = useState(false)
  const [favoriteFilter, setFavoriteFilter] = useState<boolean>(false)

  function handleFavoriteFilter() {
    setFavoriteFilter(!favoriteFilter);
  }

  const loadQRCodes = useCallback(async (color: String, selectedDate: Date | undefined, favoriteFilter: boolean) => {
    console.log('to casrregando de novo')
    const response = await api.get('filtered_qrcodes/data', {
      params: {
        color,
        favorite: favoriteFilter.toString(),
        month: selectedDate ? selectedDate.getMonth() : null,
        year: selectedDate ? selectedDate.getFullYear() : null
      }
    })

    setQRCodes(response.data.data)
    setLoading(false)
    setReloadState(false)
  }, [reloadState])

  useEffect(() => {
    loadQRCodes(color, selectedDate?.toDate(), favoriteFilter)
  }, [reloadState])

  return (
    <SafeAreaView style={{flex: 1}}>
      <Container>
      <HeaderHistory
        selectedColor={color}
        setSelectedColor={setColor}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        setColorAndDate={() => {
          loadQRCodes(color, selectedDate?.toDate(), favoriteFilter)
        }}
        favorite={favoriteFilter}
        setFavorite={() => {
          handleFavoriteFilter()
          loadQRCodes(color, selectedDate?.toDate(), !favoriteFilter)
        }}
      />
      
      <Content>
        <QRCodeDateList
          data={qrCodes}
          keyExtractor={(item) => {
            const [date] = Object.keys(item)
            return date;
          }}
          renderItem={({item}) => {
            const [date] = Object.keys(item)
            if (date !== '0' && date !== null && date !== undefined) {
              return (
                <>
                  <QRCodeTitleContainer>
                    <QRCodeTitleDate>{date}</QRCodeTitleDate>
                    <CloudContainer>
                      <CloudLeftLarge/>
                      <CloudRightSmall/>
                    </CloudContainer>
                  </QRCodeTitleContainer>
                  
                  <QRCodeList 
                    data={item[date]}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => {
                      const { id, color, content, comparisonDate, favorited, qrCodeCreatorName, link  } = item
                      return(
                        <>
                          <HistoryCards
                              pressed={() => {
                                navigation.navigate('QRCodeHistoryDetails', {
                                  id, 
                                  color, 
                                  creator: qrCodeCreatorName, 
                                  favorite: favorited, 
                                  link
                                })
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
                      )
                    }    
                  }                  
                  />
                </>
              )
            } else if (!(qrCodes[0]["0"].length) && loading) {
              return (
                  <NotFoundContainer>
                    <Progress.Circle
                      size={RFValue(120)}
                      indeterminate={true}
                      borderWidth={16}
                      thickness={8}
                      color={"#2b90d9"}
                    />
                  </NotFoundContainer>
                )
            } else {
              return (
                <NotFoundContainer>
                  <LargeSearchIcon />
                  <NoResultsFoundText>Nenhum resultado obtido</NoResultsFoundText>
                  <NoResultsFoundDescriptionText>
                    Tente realizar uma filtragem mais
                    específica dos iCods 
                  </NoResultsFoundDescriptionText>
                </NotFoundContainer>
              )  
            }
          }}
        />
      </Content>
      <LoggedFooter
        isHistory={true}
      />
      </Container>
    </SafeAreaView >
  )
}

export default History;
