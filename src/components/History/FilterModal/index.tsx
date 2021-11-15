import React, { useState } from 'react';
import Modal from 'react-native-modal';
import DatePicker from 'react-native-date-picker';
import MonthPicker from 'react-native-month-year-picker';
import { 
  Container, 
  Footer, 
  ModalContainer, 
  ModalConfirmButtonText,
  ModalCancelButtonText,
  BottomButton,
  ColorsButtonList,
  ColorsContainer,
  ColorOrderContainer,
  ColorOrderText,
  Separator,
  ColorButton,
  BlackIcon,
  CyanIcon,
  GreenIcon,
  PinkIcon,
  YellowIcon,
  RedIcon,
  NoColorIcon,
  BlueIcon,
  DataContainer,
  DataText,
  SubmitButton,
  SubmitButtonText,
  CalendarContainer
} from './styles';
import { SvgProps } from 'react-native-svg';

interface ModalInterface {
  visible: boolean,
  pressedOut: () => void,
  confirmedFilter: (data: FilterData) => Promise<void>,
  initialDateValue?: undefined
}

interface FilterData {
  color: string,
  date: Date | undefined
}

export interface colorsIconsProps {
  key: string;
  icon:  React.FC<SvgProps>;
}

export const colorsIconsList = [
  {
    key: 'black',
    icon: BlackIcon,
  },
  
  {
    key: 'blue',
    icon: BlueIcon,
  },

  {
    key: 'cyan',
    icon: CyanIcon,
  },
  {
    key: 'green',
    icon: GreenIcon,
  },

  {
    key: 'pink',
    icon: PinkIcon,
  },

  {
    key: 'red',
    icon: RedIcon,
  },

  {
    key: 'yellow',
    icon: YellowIcon,
  },

  {
    key: 'noFilter',
    icon: NoColorIcon,
  }
]

export function FilterModal(
  { visible, 
    pressedOut, 
    confirmedFilter 
  }: ModalInterface){
  const [selectedColor, setSelectedColor] = useState<Colors>('noFilter')
  const [calendarVisible, setCalendarVisible] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined) 

  function handleOpenCalendar(){
    setCalendarVisible(true)
  }

  function handleCloseCalendar(){
    setCalendarVisible(false)
  }
  return (
    <Container>
      <Modal
        style={{alignSelf: 'center'}}
        animationIn={"fadeIn"}
        animationOut={"fadeOut"}
        isVisible={visible}
        onBackdropPress={pressedOut}
      >
        <ModalContainer>
          <ColorsContainer>
            <ColorOrderContainer>
              <ColorOrderText>Ordenar por cor</ColorOrderText>
            </ColorOrderContainer>
            
              <ColorsButtonList 
                data={colorsIconsList}
                keyExtractor={(item) => item.key}
                renderItem={({item}) => {
                  const {icon: Icon, key} = item;
                  return (
                    <ColorButton
                      onPress={() => setSelectedColor(key as Colors)}
                      selectedColor={selectedColor}
                      color={key as Colors}
                    >
                    <Icon/>
                  </ColorButton>
                    )
                  }
                }
                ItemSeparatorComponent={() => <Separator />}
              />

          </ColorsContainer>

          <DataContainer>
            <DataText>Ordenar por data</DataText>

            <SubmitButton
              onPress={() => {
                setCalendarVisible(!calendarVisible)
              }}
            > 
              <SubmitButtonText>Escolher Data</SubmitButtonText>
            </SubmitButton>
          </DataContainer>

          <Footer>
            <BottomButton 
              onPress={() => {
                handleCloseCalendar()
                pressedOut()
            }}>
              <ModalCancelButtonText>cancelar</ModalCancelButtonText>
            </BottomButton>
            
            <BottomButton
              onPress={() => {
                handleCloseCalendar()
                confirmedFilter({
                  date: selectedDate,
                  color: selectedColor
                })
                setSelectedDate(undefined)
              }}
              >
              <ModalConfirmButtonText>confirmar</ModalConfirmButtonText>
            </BottomButton>
          </Footer>
        </ModalContainer>
              {calendarVisible && (
                <CalendarContainer>
                  <MonthPicker
                    okButton="Filtrar pelo mês"
                    cancelButton="Cancelar"
                    onChange={(event: any, newDate: any) => {
                      setSelectedDate(newDate)
                    }}
                    value={selectedDate ? selectedDate : new Date()}
                    maximumDate={new Date()}
                    locale="pt-BR"
                  />
                </CalendarContainer>
              )}
      </Modal>
    </Container>
  )
}