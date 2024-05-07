import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './types';
import { WorkSiteDay } from '../components/WorkSiteList/WorkSiteDay';
import { Button } from '@rneui/themed';
import { SearchBar } from '../components/SearchBar';
import { User, WorkSite, WorkSiteAndRequestAPI } from '../api/Model';
import { workSitesAndRequestsAPI } from '../dataset';
import MainApi from '../api/MainApi';
import { TitleHeader } from '../components/Header';

type Screen1NavigationProp = StackNavigationProp<RootStackParamList, 'WorkSiteList'>;

type WorkSiteListParams = {
  navigation: Screen1NavigationProp;
};

// Corrected the props definition and parameter
function WorkSiteList({ navigation }: WorkSiteListParams) {
  const [workSitesAndRequests, setWorkSitesAndRequests] = useState<WorkSiteAndRequestAPI[]>([])
  const [filteredWorkSitesAndRequests, setFilteredWorkSitesAndRequests] = useState<WorkSiteAndRequestAPI[]>([])
  const [groupedWorkSitesAndRequests, setGroupedWorkSitesAndRequests] = useState<Map<string, WorkSiteAndRequestAPI[]>>(new Map())



  useEffect(() => {
    fetchWorkSitesAndRequests()
  }, [])

  useEffect(() => {
    setGroupedWorkSitesAndRequests(groupByDay(filteredWorkSitesAndRequests))
  }, [filteredWorkSitesAndRequests])

  const fetchWorkSitesAndRequests = async () => {
    try {
      //TODO utiliser le vrai user
      let response = await MainApi.getInstance().getWorksitesAndRequestsForUser("4defa229-69fb-4720-afbe-f35592a43e77")
      setWorkSitesAndRequests(response)
      setFilteredWorkSitesAndRequests(response)
      setGroupedWorkSitesAndRequests(groupByDay(response))
    } catch (error) {
      console.log(error)
    }
  }



  const groupByDay = (workSiteAndRequestAPI: WorkSiteAndRequestAPI[]) => {
    const groupedWorkSites: Map<string, WorkSiteAndRequestAPI[]> = new Map();
    let dayKey: string

    workSiteAndRequestAPI.forEach(workSiteAndRequest => {
      dayKey = new Date(workSiteAndRequest.begin).toISOString().split('T')[0]

      if (groupedWorkSites.has(dayKey)) {
        groupedWorkSites.get(dayKey)?.push(workSiteAndRequest);
      } else {
        groupedWorkSites.set(dayKey, [workSiteAndRequest]);
      }
    })

    return groupedWorkSites
  }

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#76C3F0', width: '100%', paddingTop: 5, paddingBottom: 15 }}>
        <SearchBar data={workSitesAndRequests} setData={setFilteredWorkSitesAndRequests} />
        {/* // TODO filters // */}

      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
          {Array.from(groupedWorkSitesAndRequests.values()).sort((wsar1, wsar2) => {
            let date1 = new Date(wsar1[0].begin)
            let date2 = new Date(wsar2[0].begin)
            return date1 < date2 ? -1 : 1
          }).map((workSitesAndRequests, index) => {
            return (
              <WorkSiteDay key={index} navigation={navigation} workSitesAndRequests={workSitesAndRequests} />
            );
          })}
        </View>

        {/* As long as API doesn't have pagination, this button is not needed
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
        /> */}
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