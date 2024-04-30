// Screen2.tsx

import React from 'react';
import { View, Text, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './types';

type Screen2NavigationProp = StackNavigationProp<RootStackParamList, 'WorkSiteInfo'>;

type Props = {
  navigation: Screen2NavigationProp;
};

const Screen2: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Screen 2</Text>
      <Button
        title="Go back"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
};

export default Screen2;
