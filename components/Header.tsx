import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';

type TitleHeaderParams = {
    title: string
    subtitle: string
    isBlue: boolean
};

function TitleHeader({ title, subtitle, isBlue }: TitleHeaderParams) {
    return (
        <View style={{ alignItems: 'center' }}>
            <Text style={{ color: (isBlue ? 'white' : 'black'), ...styles.title }}>{title}</Text>
            <Text style={{ color: (isBlue ? '#F1F1F1' : '#7D7D7D'), ...styles.subtitle }}>{subtitle}</Text>
        </View>
    );
}

function ProfileButton() {
    return (
        <View style={{ marginRight: 20 }}>
            <TouchableOpacity onPress={() => alert("pressed")}>
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