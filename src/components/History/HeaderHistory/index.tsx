import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../../hooks/auth';
import { 
  Container, 
  Header, 
  OptionalButtonsContainer, 
  SearchContainer, 
  Title 
} from './styles';
import { BackButton } from '../../BackButton';
import { SearchInput } from '../../SearchInput';
import { useTheme } from 'styled-components';
import { FavoriteButton } from '../../FavoriteButton';
import { FilterButton } from '../../FilterButton';
import { Keyboard, Modal, TouchableWithoutFeedback, View } from 'react-native';
import { FilterModal } from '../FilterModal';
import { Moment } from 'moment';

interface HeaderHistoryProps {
  favorite: boolean;
  qrCodeDetails?: boolean;
  setFavorite: () => void;
  setColorAndDate: ({ date, color }: ColorAndDateProps) => void;
  setSelectedColor: (color: Colors) => void,
  selectedColor: Colors,
  setSelectedDate: (date: Moment | undefined) => void,
  selectedDate: Moment | undefined,
}

interface ColorAndDateProps {
  color: string,
  date: Date | undefined,
}

export function HeaderHistory({ 
  setColorAndDate, 
  setFavorite, 
  favorite, 
  qrCodeDetails,
  setSelectedColor,
  selectedColor,
  setSelectedDate,
  selectedDate
 }: 
  HeaderHistoryProps){
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false)
  const theme = useTheme();
  const [searchEntry, setSearchEntry] = useState('');
  
  function SearchInputSubmitTest() {
    setSearchEntry('Input do Histórico funcionando');
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <BackButton 
            navigationTo={qrCodeDetails ? 'History' : 'Dashboard'}
          />
          <Title>Histórico</Title>
        </Header>

        {!qrCodeDetails && 
        (
          <SearchContainer>
                <SearchInput 
                  autoCorrect
                  autoCapitalize='none'
                  placeholder='Procurar'
                  placeholderTextColor={theme.colors.subtitle}
                  onChangeText={text => setSearchEntry(text)} 
                  onSubmitEditing={() => SearchInputSubmitTest()}
                  submitFunction={() => SearchInputSubmitTest()}
                  value={searchEntry}
                  returnKeyType='send'
                  />

              <OptionalButtonsContainer>
                <FavoriteButton 
                  onPress={() => setFavorite()}
                  favorite={favorite}
                />
                <FilterButton 
                  onPress={() => setModalVisible(!modalVisible)}
                  />
              <Modal
                visible={modalVisible}
                transparent
              >
                <FilterModal
                  visible={modalVisible}
                  setSelectedColor={setSelectedColor}
                  selectedColor={selectedColor}
                  pressedOut={() => setModalVisible(!modalVisible)}
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                  confirmedFilter={async ({ date, color }) => {
                    
                    setModalVisible(false)
                    setColorAndDate({ date, color })
                  }}
                />
              </Modal>
              </OptionalButtonsContainer>
            </SearchContainer >
        )}

      </Container>
      </TouchableWithoutFeedback>
  );
}