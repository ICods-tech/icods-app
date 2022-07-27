import React, {useRef} from 'react';
import {TextInput, TextInputProps} from 'react-native';

import {Container, IconButton, Input, SearchIcon} from './styles';

interface SearchInputProps extends TextInputProps {
  submitFunction: () => void;
}

export function SearchInput({submitFunction, ...rest}: SearchInputProps) {
  const inputRef = useRef<TextInput>(null);

  return (
    <Container>
      <IconButton
        // onPress={() => inputRef.current?.submitForm()}
        onPress={submitFunction}>
        <SearchIcon />
      </IconButton>
      <Input ref={inputRef} {...rest} />
    </Container>
  );
}
