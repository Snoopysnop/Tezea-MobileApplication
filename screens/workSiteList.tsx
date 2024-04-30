import React from 'react';
import { View, Text, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './types';

type Screen1NavigationProp = StackNavigationProp<RootStackParamList, 'WorkSiteList'>;

type Props = {
  navigation: Screen1NavigationProp;
};

// Corrected the props definition and parameter
function WorkSiteList ({ navigation }: Props) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Screen WorkSiteList</Text>
      <Button
        title="Go to Screen 2"
        onPress={() => navigation.navigate('WorkSiteInfo')}
      />
    </View>
  );
};

export default WorkSiteList;
