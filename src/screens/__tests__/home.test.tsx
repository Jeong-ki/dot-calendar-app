import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { RouteNames } from '@/navigation/route-names';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '@/navigation/types';
import { RouteProp } from '@react-navigation/native';
import HomeScreen from '../home';

type NavigationProp = NativeStackNavigationProp<StackParamList, RouteNames.home>;
type RoutePropType = RouteProp<StackParamList, RouteNames.home>;

const mockNavigate = jest.fn();

// navigation과 route를 모킹
const mockNavigation: Partial<NavigationProp> = {
  navigate: mockNavigate,
};

const mockRoute: RoutePropType = {
  key: 'home-key',
  name: RouteNames.home,
  params: undefined, // 필요한 경우 route params 추가
};

const component = <HomeScreen navigation={mockNavigation as NavigationProp} route={mockRoute} />;

describe('HomeScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    const rendered = render(component);
    expect(rendered).toMatchSnapshot();
    expect(rendered).toBeTruthy();
  });

  it('should update testValue when "First" button is clicked', () => {
    const { getByText } = render(component);

    fireEvent.press(getByText('First'));
    expect(getByText('First Value')).toBeTruthy();
  });

  it('should update testValue when "Second" button is clicked', () => {
    const { getByText } = render(component);

    fireEvent.press(getByText('Second'));
    expect(getByText('Second Value')).toBeTruthy();
  });

  it('should navigate to user screen when "Go User" button is clicked', () => {
    const { getByText } = render(component);

    for (let i = 0; i < 3; i++) {
      fireEvent.press(getByText('Go User'));
    }
    
    expect(mockNavigate).toHaveBeenCalledTimes(3);
    expect(mockNavigate).toHaveBeenCalledWith(RouteNames.user);
  });
});
