import React from "react";
import WorkingImage from '../../assets/images/Icons/working.svg';
import Header from "../../components/Header";
import { Container, ContainerMessage, ContainerTitle, Message, Title } from './styes';

const Working = () => {
    return (
        <Container>
            <Header title="Manutenção" navigate="back" />
            <ContainerTitle>
                <Title>Ops! Ainda{`\n`}estamos{`\n`}trabalhando</Title>
            </ContainerTitle>
            <WorkingImage />
            <ContainerMessage>
                <Message>Parece que você nos pegou desavisados... Mas espera que logo em breve estaremos terminando essa sessão!</Message>
            </ContainerMessage>
        </Container>
    );
};

export default Working;
