import styled from 'styled-components/native';

export const Container = styled.View`
    display: flex;
    align-items: center;
`;

export const Title = styled.Text`
    width: 90%;
    font-weight: 800;
    font-size: 30px;
    line-height: 36px;
    margin: 3% 15px 42px 15px;
    padding-right: 15%;
    font-family: Manrope;
    color: #282C37;
    text-align: left;
`;

export const Message = styled.Text`
    width: 80%;
    margin: 10% 15px;
    font-weight: 600;
    font-size: 16px;
    font-family: Manrope;
    line-height: 24px;
    color: rgba(0, 0, 0, 0.4);
    opacity: 0.57;
    text-align: center;
`;