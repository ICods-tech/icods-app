import React, { useEffect, useState } from 'react';
import { useTheme } from 'styled-components';
// import HeaderProfile from '../../components/HeaderProfile';
import { SubmitButton } from '../../components/SubmitButton';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import extractNameAndSurname from '../../utils/extractNameAndSurname';
import {
  ActivitiesContainer,
  ActivitiesText,
  Container,
  Gradient
} from './styles';

interface IFollowUsers {
  id: string;
  name: string;
  email: string;
  visibility: boolean;
}

interface IFollowingUsers {
  followingUsers: IFollowUsers[] | []
  followingCount: number
}

interface IFollowerUsers {
  followerUsers: IFollowUsers[] | []
  followersCount: number
}

const Profile = () => {
  const theme = useTheme();
  const { user, token } = useAuth()
  const { name, lastname } = user ? extractNameAndSurname(user.name) : { name: '', lastname: '' }
  const nameAndLastname = `${name} ${lastname ? lastname : ''}`;

  const avatar = `https://ui-avatars.com/api/?size=1000&name=${nameAndLastname}&length=2&background=${theme.colors.profilePic}&rounded=true`;

  const [following, setFollowing] = useState<IFollowingUsers>({ followingCount: 0, followingUsers: [] })
  const [followers, setFollowers] = useState<IFollowerUsers>({ followersCount: 0, followerUsers: [] })

  useEffect(() => {
    async function loadFollowing(): Promise<void> {
      await api.get('follow', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response: any) => {
        setFollowing(response.data)
      })
    }

    async function loadFollowers(): Promise<void> {
      await api.get('followers', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response: any) => {
        setFollowers(response.data)
      })
    }

    loadFollowing()
    loadFollowers()
  }, [token])

  return (
    <Container>
      {/* <SafeAreaView style={{ backgroundColor: '#2b90d9' }} /> */}
      <Gradient>
        <SubmitButton
          text='Editar conta'

        />
      </Gradient>
      {/* 
      <HeaderProfile
        fullName={user.name}
        following={following.followingCount}
        follower={followers.followersCount}
        edit={false}
        avatar={avatar}
      /> */}

      <ActivitiesContainer>
        <ActivitiesText>Atividades</ActivitiesText>
      </ActivitiesContainer>
    </Container>
  )
}

export default Profile;