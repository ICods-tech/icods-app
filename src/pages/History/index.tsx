import React, { useCallback, useEffect, useState } from 'react';
import api from '../../services/api';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { SafeAreaView, Animated } from 'react-native';
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
  NotFountContainer, 
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

const History = () => {
  const [qrCodes, setQRCodes] = useState<FilteredQRCodesByDate[]>(filteredQRCodesByDatePlaceholder)
  const [color, setColor] = useState<string>('noFilter')
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [favoriteFilter, setFavoriteFilter] = useState<boolean>(false)
  // console.log('lista', qrCodes);
  function handleFavoriteFilter() {
    setFavoriteFilter(!favoriteFilter);
  }

  const loadQRCodes = useCallback(async () => {
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
      inputRange: qrCodeBelongsToUser ? [-RFValue(120), 0] : [-RFValue(90), 0],
      outputRange: qrCodeBelongsToUser ? [2, 0] : [0.8, 0]
    })
    return (
      <QRCodeOptionsContainer>
        {!qrCodeBelongsToUser && (
          <>
            <Animated.Text
              style={{
                transform: [{ scale }],
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
              <FavoritedButton 
                onPress={() => handleFavoriteQRCodes(id)}
                activeOpacity={0.8}
                >
                {
                  favorited
                    ? (<FavoriteCardButtonIcon  />)
                    : (<NotFavoritedCardButtonIcon />)
                }
              </FavoritedButton>
            </Animated.Text>
          </>
        )}
          <DeleteButton>
            <Animated.Text
              style={{
                transform: [{ scale }]
              }}>
              <DeleteButtonIcon />
            </Animated.Text>
          </DeleteButton>
      </QRCodeOptionsContainer>
    )
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <Container>
      <HeaderHistory
        setColorAndDate={({ date, color: filteredColor }) => {
          setColor(filteredColor)
          setSelectedDate(date)
        }}
        favorite={favoriteFilter}
        setFavorite={() => handleFavoriteFilter()}
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
                              link={link}
                              favorite={favorited}
                              privacy="Público"
                            />
                          </Swipeable>
                        </>
                      )
                    }    
                  }                  
                  />
                </>
              )} else{
                  return (
                    <NotFountContainer>
                      <LargeSearchIcon />
                      <NoResultsFoundText>Nenhum resultado obtido</NoResultsFoundText>
                      <NoResultsFoundDescriptionText>
                        Tente realizar uma filtragem mais
                        específica dos iCods 
                      </NoResultsFoundDescriptionText>
                    </NotFountContainer>
                  )
              };
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
