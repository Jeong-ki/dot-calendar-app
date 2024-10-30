import { Platform } from 'react-native';
import Config from 'react-native-config';
import EncryptedStorage from 'react-native-encrypted-storage';

const { IOS_BASE_URL, ANDROID_BASE_URL, API_PREFIX_01 } = Config;

const localBaseURL = Platform.select({
  ios: IOS_BASE_URL,
  android: ANDROID_BASE_URL,
});

export const BASE_URL = `${localBaseURL}${API_PREFIX_01}`;

export const setRefreshToken = async (refreshToken: string): Promise<void> => {
  try {
    await EncryptedStorage.setItem('refreshToken', refreshToken);
  } catch (error) {
    console.error('Error saving the user info', error);
  }
};

export const getRefreshToken = async (): Promise<string | null> => {
  try {
    const refreshToken = await EncryptedStorage.getItem('refreshToken');
    return refreshToken;
  } catch (error) {
    console.error('Error loading the tokens', error);
    return null;
  }
};

export async function removeRefreshToken() {
  await EncryptedStorage.removeItem('refreshToken');
}
