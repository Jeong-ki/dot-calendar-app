import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export const Modal = () => {
  // TODO: 모달 컴포넌트 수정 필요
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isOpen, setIsOpen] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const handleOutsidePress = () => {
    if (isKeyboardVisible) {
      Keyboard.dismiss();
    } else {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <Pressable onPress={handleOutsidePress} style={styles.modal}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}>
        <View style={styles.modalInner}>
          <View style={styles.modalTitle}>
            <Text>모달 제목</Text>
            <Text>닫기(아이콘)</Text>
          </View>
          <View style={styles.innerContent} />
        </View>
      </KeyboardAvoidingView>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  innerContent: {
    backgroundColor: 'pink',
    flex: 1,
  },
  keyboardAvoidingView: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginTop: 15,
  },
  modal: {
    backgroundColor: 'rgba(52, 52, 52, 0.4)',
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalInner: {
    backgroundColor: 'orange',
    borderRadius: 20,
    height: 350,
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: Dimensions.get('window').width - 50,
  },
  modalTitle: {
    alignItems: 'center',
  },
});
