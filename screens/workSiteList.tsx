import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './types';
import { WorkSiteDay } from '../components/WorkSiteList/WorkSiteDay';
import { SearchBar } from '../components/SearchBar';
import { WorkSiteAndRequestAPI } from '../api/Model';
import MainApi from '../api/MainApi';
import { TitleHeader } from '../components/Header';
import { users } from "../dataset"
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { Button } from '@rneui/themed';

// Corrected the props definition and parameter
function WorkSiteList({ }) {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const [workSitesAndRequests, setWorkSitesAndRequests] = useState<WorkSiteAndRequestAPI[]>([])
  const [filteredWorkSitesAndRequests, setFilteredWorkSitesAndRequests] = useState<WorkSiteAndRequestAPI[]>([])
  const [groupedWorkSitesAndRequests, setGroupedWorkSitesAndRequests] = useState<Map<string, WorkSiteAndRequestAPI[]>>(new Map())

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <TitleHeader title={users[3].firstName + " " + users[3].lastName} subtitle={"Chef de chantier"} isBlue={true} />,
    });

    navigation.addListener('beforeRemove', (e: any) => {
      // Prevent default behavior of leaving the screen
      e.preventDefault();
    })

    fetchWorkSitesAndRequests();
  }, [])

  useEffect(() => {
    setGroupedWorkSitesAndRequests(groupByDay(filteredWorkSitesAndRequests))
  }, [filteredWorkSitesAndRequests])

  const fetchWorkSitesAndRequests = async () => {
    try {
      //TODO utiliser le vrai user
      let response = await MainApi.getInstance().getWorksitesAndRequestsForUser("0903f68d-4db1-4203-beee-095581b29d9a")
      setWorkSitesAndRequests(response)
      setFilteredWorkSitesAndRequests(response)
      setGroupedWorkSitesAndRequests(groupByDay(response))
      setRefreshing(false);
    } catch (error) {
      console.log(error)
    }
  }

  const onRefresh = () => {
    setRefreshing(true);
    fetchWorkSitesAndRequests();
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
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} enabled={true} />}
      >
        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20, marginBottom: 40 }}>
          {Array.from(groupedWorkSitesAndRequests.values()).sort((wsar1, wsar2) => {
            let date1 = new Date(wsar1[0].begin)
            let date2 = new Date(wsar2[0].begin)
            return date1 < date2 ? -1 : 1
          }).map((workSitesAndRequests, index) => {
            return (
              <WorkSiteDay key={index} workSitesAndRequests={workSitesAndRequests} />
            );
          })}
        </View>

        {/* As long as API doesn't have pagination, this button is not needed */}
        {/* <Button
          title={'Voir Plus'}
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