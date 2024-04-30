import React from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './types';

type Screen1NavigationProp = StackNavigationProp<RootStackParamList, 'ValidationScreen'>;

type Props = {
  navigation: Screen1NavigationProp;
};

function ValidationScreen ({ navigation }: Props) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Screen Validation</Text>
      <Button
        title="Go Back"
        onPress={() => navigation.navigate('WorkSiteInProgress')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    width: 200,
    height: 200,
  },
});

export default ValidationScreen;
