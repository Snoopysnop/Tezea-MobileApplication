import React from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../screens/types';
import { categorieIcons, stateIcons } from '../components/IconList';
import WorkSiteCard from '../components/WorkSiteCard';

type Screen1NavigationProp = StackNavigationProp<RootStackParamList, 'WorkSiteList'>;

type Props = {
    navigation: Screen1NavigationProp;
};

// Corrected the props definition and parameter
export default function WorkSiteDay({ navigation }: Props) {
    return (
        <View style={{ width: '92%', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 25 }}>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom:5 }}>
                <View style={styles.horizontalLine} />
                <Text style={{ fontSize: 16, fontWeight: '800', color: '#008FE3' }}>Mardi 30 Avril</Text>
                <View style={styles.horizontalLine} />
            </View>

            <WorkSiteCard navigation={navigation} />
            <WorkSiteCard navigation={navigation} />

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
