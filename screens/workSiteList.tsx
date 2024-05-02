import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './types';
import { WorkSiteDay } from '../components/WorkSiteList/WorkSiteDay';
import { Button } from '@rneui/themed';
import { SearchBar } from '../components/SearchBar';

type Screen1NavigationProp = StackNavigationProp<RootStackParamList, 'WorkSiteList'>;

type Props = {
  navigation: Screen1NavigationProp;
};

// Corrected the props definition and parameter
function WorkSiteList({ navigation }: Props) {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#76C3F0', width: '100%', paddingTop: 5, paddingBottom: 15 }}>
        <SearchBar data={['aaa', 'bbb']} setData={(data: string) => alert(data)} />
        {/* TODO filters */}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
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

export { WorkSiteList }