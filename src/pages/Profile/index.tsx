import React, { useEffect, useState } from 'react';
import { StatusBar, SafeAreaView } from 'react-native';
import HeaderProfile from '../../components/HeaderProfile'
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import { 
  ActivitiesContainer, 
  ActivitiesText, 
  Container
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
  const { user, token } = useAuth()

  const [following, setFollowing] = useState<IFollowingUsers>({ followingCount: 0, followingUsers: [] })
  const [followers, setFollowers] = useState<IFollowerUsers>({ followersCount: 0, followerUsers: [] })

  useEffect(() => {
    async function loadFollowing(): Promise<void> {
      console.log(token)
      await api.get('follow', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((response: any) => {
        console.log(response)
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
      <SafeAreaView style={{ backgroundColor: '#2b90d9' }} />
      <StatusBar
        backgroundColor="#2c92da"
        barStyle="light-content"
      />
      <HeaderProfile
        fullName={user.name}
        following={following.followingCount}
        follower={followers.followersCount}
        edit={false}
      />
      <ActivitiesContainer>
        <ActivitiesText>Atividades</ActivitiesText>
      </ActivitiesContainer>
    </Container>
  )
}

export default Profile;