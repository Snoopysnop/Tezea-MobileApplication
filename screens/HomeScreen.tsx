import React from 'react';
import { Button, Text } from 'react-native';
import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import { RouteProp } from '@react-navigation/native';

// Type de navigation pour HomeScreen
//type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

// Type de route pour ProfileScreen
//type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Profile'>;

type Props = {
  navigation: any;
  route: any;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <Button
      title="Go to Jane's profile"
      onPress={() =>
        navigation.navigate('Profile', { name: 'Jane' })
      }
    />
  );
};

const ProfileScreen: React.FC<Props> = ({ navigation, route }) => {
  return <Text>This is {route.params.name}'s profile</Text>;
};

export { HomeScreen, ProfileScreen };
