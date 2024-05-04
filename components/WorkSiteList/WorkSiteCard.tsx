import React from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../screens/types';
import { categorieIcons, stateIcons } from '../IconList';

type Screen1NavigationProp = StackNavigationProp<RootStackParamList, 'WorkSiteList'>;

type Props = {
  navigation: Screen1NavigationProp;
};

// Corrected the props definition and parameter
function WorkSiteCard({ navigation }: Props) {
  return (
    <TouchableOpacity
      style={{ flexDirection: 'row', backgroundColor: '#fff', marginBottom: 2, height: 80, borderRadius: 5 }}
      onPress={() => navigation.navigate('WorkSiteInfo')}
    >
      <View style={[styles.centerElement, { width: 55 }]}>
        <Image
          // source={(icons.find((icon) => icon.category == worksite.category))?.image}
          source={categorieIcons[0].image}
          style={styles.icon}
        />
      </View>

      <View style={{ flexShrink: 1, alignSelf: 'center' }}>
        <Text numberOfLines={1} style={{ fontSize: 15 }}>Réparation Antenne</Text>
        <Text numberOfLines={1} style={{ color: '#8f8f8f' }}>123 Rue de Rennes, 35330 PIPRIAC</Text>
      </View>

      <View style={styles.verticleLine} />

      <View style={[styles.centerElement, { marginRight: 10, alignItems: 'flex-end' }]}>
        <Text>9h00</Text>
        <Text>11h00</Text>
      </View>

      <View style={[styles.centerElement, { backgroundColor: stateIcons[1].color, width: 20, borderTopRightRadius: 5, borderBottomRightRadius: 5 }]}>
        <Image
          // source={(stateIcons.find((icon) => icon.state == worksite.state))?.image}
          source={stateIcons[1].image}
          style={{ width: 15, height: 15 }}
        />
      </View>

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  centerElement: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    height: 40,
    width: 40
  },
  verticleLine: {
    height: '55%',
    width: 1,
    alignSelf: 'center',
    backgroundColor: '#ddd',
    marginHorizontal: 8
  }
})

export { WorkSiteCard };