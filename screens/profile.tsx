// ProfileScreen.js

import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { WorkSiteAndRequest } from '../api/Model';

type RootStackParamList = {
  Login: undefined;
};


type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList>;


const ProfileScreen = () => {

  const navigation = useNavigation<ProfileScreenNavigationProp>();

  const handleLogout = () => {
    navigation.navigate('Login');
  };

  const renderEditButton = () => {
    return (
      <TouchableOpacity onPress={() => console.log('Edit pressed')}>
        <Image source={require('../assets/modify.png')} style={styles.editIcon} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/user.png')} style={styles.profileImage} />
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Nom:</Text>
        <View style={styles.fieldRow}>
          <Text style={styles.text}></Text>
          {renderEditButton()}
        </View>
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Email:</Text>
        <View style={styles.fieldRow}>
          <Text style={styles.text}></Text>
          {renderEditButton()}
        </View>
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Numéro de téléphone:</Text>
        <View style={styles.fieldRow}>
          <Text style={styles.text}></Text>
          {renderEditButton()}
        </View>
      </View>
      <Button title="Se déconnecter" onPress={handleLogout} color="red" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  profileImage: {
    width: 100, 
    height: 100, 
    borderRadius: 75, 
    marginBottom: 20,
  },
  fieldContainer: {
    marginBottom: 20,
    width: '70%',
  },
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
    flex: 1,
  },
  editIcon: {
    width: 25,
    height: 25,
  },
});

export default ProfileScreen;
