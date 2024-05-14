import React, { useState } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import MainApi from '../api/MainApi';
import { User } from '../api/Model';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Color, Others } from '../GlobalStyles';

type TitleHeaderParams = {
    title: string
    subtitle: string
    isBlue: boolean
};

function TitleHeader({ title, subtitle, isBlue }: TitleHeaderParams) {
    return (
        <View style={{ alignSelf: 'center', minWidth: '85%', maxWidth: '85%', alignItems: 'center' }}>
            <Text numberOfLines={1} style={{ color: (isBlue ? 'white' : 'black'), ...styles.title }}>{title}</Text>
            <Text style={{ color: (isBlue ? '#F1F1F1' : Color.gray), ...styles.subtitle }}>{subtitle}</Text>
        </View>
    );
}

function ProfileButton() {
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
    return (
        <View style={{ marginRight: 20 }}>
            <TouchableOpacity onPress={() => {
                console.log('uygigbibi')
                navigation.push('ProfileScreen')
            }}>
                <View style={styles.profilePictureContainer}>
                    <Image
                        source={require("../assets/user.png")}
                        style={styles.profilePicture}
                    />
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    profilePictureContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 40,
        elevation: Others.elevation,
    },
    profilePicture: {
        width: 40,
        height: 40,
        borderRadius: 40,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
    },
    subtitle: {
        fontSize: 14,
        fontStyle: 'italic',
    }
});

export { TitleHeader, ProfileButton }