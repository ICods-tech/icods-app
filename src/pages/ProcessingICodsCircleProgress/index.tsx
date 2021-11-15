import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import { Container, PercentageText, ProcessingText, WaitText } from './styles';

const ProcessingICodsCircleProgress = () => {
  const [ticking, setTicking] = useState(true),
        [count, setCount] = useState(0)
   
  useEffect(() => {
    if (count <= 99) {
      const timer = setTimeout(() => ticking && setCount(count+1), 1e3)
    } 
    return () => clearTimeout(count)
   })
  
  return (
    <Container>
     <AnimatedCircularProgress
        size={100}
        width={6}
        fill={count}
        rotation={0}
        tintColor="#2B90D9"
        backgroundColor="#E4E4E4">
        {
          (fill) => (
            <PercentageText>
              { `${count}%` }
            </PercentageText>
          )
        }
      </AnimatedCircularProgress>
      <WaitText>
        Aguarde um momento
      </WaitText>
      <ProcessingText>
        Estamos processando seu iCod e {'\n'}
      garantimos que será rapido! Assim que{'\n'}
      concluído, você ja pode presenteá-lo!
      </ProcessingText>
    </Container>
  )
}

export default ProcessingICodsCircleProgress;