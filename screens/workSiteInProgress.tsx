import React from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './types';

type Screen1NavigationProp = StackNavigationProp<RootStackParamList, 'WorkSiteInProgress'>;

type Props = {
  navigation: Screen1NavigationProp;
};

function WorkSiteInProgress ({ navigation }: Props) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Screen WorkInProgress</Text>
      <Button
        title="Go to Screen Validation"
        onPress={() => navigation.navigate('ValidationScreen')}
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

export default WorkSiteInProgress;
