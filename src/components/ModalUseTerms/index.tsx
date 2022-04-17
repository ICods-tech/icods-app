import React from 'react';
import {Linking} from 'react-native';
import {
  ScreenContainer,
  ModalContainer,
  SubContainer,
  Title,
  TextContainer,
  ButtonsContainer,
  TextContainerTitle,
  TextContainerText,
  BottomButton,
  ButtonLabelConfirm,
  ButtonLabelCancel,
} from './styles';

interface ModalUseTermsProps {
  handleUseTermsModalConfirmed: () => void;
  handleUseTermsModalCancel: () => void;
  visible: boolean;
}

const ModalUseTerms = ({
  handleUseTermsModalConfirmed,
  handleUseTermsModalCancel,
  visible,
}: ModalUseTermsProps) => {
  return (
    <ModalContainer animationType="slide" transparent={true} visible={visible}>
      <ScreenContainer>
        <SubContainer>
          <Title>Termos e Condições</Title>
          <TextContainer>
            <TextContainerText>
              Ao baixar ou usar o aplicativo, estes termos se aplicarão
              automaticamente a você - certifique-se de lê-los com atenção antes
              de usar o aplicativo. Você não tem permissão para copiar ou
              modificar o aplicativo, qualquer parte do aplicativo ou nossas
              marcas registradas de forma alguma. Você não tem permissão para
              tentar extrair o código-fonte do aplicativo e também não deve
              tentar traduzir o aplicativo para outros idiomas ou fazer versões
              derivadas. O aplicativo em si e todas as marcas comerciais,
              direitos autorais, direitos de banco de dados e outros direitos de
              propriedade intelectual relacionados a ele ainda pertencem à
              iCods.
            </TextContainerText>
            <TextContainerText />

            <TextContainerText>
              O iCods tem o compromisso de garantir que o aplicativo seja o mais
              útil e eficiente possível. Por esse motivo, nos reservamos o
              direito de fazer alterações no aplicativo ou cobrar por seus
              serviços, a qualquer momento e por qualquer motivo. Nunca
              cobraremos pelo aplicativo ou seus serviços sem deixar bem claro
              para você exatamente o que você está pagando.
            </TextContainerText>
            <TextContainerText />

            <TextContainerText>
              O aplicativo iCods armazena e processa dados pessoais que você nos
              forneceu, a fim de fornecer o nosso Serviço. É sua
              responsabilidade manter o seu telefone e o acesso ao aplicativo
              seguros. Portanto, recomendamos que você não faça jailbreak ou
              root em seu telefone, que é o processo de remoção de restrições e
              limitações de software impostas pelo sistema operacional oficial
              de seu dispositivo. Isso pode tornar o seu telefone vulnerável a
              malware / vírus / programas maliciosos, comprometer os recursos de
              segurança do seu telefone e pode significar que o aplicativo iCods
              não funcionará corretamente ou de todo.
            </TextContainerText>
            <TextContainerText />

            <TextContainerText>
              O aplicativo usa serviços de terceiros que declaram seus próprios
              Termos e Condições.
            </TextContainerText>
            <TextContainerText />

            <TextContainerText>
              Link para os Termos e Condições de provedores de serviços
              terceirizados usados ​​pelo aplicativo
            </TextContainerText>
            <TextContainerText />

            <TextContainerText
              onPress={() =>
                Linking.openURL(
                  'https://play.google.com/about/play-terms/index.html',
                )
              }>
              {`\u2022 Google Play Services`}
            </TextContainerText>

            <TextContainerText
              onPress={() => Linking.openURL('https://www.facebook.com/terms')}>
              {`\u2022 Facebook`}
            </TextContainerText>
            <TextContainerText />

            <TextContainerText>
              Você deve estar ciente de que existem certas coisas pelas quais os
              iCods não se responsabilizam. Certas funções do aplicativo
              exigirão que ele tenha uma conexão ativa com a Internet. A conexão
              pode ser Wi-Fi ou fornecida por seu provedor de rede móvel, mas os
              iCods não podem se responsabilizar pelo aplicativo não funcionar
              em todas as funções se você não tiver acesso a Wi-Fi e não tiver
              nenhum de seus subsídio de dados restante.
            </TextContainerText>
            <TextContainerText />

            <TextContainerText>
              Se você estiver usando o aplicativo fora de uma área com Wi-Fi,
              lembre-se de que os termos do contrato com o provedor de rede
              móvel ainda se aplicam. Como resultado, você pode ser cobrado por
              sua operadora de celular pelo custo dos dados durante a conexão ao
              acessar o aplicativo ou outras cobranças de terceiros. Ao usar o
              aplicativo, você aceita a responsabilidade por quaisquer
              cobranças, incluindo taxas de roaming de dados, se usar o
              aplicativo fora de seu território (ou seja, região ou país) sem
              desligar o roaming de dados. Se você não é o pagador de contas do
              dispositivo no qual está usando o aplicativo, esteja ciente de que
              presumimos que você recebeu permissão do pagador de contas para
              usar o aplicativo.
            </TextContainerText>
            <TextContainerText />

            <TextContainerText>
              Na mesma linha, os iCods nem sempre podem assumir a
              responsabilidade pela maneira como você usa o aplicativo, ou seja,
              você precisa se certificar de que seu dispositivo permaneça
              carregado - se ficar sem bateria e você não puder ligá-lo para
              aproveitar o serviço, os iCods não podem aceitar a
              responsabilidade.
            </TextContainerText>
            <TextContainerText />

            <TextContainerText>
              Com relação à responsabilidade do iCods pelo uso do aplicativo,
              quando você estiver usando o aplicativo, é importante ter em mente
              que embora nos esforcemos para garantir que ele esteja atualizado
              e correto em todos os momentos, contamos com terceiros para
              fornecer informações para que possamos disponibilizá-las para
              você. iCods não se responsabiliza por qualquer perda, direta ou
              indireta, que você experimente como resultado de confiar
              totalmente nesta funcionalidade do aplicativo.
            </TextContainerText>
            <TextContainerText />

            <TextContainerText>
              Em algum momento, podemos desejar atualizar o aplicativo. O
              aplicativo está disponível atualmente para Android e iOS - os
              requisitos para ambos os sistemas (e para quaisquer sistemas
              adicionais aos quais decidirmos estender a disponibilidade do
              aplicativo) podem mudar e você precisará baixar as atualizações se
              quiser continuar usando a aplicação. iCods não promete que sempre
              atualizará o aplicativo para que seja relevante para você e / ou
              funcione com a versão Android e iOS que você instalou em seu
              dispositivo. No entanto, você promete sempre aceitar as
              atualizações do aplicativo quando oferecidas a você. Também
              podemos desejar interromper o fornecimento do aplicativo e
              encerrar o uso dele a qualquer momento, sem aviso prévio de
              encerramento. A menos que informemos o contrário, em caso de
              rescisão, (a) os direitos e licenças concedidos a você nestes
              termos serão encerrados; (b) você deve parar de usar o aplicativo
              e (se necessário) excluí-lo de seu dispositivo.
            </TextContainerText>
            <TextContainerText />

            <TextContainerTitle>
              Mudanças nestes Termos e Condições
            </TextContainerTitle>
            <TextContainerText />

            <TextContainerText>
              Podemos atualizar nossos Termos e Condições de tempos em tempos.
              Portanto, recomendamos que você reveja esta página periodicamente
              para verificar quaisquer alterações. Iremos notificá-lo de
              quaisquer alterações, publicando os novos Termos e Condições nesta
              página.
            </TextContainerText>
            <TextContainerText />

            <TextContainerText>
              Estes termos e condições são válidos a partir de 2021-11-15
            </TextContainerText>
            <TextContainerText />

            <TextContainerTitle>Entre em contato conosco</TextContainerTitle>
            <TextContainerText />

            <TextContainerText>
              Se você tiver alguma dúvida ou sugestão sobre nossos Termos e
              Condições, não hesite em nos contatar em icods.tech@gmail.com
            </TextContainerText>
            <TextContainerText />
          </TextContainer>

          <ButtonsContainer>
            <BottomButton onPress={handleUseTermsModalCancel}>
              <ButtonLabelCancel>CANCELAR</ButtonLabelCancel>
            </BottomButton>

            <BottomButton onPress={handleUseTermsModalConfirmed}>
              <ButtonLabelConfirm>CONFIRMAR</ButtonLabelConfirm>
            </BottomButton>
          </ButtonsContainer>
        </SubContainer>
      </ScreenContainer>
    </ModalContainer>
  );
};

export default ModalUseTerms;
