import React from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../screens/types';
import { categorieIcons, stateIcons } from '../IconList';
import { WorkSiteCard } from './WorkSiteCard';
import { WorkSiteAndRequestAPI } from '../../api/Model';

type Screen1NavigationProp = StackNavigationProp<RootStackParamList, 'WorkSiteList'>;

type Props = {
    navigation: Screen1NavigationProp;
    workSitesAndRequests: WorkSiteAndRequestAPI[];
};

// Corrected the props definition and parameter
function WorkSiteDay({ navigation, workSitesAndRequests }: Props) {

    const formatDate = (inputDate: string): string => {
        const daysOfWeek = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
        const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

        const date = new Date(inputDate);
        const dayOfWeek = daysOfWeek[date.getDay()];
        const dayOfMonth = ("0" + date.getDate()).slice(-2)
        const month = months[date.getMonth()];

        return `${dayOfWeek} ${dayOfMonth} ${month}`;
    };

    return (
        <View style={{ minWidth: '96%', maxWidth: '96%', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 25 }}>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 5 }}>
                <View style={styles.horizontalLine} />
                <Text style={{ fontSize: 16, fontWeight: '800', color: '#008FE3' }}>{formatDate(workSitesAndRequests[0].begin)}</Text>
                <View style={styles.horizontalLine} />
            </View>

            {workSitesAndRequests.map((workSiteAndRequest, index) => {
                return (
                    <WorkSiteCard key={index} workSiteAndRequest={workSiteAndRequest}/>
                );
            })}

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
        // alignSelf: 'center',
        marginHorizontal: 20,
        backgroundColor: '#008FE3',
    }
})

export { WorkSiteDay }