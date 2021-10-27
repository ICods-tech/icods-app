import React, { useState } from 'react';
import { TextInput, TouchableOpacity, View, Text } from "react-native"
import { useNavigation } from '@react-navigation/native';
import FilterModal from '../FilterModal'
import SearchIcon from '../../../assets/images/Icons/search.svg';
import NotFavoritedIcon from '../../../assets/images/Icons/favorite_search.svg';
import FavoritedIcon from '../../../assets/images/Icons/favorited_search.svg';
import MenuButton from '../../../assets/images/Icons/filter_search.svg';
import styles from './styles';
import { useAuth } from '../../../hooks/auth';
import { 
  Container, 
  Header, 
  OptionalButtonsContainer, 
  SearchContainer, 
  Title 
} from './newStyles';
import { BackButton } from '../../BackButton';
import { SearchInput } from '../../SearchInput';
import { useTheme } from 'styled-components';
import { FavoriteButton } from '../../FavoriteButton';
import { FilterButton } from '../../FilterButton';

interface HeaderHistoryProps {
  favorite: boolean;
  qrCodeDetails?: boolean;
  setFavorite: () => void;
  setColorAndDate: ({ date, color }: ColorAndDateProps) => void;
}

interface ColorAndDateProps {
  color: string,
  date: Date | undefined,
}

const HeaderHistory = ({ 
  setColorAndDate, 
  setFavorite, 
  favorite, 
  qrCodeDetails }: 
  HeaderHistoryProps) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false)
  const theme = useTheme();
  const [searchEntry, setSearchEntry] = useState('');
  
  function SearchInputSubmitTest() {
    setSearchEntry('Sorvetao');
  }
  return (
      <Container>
        <Header>
          <BackButton 
            navigationTo='Dashboard'
          />
          <Title>Histórico</Title>
        </Header>

        {!qrCodeDetails && 
        (
          <>
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

              {/* <View style={styles.optionsButtonsContainer}> */}
              <OptionalButtonsContainer>

                <FavoriteButton />
                {/* <TouchableOpacity
                  onPress={() => setFavorite()}
                  style={styles.optionsButton}
                  >
                  {favorite ? <FavoritedIcon style={styles.iconButton} /> : <NotFavoritedIcon style={styles.iconButton} />}
                </TouchableOpacity> */}
                <FilterButton />
                {/* <TouchableOpacity
                  onPress={() => setModalVisible(!modalVisible)}
                  style={styles.optionsButton}>
                  <MenuButton
                    style={styles.iconButton}
                    />
                  <FilterModal
                    visible={modalVisible}
                    pressedOut={() => setModalVisible(!modalVisible)}
                    confirmedFilter={async ({ date, color }) => {
                      setModalVisible(false)
                      setColorAndDate({ date, color })
                    }}
                    />
                </TouchableOpacity> */}
              {/* </View> */}
              </OptionalButtonsContainer>
            </SearchContainer >
          </>
        )}

      </Container>
  );
}

export default HeaderHistory;