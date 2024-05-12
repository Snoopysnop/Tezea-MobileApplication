import React from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../screens/types';
import { categorieIcons, stateIcons } from '../IconList';
import { WorkSiteAndRequestAPI } from '../../api/Model';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { WorkSiteStatus, WorkSiteStatusAPI } from '../../api/Enums';
import { FormatHour } from '../../common/utils/Format';

type WorkSiteCardParams = {
  workSiteAndRequest: WorkSiteAndRequestAPI;
}

function WorkSiteCard({ workSiteAndRequest }: WorkSiteCardParams) {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const computeInternalStatus = () => {
    let status: string = workSiteAndRequest.status.toString()

    if (status == WorkSiteStatusAPI.InProgress && workSiteAndRequest.hasIncidents)
      status = "Incident"

    return status
  }

  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        backgroundColor: '#fff',
        minWidth: '100%',
        marginBottom: 2,
        height: 80,
        borderRadius: 5,
        elevation: 3,
      }}
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
        <Text>{FormatHour(new Date(workSiteAndRequest.begin))}</Text>
        <Text>{FormatHour(new Date(workSiteAndRequest.end))}</Text>
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