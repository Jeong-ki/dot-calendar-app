import React, { PropsWithChildren } from 'react';
import { Text, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import type { IButtonProps } from './types';

const Button = ({
  children,
  onClick,
  disabled = false,
  isLoading = false,
  width = 100,
  text,
}: PropsWithChildren<IButtonProps>) => {
  return (
    <Pressable
      onPress={onClick}
      disabled={disabled || isLoading}
      style={[styles.button, { width }, disabled && styles.disabled]}>
      {isLoading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <>
          {text && <Text style={styles.buttonText}>{text}</Text>}
          {children && children}
        </>
      )}
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#42a5f5',
    borderRadius: 5,
    height: 40,
    justifyContent: 'center',
    marginBottom: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    // width: 90,
  },
  buttonText: { color: '#fff', fontSize: 16 },
  disabled: { backgroundColor: 'gray' },
});
