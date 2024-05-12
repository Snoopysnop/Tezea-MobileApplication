import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../screens/types';
import { WorkSiteCard } from './WorkSiteCard';
import { WorkSiteAndRequestAPI } from '../../api/Model';
import { FormatDate } from '../../common/utils/Format';

type Props = {
    workSitesAndRequests: WorkSiteAndRequestAPI[];
};

// Corrected the props definition and parameter
function WorkSiteDay({ workSitesAndRequests }: Props) {
    return (
        <View style={{ minWidth: '96%', maxWidth: '96%', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 25 }}>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 5 }}>
                <View style={styles.horizontalLine} />
                <Text style={{ fontSize: 16, fontWeight: '800', color: '#008FE3' }}>{FormatDate(new Date(workSitesAndRequests[0].begin), false)}</Text>
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