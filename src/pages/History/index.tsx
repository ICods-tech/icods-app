import React, { useCallback, useEffect, useState } from 'react';
import api from '../../services/api';
import FavoriteCardButton from '../../assets/images/Icons/favorite_qrcode_card.svg'
import NotFavoritedCardButton from '../../assets/images/Icons/notFavorited_qrcode_card.svg'
import Swipeable from 'react-native-gesture-handler/Swipeable';
import TrashQRCodeIcon from '../../assets/images/Icons/trash_qrcode_card.svg'
import styles from './styles';
import { View, SafeAreaView, ScrollView, Animated, TouchableOpacity } from 'react-native';
import { 
  CloudContainer, 
  CloudLeftLarge, 
  CloudRightSmall, 
  Container, 
  Content, 
  LargeSearchIcon, 
  NoResultsFoundDescriptionText, 
  NoResultsFoundText, 
  NotFountContainer, 
  QRCodeList, 
  QRCodeTitleContainer, 
  QRCodeTitleDate
} from './newStyles';
import { filteredQRCodesByDatePlaceholder } from '../../utils/filteredQRCodesByDatePlaceholder';
import { HistoryCards } from '../../components/History/HistoryCards';
import { HeaderHistory } from '../../components/History/HeaderHistory';
import LoggedFooter  from '../../components/LoggedFooter';
import formattedDate from '../../utils/formatDates';

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
  [date: string]: FilteredQRCodes[] | []
}


const History = () => {
  const [qrCodes, setQRCodes] = useState<FilteredQRCodesByDate[]>(filteredQRCodesByDatePlaceholder)
  const [color, setColor] = useState<string>('noFilter')
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [favoriteFilter, setFavoriteFilter] = useState<boolean>(false)

  function handleFavoriteFilter() {
    setFavoriteFilter(!favoriteFilter);
  }

  const loadQRCodes = useCallback(async () => {
    console.log('I am being loaded with the following data')
    console.log('Color', color)
    console.log('Month', selectedDate?.getMonth())
    console.log('Year', selectedDate?.getFullYear())
    const response = await api.get('filtered_qrcodes/data', {
      params: {
        color,
        favorite: favoriteFilter.toString(),
        month: selectedDate ? selectedDate.getMonth() : null,
        year: selectedDate ? selectedDate.getFullYear() : null
      }
    })
    setQRCodes(response.data.data)
  }, [qrCodes])

  const handleFavoriteQRCodes = useCallback(async (id: string) => {
    await api.patch(`received_qrcode/favorite/${id}`)
  }, [])

  useEffect(() => {
    loadQRCodes()
  }, [loadQRCodes])

  const RightActions = (
    progress: any, 
    dragX: any, 
    id: string, 
    qrCodeBelongsToUser: boolean, 
    favorited: boolean
    ) => {
    const scale = dragX.interpolate({
      inputRange: qrCodeBelongsToUser ? [-120, 0] : [-90, 0],
      outputRange: qrCodeBelongsToUser ? [2, 0] : [0.8, 0]
    })
    return (
      <View style={styles.iconsCardContainer}>
        {!qrCodeBelongsToUser && (
          <View>
            <Animated.Text
              style={{
                transform: [{ scale }],
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
              <TouchableOpacity onPress={() => handleFavoriteQRCodes(id)}>
                {
                  favorited
                    ? (<FavoriteCardButton style={{
                      shadowOffset: { width: 1, height: 2, },
                      shadowColor: 'rgba(0, 0, 0, 0.25)',
                      shadowOpacity: 1.0,
                    }} />)
                    : (<NotFavoritedCardButton style={{
                      shadowOffset: { width: 1, height: 2, },
                      shadowColor: 'rgba(0, 0, 0, 0.25)',
                      shadowOpacity: 1.0,
                    }} />)
                }
              </TouchableOpacity>
            </Animated.Text>
          </View>
        )}
        <View>
          <TouchableOpacity>
            <Animated.Text
              style={{
                transform: [{ scale }]
              }}>
              <TrashQRCodeIcon style={{
                shadowOffset: { width: 1, height: 2, },
                shadowColor: 'rgba(0, 0, 0, 0.25)',
                shadowOpacity: 1.0,
              }} />
            </Animated.Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <Container>
      <HeaderHistory
        setColorAndDate={({ date, color: filteredColor }) => {
          console.log({ color, date })
          setColor(filteredColor)
          setSelectedDate(date)
        }}
        favorite={favoriteFilter}
        setFavorite={() => handleFavoriteFilter()}
      />
      
      <Content>

        <QRCodeList>
          {qrCodes?.map((qrcode: FilteredQRCodesByDate, idx: number) => {
            const [date] = Object.keys(qrcode)
            if (date !== '0')
              return (
              <>
                <QRCodeTitleContainer>
                  <QRCodeTitleDate>{date}</QRCodeTitleDate>
                  <CloudContainer>
                    <CloudLeftLarge/>
                    <CloudRightSmall/>
                  </CloudContainer>
                </QRCodeTitleContainer>
                
                <ScrollView style={{ height: qrcode[date].length > 1 ? 286 : 170, marginBottom: 12 }}>
                  {qrcode[date].map(
                    ({ id, color, comparisonDate, favorited, qrCodeCreatorName, content }) => (
                      <>
                        <Swipeable
                          key={id}
                          renderRightActions={(progress: any, dragX: any) => RightActions(
                            progress,
                            dragX,
                            id,
                            qrCodeCreatorName === 'Você',
                            favorited
                          )}
                        >
                          <HistoryCards
                            key={id}
                            id={id}
                            creator={qrCodeCreatorName}
                            date={formattedDate(new Date(comparisonDate))}
                            color={color}
                            favorite={favorited}
                            privacy="Público"
                          />
                        </Swipeable>
                      </>
                    ))
                  }
                </ScrollView>
              </>)
            else if (date === '0')
              return (
              <NotFountContainer key={0}>
                <LargeSearchIcon />
                <NoResultsFoundText>Nenhum resultado obtido</NoResultsFoundText>
                <NoResultsFoundDescriptionText>
                  Tente realizar uma filtragem mais
                  específica dos iCods 
                </NoResultsFoundDescriptionText>
              </NotFountContainer>
              )
          })}
        </QRCodeList>

      </Content>

      <LoggedFooter
        isHistory={true}
      />
      </Container>
    </SafeAreaView >
  )
}

export default History;
