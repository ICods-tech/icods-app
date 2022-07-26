import React from 'react';
import {ActivityIndicator} from 'react-native';
import {RectButtonProps} from 'react-native-gesture-handler';
import {useTheme} from 'styled-components/native';
import {Button, Text} from './styles';

interface SubmitButtonProps extends RectButtonProps {
  text: string;
  loading?: boolean;
  darkMode?: boolean;
}

export function SubmitButton({
  text,
  loading = false,
  enabled = true,
  darkMode = false,
  ...rest
}: SubmitButtonProps) {
  const theme = useTheme();
  return (
    <Button enabled={enabled} darkMode={darkMode} loading={loading} {...rest}>
      {loading ? (
        <ActivityIndicator color={theme.colors.white} size={24} />
      ) : (
        <Text
          style={{color: darkMode ? theme.colors.primary : theme.colors.white}}>
          {text}
        </Text>
      )}
    </Button>
  );
}
