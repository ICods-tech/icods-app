import styles, { Header, Title } from './styles'
import email from 'react-native-email'
import { useNavigation } from '@react-navigation/native'
import React, { useState,  useCallback } from 'react'
import { View, Text, StatusBar, SafeAreaView, TouchableWithoutFeedback, TouchableOpacity, TextInput, NativeSyntheticEvent, TextInputChangeEventData, Platform } from 'react-native'
import { SubmitButton } from '../../components/Authentication/SubmitButton'
import Toast from 'react-native-toast-message'
import { BackButton } from '../../components/BackButton'

const Support = () => {
  const [supportMessage, setSupportMessage] = useState<string>('')

  const handleEmail = useCallback(() => {
    if (Platform.OS !== 'ios') {
      const emailTo = 'icods.tech@gmail.com'
      email(emailTo, {
          subject: 'Mensagem de suporte de usuário iCods',
          body: supportMessage
      }).catch(console.error)
    }
    Toast.show({
      type: 'success',
      position: 'bottom',
      text1: 'Mensagem enviada com sucesso',
      visibilityTime: 1200,
      bottomOffset: 100,
    })
  }, [supportMessage])
  
  return (
    <SafeAreaView>
      <StatusBar
        backgroundColor="#2b90d9"
        barStyle="dark-content"
      />
      <View style={styles.container}>
        <Header>
          <BackButton navigationTo='Dashboard'/>
          <Title>Suporte</Title>          
        </Header>
        <View style={styles.helpTextContainer}>
          <Text style={styles.helpText}>Escreva sobre o problema ocorrido para que
          possamos ajuda-lo:</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.helpInput}
            placeholder='Mensagem'
            multiline
            value={supportMessage}
            placeholderTextColor='rgba(40, 44, 55, 0.6)'
            onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => setSupportMessage(e.nativeEvent.text)}
          />
        </View>
        <View style={styles.buttonContainer}>
          <SubmitButton
            onPress={() => handleEmail()}
            text={'Enviar'}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Support;