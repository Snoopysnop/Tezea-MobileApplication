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
      <Text>Screen WorkSiteInfo</Text>
      <Button
        title="Go screen 3"
        onPress={() => navigation.navigate('WorkSiteInProgress')}
      />
    </View>
  );
};

export default Screen2;
