import React from "react";
import Header from "../../components/Header";
import { Container, Message, Title } from './styes';
import WorkingImage from '../../assets/images/Icons/working.svg'
import LoggedFooter from "../../components/LoggedFooter";

interface IWorkingProps {
    route: {
        params: {
            type?: 'Notification' | 'Social'
        }
    }
}

const Working = ({ route }: IWorkingProps) => {
    const type = route.params === undefined ? null : route.params.type;
    return (
        <>
            <Container>
                <Header page="Manutenção" navigate="back" />
                <Title>Ops! Ainda estamos trabalhando</Title>
                <WorkingImage />
                <Message>Parece que você nos pegou desavisados... Mas espera que logo em breve estaremos terminando essa sessão!</Message>
            </Container>
        </>
    );
};

export default Working;
