import React from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../screens/types';
import { categorieIcons, stateIcons } from '../IconList';
import { WorkSiteAndRequestAPI, WorkSiteStatus } from '../../api/Model';
import { ParamListBase, useNavigation } from '@react-navigation/native';

type WorkSiteCardParams = {
  workSiteAndRequest: WorkSiteAndRequestAPI;
}

function WorkSiteCard({ workSiteAndRequest }: WorkSiteCardParams) {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const computeInternalStatus = () => {
    let status: string = workSiteAndRequest.status

    if (status == WorkSiteStatus.InProgress && workSiteAndRequest.incident)
      status = "Incident"

    return status
  }

  const prettyHour = (dateString: string) => {
    let date = new Date(dateString)
    let utc = date.getTime() + (date.getTimezoneOffset() * 60000);
    var utcDate = new Date(utc);

    let hours = ("0" + utcDate.getHours()).slice(-2)
    let minutes = ("0" + utcDate.getMinutes()).slice(-2)
    return hours + 'h' + minutes
  }

  return (
    <TouchableOpacity
      style={{ flexDirection: 'row', backgroundColor: '#fff', minWidth: '100%', marginBottom: 2, height: 80, borderRadius: 5 }}
      onPress={() => navigation.navigate('WorkSiteManager', {
        workSiteAndRequestAPI: workSiteAndRequest
      })}
    >
      <View style={[styles.centerElement, { width: 55 }]}>
        <Image
          source={(categorieIcons.find((icon) => icon.category == workSiteAndRequest.workSiteRequest.category))?.image}
          style={styles.icon}
        />
      </View>

      <View style={{ flexShrink: 1, flex: 1, alignSelf: 'center' }}>
        <Text numberOfLines={1} style={{ fontSize: 15 }}>{workSiteAndRequest.workSiteRequest.title}</Text>
        <Text numberOfLines={1} style={{ color: '#8f8f8f' }}>{workSiteAndRequest.workSiteRequest.city}</Text>
      </View>

      <View style={styles.verticleLine} />

      <View style={[styles.centerElement, { marginRight: 10, alignItems: 'flex-end' }]}>
        <Text>{prettyHour(workSiteAndRequest.begin)}</Text>
        <Text>{prettyHour(workSiteAndRequest.end)}</Text>
      </View>

      <View style={[styles.centerElement, { backgroundColor: (stateIcons.find((icon) => icon.state == computeInternalStatus()))?.color, width: 20, borderTopRightRadius: 5, borderBottomRightRadius: 5 }]}>
        <Image
          source={(stateIcons.find((icon) => icon.state == computeInternalStatus()))?.image}
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