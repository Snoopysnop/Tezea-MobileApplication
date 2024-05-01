import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './types';
import { categorieIcons, stateIcons } from '../components/IconList';
import WorkSiteCard from '../components/WorkSiteCard';
import WorkSiteDay from '../components/WorkSiteDay';
import { Button } from '@rneui/themed';
import SearchBar from '../components/SearchBar';

type Screen1NavigationProp = StackNavigationProp<RootStackParamList, 'WorkSiteList'>;

type Props = {
  navigation: Screen1NavigationProp;
};

// Corrected the props definition and parameter
export default function WorkSiteList({ navigation }: Props) {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#76C3F0', width: '100%', paddingVertical: 15 }}>
        {/* header */}

      <SearchBar data={['aaa', 'bbb']} setData={(data: string) => alert(data)}/>

        {/* filters */}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop:20 }}>
          <WorkSiteDay navigation={navigation} />
          <WorkSiteDay navigation={navigation} />
          <WorkSiteDay navigation={navigation} />
          <WorkSiteDay navigation={navigation} />
        </View>

        <Button
          title={'Voir Plus'}
          onPress={() => alert("click")}
          buttonStyle={{
            backgroundColor: '#008FE3',
            borderRadius: 20,
          }}
          containerStyle={{
            width: 150,
            marginBottom: 80,
            alignSelf: 'center'
          }}
        />
      </ScrollView>

    </View>

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
  horizontalLine: {
    height: 1,
    width: '25%',
    alignSelf: 'center',
    marginHorizontal: 20,
    backgroundColor: '#008FE3',
  }
})
