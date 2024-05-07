// ProfileScreen.js

import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { WorkSiteAndRequest } from '../api/Model';
import { TitleHeader } from '../components/Header';
import { users } from '../dataset';
import { Button } from '@rneui/themed';

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

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <TitleHeader title={""}  subtitle={""} isBlue={true} />,
    });
  }, [])

  return (
<View style={styles.container}>
  {/* Section 1 */}
  <Image source={require('../assets/user.png')} style={styles.profileImage} />
  <View style={styles.editIconContainer2}>
  <View style={styles.editIconContainer}>
            {renderEditButton()}
  </View>
  </View>
  <View style={styles.groupContainer}>
    <View style={styles.nameContainer}>
      <Text style={styles.label}>Nom:</Text>
      <View style={styles.fieldRow}>
        <Text style={styles.text}>{users[3].firstName} {users[3].lastName}</Text>
        <View style={styles.editIconContainer}>
            {renderEditButton()}
          </View>
      </View>
    </View>
  </View>
  
  {/* Section 2 */}
  <View style={styles.groupContainer}>
    <View style={styles.nameContainer}>
      <Text style={styles.label}>Email:</Text>
      <View style={styles.fieldRow}>
        <Text style={styles.text}>{users[3].email}</Text>
        <View style={styles.editIconContainer}>
            {renderEditButton()}
          </View>
      </View>
    </View>
  </View>
  {/* Section 3 */}
  <View style={styles.groupContainer}>
    <View style={styles.nameContainer}>
      <Text style={styles.label}>Numéro de téléphone:</Text>
      <View style={styles.fieldRow}>
        <Text style={styles.text}>{users[3].phoneNumber}</Text>
        <View style={styles.editIconContainer}>
            {renderEditButton()}
          </View>
      </View>
    </View>
  </View>





  <Button
          onPress={handleLogout}
          title={'Se Déconnecter'}
          buttonStyle={{
            backgroundColor: '#E15656',
            borderRadius: 20,
          }}
          containerStyle={{
            minWidth: 200,
            alignSelf: 'center',
            justifyContent: 'flex-end',
            paddingVertical: 20
          }}
        />

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
  groupContainer: {
    backgroundColor: '#E5E5E5',
    borderRadius: 10,
    padding: 5,
    marginBottom: 20,
    width: '100%',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100, 
    height: 100, 
    borderRadius: 75, 
  },
  nameContainer: {
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
  editIconContainer: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 5,
  },
  editIconContainer2: {
      paddingLeft:120,
      paddingBottom:30,

  },
});

export default ProfileScreen;
