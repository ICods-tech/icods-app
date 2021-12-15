import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    background-color: #fff;
    align-items: center;
    justify-content: center;
`;

export const Title = styled.Text`
    font-size: 28px;
    line-height: 38px;
    text-align: center;
    font-weight: bold;
    margin: 24px 0 20px;

    color: rgba(0, 0, 0, 0.87);
`;

export const Message = styled.Text`
    width: 80%;
    font-size: 16px;
    line-height: 22px;
    text-align: center;

    color: rgba(0, 0, 0, 0.4);
    opacity: 0.57;
`;

export const Button = styled.TouchableOpacity`
    margin-top: 26px;
    width: 80%;
    padding: 6px 16px;
    display: flex;
    align-items: center;

    background: #2B90D9;
    border-radius: 116px;

    shadow-color: #000;
    shadow-offset: 0px 2px;
    shadow-opacity: 0.2;
    shadow-radius: 4px;
    elevation: 8;
`;

export const ButtonText = styled.Text`
    color: #fff;
    font-size: 14px;
    font-weight: bold;
    line-height: 24px;
`;
