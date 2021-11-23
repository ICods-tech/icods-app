import React from 'react';
import Modal from 'react-native-modal';
import { 
  Container, 
  Footer, 
  ModalContainer, 
  ModalConfirmButtonText,
  ModalCancelButtonText,
  BottomButton,
  DeleteAccountIconContainer,
  CloseButtonContainer,
  ExcludeAccountTitle,
  ExcludeAccountDescription,
  ExcludeAccountTextContainer,
} from './styles';
import { SvgProps } from 'react-native-svg';
import DeleteAccountIcon from '../../assets/images/Icons/Profile/delete-account-icon.svg'
import CloseModalIcon from '../../assets/images/Icons/Profile/close-modal-icon.svg'

interface ModalInterface {
  visible: boolean,
  pressedOut: () => void,
  confirmedDeletion: () => Promise<void>,
  initialDateValue?: undefined
}

export interface colorsIconsProps {
  key: string;
  icon:  React.FC<SvgProps>;
}

export function DeleteAccountModal({
    visible, 
    pressedOut, 
    confirmedDeletion 
  }: ModalInterface){
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
          <CloseButtonContainer>
            <CloseModalIcon />
          </CloseButtonContainer>
          <DeleteAccountIconContainer>
            <DeleteAccountIcon />
          </DeleteAccountIconContainer>
          <ExcludeAccountTextContainer>
            <ExcludeAccountTitle>
              Você está prestes a excluir a conta
            </ExcludeAccountTitle>
            <ExcludeAccountDescription>
              Ao confirmar, seus dados serão excluidos e será necessário fazer outro cadastro
            </ExcludeAccountDescription>
          </ExcludeAccountTextContainer>
          <Footer>
            <BottomButton 
              onPress={() => {
                pressedOut()
            }}>
              <ModalCancelButtonText>cancelar</ModalCancelButtonText>
            </BottomButton>
            
            <BottomButton
              onPress={() => {
                confirmedDeletion()
              }}
              >
              <ModalConfirmButtonText>confirmar</ModalConfirmButtonText>
            </BottomButton>
          </Footer>
        </ModalContainer>
      </Modal>
    </Container>
  )
}