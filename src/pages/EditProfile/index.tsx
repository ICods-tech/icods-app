import React, { useCallback, useState } from 'react';
import {  StatusBar, SafeAreaView, TouchableOpacity } from 'react-native';
import { Container, ExcludeAccountText, PrivateProfileContainer, UserInformationContainer, UserInformationLabel, UserInformationText, UserLabelAndInfoContainer } from './styles';
import HeaderProfile from '../../components/HeaderProfile'
import ButtonOn from '../../assets/images/button-on.svg'
import ButtonOff from '../../assets/images/button-off.svg'
import { useAuth, User } from '../../hooks/auth'
import { DeleteAccountModal } from '../../components/DeleteAccountModal';

interface EditProfileProps { 
  route: {
    params: {
      following: number,
      follower: number
    }
  }
}

type UserFields = 'id'|'name'|'email'|'username'|'visibility'

const EditProfile = ({ route }: EditProfileProps) => {
  const { user, token, alterProfileVisibility, signOut, deleteUser } = useAuth()
  const [deleteAccountModalOpen, setDeleteAccountModalOpen] = useState(false)
  const { following, follower } = route.params

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
        backgroundColor="#2c92da"
        barStyle="light-content"
      />
      <HeaderProfile
        fullName={String(handleUserObject('name', user))}
        following={following}
        follower={follower}
        edit
      />
      <DeleteAccountModal
        visible={deleteAccountModalOpen}
        pressedOut={() => setDeleteAccountModalOpen(!deleteAccountModalOpen)}
        confirmedDeletion={async () => {
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
          <TouchableOpacity onPress={async () => await signOut()}>
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