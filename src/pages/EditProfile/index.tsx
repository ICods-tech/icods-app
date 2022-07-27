import React, {useCallback, useState} from 'react';
import {SafeAreaView, StatusBar, TouchableOpacity} from 'react-native';
import {useTheme} from 'styled-components';
import ButtonOff from '../../assets/images/button-off.svg';
import ButtonOn from '../../assets/images/button-on.svg';
import ChangePasswordIcon from '../../assets/images/Icons/password-icon.svg';
import DeleteAccountIcon from '../../assets/images/Icons/Profile/delete-account-icon.svg';
import {ChangePasswordModal} from '../../components/ChangePasswordModal';
import HeaderProfile from '../../components/HeaderProfile';
import {WarningModal} from '../../components/WarningModal';
import {useAuth, User} from '../../hooks/auth';
import extractNameAndSurname from '../../utils/extractNameAndSurname';
import {
  Container,
  ContainerScroll,
  EditContainer,
  EditText,
  ExcludeAccountText,
  PrivateProfileContainer,
  UserInformationContainer,
  UserInformationLabel,
  UserInformationText,
  UserLabelAndInfoContainer,
} from './styles';

type UserFields = 'id' | 'name' | 'email' | 'username' | 'visibility';

const EditProfile = () => {
  const theme = useTheme();
  const {user, token, alterProfileVisibility, signOut, deleteUser} = useAuth();
  const {name, lastname} = user
    ? extractNameAndSurname(user.name)
    : {name: '', lastname: ''};
  const nameAndLastname = `${name} ${lastname ? lastname : ''}`;
  const [deleteAccountModalOpen, setDeleteAccountModalOpen] = useState(false);
  const [changePasswordModalOpen, setChangePasswordModalOpen] = useState(false);

  const avatar = `https://ui-avatars.com/api/?size=1000&name=${nameAndLastname}&length=2&background=${theme.colors.profilePic}&rounded=true`;
  const handleUserObject = (field: UserFields, user: User | undefined) => {
    if (user === undefined) {
      return 'Placeholder';
    }

    return field !== 'visibility' ? user[field].toString() : user[field];
  };

  const handleProfileVisibility = useCallback(async () => {
    try {
      await alterProfileVisibility(user.id, token);
    } catch (err: any) {
      console.error(err.message);
    }
  }, [user, token, alterProfileVisibility]);

  function handleOpenDeleteAccountModal() {
    setDeleteAccountModalOpen(true);
  }
  function handleOpenChangePasswordModal() {
    setChangePasswordModalOpen(true);
  }
  function handleCloseChangePasswordModal() {
    setChangePasswordModalOpen(false);
  }
  function handleCloseDeleteAccountModal() {
    setDeleteAccountModalOpen(false);
  }

  return (
    <Container>
      <SafeAreaView style={{backgroundColor: '#2b90d9'}} />
      <StatusBar backgroundColor="#3097db" barStyle="light-content" />
      <HeaderProfile
        fullName={String(handleUserObject('name', user))}
        edit
        avatar={avatar}
      />
      <ContainerScroll>
        <EditContainer>
          <EditText>Edite seus dados</EditText>
        </EditContainer>
        <WarningModal
          title={'Você está prestes a excluir a conta'}
          description={
            'Ao confirmar, seus dados serão excluidos e será necessário fazer outro cadastro'
          }
          visible={deleteAccountModalOpen}
          icon={DeleteAccountIcon}
          iconBackgroundColor={theme.colors.attention}
          isFooterButtonsActived
          onCloseModal={handleCloseDeleteAccountModal}
          handleAsyncConfirmed={async () => {
            handleCloseDeleteAccountModal();
            await signOut();
            await deleteUser(token);
          }}
        />
        <ChangePasswordModal
          title={'Para trocar a senha, complete os dados a seguir:'}
          visible={changePasswordModalOpen}
          icon={ChangePasswordIcon}
          confirmText={'Alterar senha'}
          iconBackgroundColor={theme.colors.primary}
          isFooterButtonsActived
          onCloseModal={handleCloseChangePasswordModal}
        />
        <UserInformationContainer>
          <UserLabelAndInfoContainer>
            <UserInformationLabel>Username</UserInformationLabel>
            <UserInformationText>
              {handleUserObject('username', user)}
            </UserInformationText>
          </UserLabelAndInfoContainer>
          <UserLabelAndInfoContainer>
            <UserInformationLabel>Email</UserInformationLabel>
            <UserInformationText>
              {handleUserObject('email', user)}
            </UserInformationText>
          </UserLabelAndInfoContainer>
          <PrivateProfileContainer>
            <UserInformationLabel>Perfil privado</UserInformationLabel>
            {!handleUserObject('visibility', user) ? (
              <TouchableOpacity
                onPress={async () => await handleProfileVisibility()}>
                <ButtonOn />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={async () => await handleProfileVisibility()}>
                <ButtonOff />
              </TouchableOpacity>
            )}
          </PrivateProfileContainer>
          <UserLabelAndInfoContainer>
            <TouchableOpacity onPress={handleOpenChangePasswordModal}>
              <UserInformationText>Alterar senha</UserInformationText>
            </TouchableOpacity>
          </UserLabelAndInfoContainer>
          <UserLabelAndInfoContainer>
            <TouchableOpacity onPress={handleOpenDeleteAccountModal}>
              <ExcludeAccountText>Excluir conta</ExcludeAccountText>
            </TouchableOpacity>
          </UserLabelAndInfoContainer>
          <UserLabelAndInfoContainer>
            <TouchableOpacity
              onPress={async () => {
                await signOut();
              }}>
              <UserInformationText>Sair</UserInformationText>
            </TouchableOpacity>
          </UserLabelAndInfoContainer>
        </UserInformationContainer>
      </ContainerScroll>
    </Container>
  );
};

export default EditProfile;
