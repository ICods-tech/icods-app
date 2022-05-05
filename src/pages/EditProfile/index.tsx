import React, { useCallback, useState } from 'react';
import { StatusBar, SafeAreaView, TouchableOpacity } from 'react-native';
import { Container, ExcludeAccountText, PrivateProfileContainer, UserInformationContainer, UserInformationLabel, UserInformationText, UserLabelAndInfoContainer } from './styles';
import HeaderProfile from '../../components/HeaderProfile'
import ButtonOn from '../../assets/images/button-on.svg'
import ButtonOff from '../../assets/images/button-off.svg'
import DeleteAccountIcon from '../../assets/images/Icons/Profile/delete-account-icon.svg'
import { useAuth, User } from '../../hooks/auth'
import { WarningModal } from '../../components/WarningModal';
import theme from '../../global/styles/theme';
import extractNameAndSurname from '../../utils/extractNameAndSurname';
import { useTheme } from 'styled-components';


interface EditProfileProps {
  route: {
    params: {
      following: number,
      follower: number
    }
  }
}

type UserFields = 'id' | 'name' | 'email' | 'username' | 'visibility'

const EditProfile = ({ route }: EditProfileProps) => {
  const theme = useTheme();
  const { user, token, alterProfileVisibility, signOut, deleteUser } = useAuth()
  const [deleteAccountModalOpen, setDeleteAccountModalOpen] = useState(false)
  const { following, follower } = route.params;
  const { name, lastname } = user ? extractNameAndSurname(user.name) : { name: '', lastname: '' }
  const nameAndLastname = `${name} ${lastname ? lastname : ''}`;

  const avatar = `https://ui-avatars.com/api/?size=1000&name=${nameAndLastname}&length=2&background=${theme.colors.profilePic}&rounded=true`;
  const handleUserObject = (field: UserFields, user: User | undefined) => {
    if (user === undefined) {
      return 'Placeholder'
    }

    return field !== 'visibility'
      ? user[field].toString()
      : user[field]
  }

  const handleProfileVisibility = useCallback(async () => {
    try {
      await alterProfileVisibility(user.id, token)
    } catch (err: any) {
      console.error(err.message)
    }
  }, [user, token, alterProfileVisibility])

  return (
    <Container>
      <SafeAreaView style={{ backgroundColor: '#2b90d9' }} />
      <StatusBar
        backgroundColor="#3097db"
        barStyle="light-content"
      />
      <HeaderProfile
        fullName={String(handleUserObject('name', user))}
        following={following}
        follower={follower}
        edit
        avatar={avatar}
      />
      <WarningModal
        title={'Você está prestes a excluir a conta'}
        description={'Ao confirmar, seus dados serão excluidos e será necessário \n fazer outro cadastro'}
        icon={DeleteAccountIcon}
        isFooterButtonsActived
        iconBackgroundColor={theme.colors.attention}
        visible={deleteAccountModalOpen}
        pressedOut={() => setDeleteAccountModalOpen(!deleteAccountModalOpen)}
        handleSaveUpdatesconfirmed={async () => {
          setDeleteAccountModalOpen(false)
          await signOut()
          await deleteUser(token)
        }}
      />
      <UserInformationContainer>
        <UserLabelAndInfoContainer>
          <UserInformationLabel>Username</UserInformationLabel>
          <UserInformationText>{handleUserObject('username', user)}</UserInformationText>
        </UserLabelAndInfoContainer>
        <UserLabelAndInfoContainer>
          <UserInformationLabel>Email</UserInformationLabel>
          <UserInformationText>{handleUserObject('email', user)}</UserInformationText>
        </UserLabelAndInfoContainer>
        <PrivateProfileContainer>
          <UserInformationLabel>Perfil privado</UserInformationLabel>
          {
            !handleUserObject('visibility', user)
              ? <TouchableOpacity onPress={async () => await handleProfileVisibility()}>
                <ButtonOn />
              </TouchableOpacity>
              : <TouchableOpacity onPress={async () => await handleProfileVisibility()}>
                <ButtonOff />
              </TouchableOpacity>
          }
        </PrivateProfileContainer>
        <UserLabelAndInfoContainer>
          <UserInformationText>Alterar senha</UserInformationText>
        </UserLabelAndInfoContainer>
        <UserLabelAndInfoContainer>
          <TouchableOpacity onPress={() => setDeleteAccountModalOpen(true)}>
            <ExcludeAccountText>Excluir conta</ExcludeAccountText>
          </TouchableOpacity>
        </UserLabelAndInfoContainer>
        <UserLabelAndInfoContainer>
          <TouchableOpacity onPress={async () => {
            await signOut()
          }}>
            <UserInformationText>
              Sair
            </UserInformationText>
          </TouchableOpacity>
        </UserLabelAndInfoContainer>
      </UserInformationContainer>
    </Container>
  )
}

export default EditProfile;