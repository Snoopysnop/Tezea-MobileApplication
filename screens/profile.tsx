import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

import { ParamListBase, StackActions, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { TitleHeader } from '../components/Header';
import { users } from '../dataset';
import { Button } from '@rneui/themed';
import { Border, Color, Others } from '../GlobalStyles';
import { FormatPhoneNumber } from '../common/utils/Format';

function ProfileScreen() {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const handleLogout = () => {
    navigation.replace("LoginScreen");
   };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <TitleHeader title='Compte Tezea' subtitle={users[3].role} isBlue={false} />,
    });
  }, [])

  return (
    <View style={{
      // flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      gap: 10
    }}>
      {/* -------------------- PROFILE PICTURE -------------------- */}
      <TouchableOpacity onPress={() => console.log("photo de profil")}>
        <View style={styles.profilePictureContainer}>
          <Image
            source={require("../assets/duck.jpg")}
            style={styles.profilePicture}
          />
          <Image
            style={styles.editIcon}
            source={require("../assets/edit.png")}
          />
        </View>
      </TouchableOpacity>

      {/* -------------------- SECTION 1 -------------------- */}
      <View style={{ gap: 5, ...styles.container }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {Info("Nom", users[3].firstName + ' ' + users[3].lastName)}
        </View>
        <Text style={{ color: '#A4A4A4', fontSize: 13 }}>Pour mettre à jour ces données, veuillez vous rapprochez de la <Text style={{ textDecorationLine: 'underline' }}>conciergerie</Text> de Tezea.</Text>
      </View>

      {/* -------------------- SECTION 2 -------------------- */}
      <View style={{ gap: 15, ...styles.container }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {Info("Email", users[3].email)}
          <Image style={{ width: 15, height: 15, position: 'relative' }} source={require('../assets/simple-edit.png')} />
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {Info("Téléphone", FormatPhoneNumber(users[3].phoneNumber))}
          <Image style={{ width: 15, height: 15, position: 'relative' }} source={require('../assets/simple-edit.png')} />
        </View>
      </View>

      {/* -------------------- SECTION 3 -------------------- */}
      <View style={{ gap: 15, ...styles.container }}>
        {Param("Langue")}
        {Param("Affichage")}
        {Param("Notification")}
      </View>

      {/* -------------------- DISCONNECT -------------------- */}
      <Button
        onPress={handleLogout}
        title={'Se Déconnecter'}
        buttonStyle={{
          backgroundColor: Color.red,
          borderRadius: 20,
          elevation: Others.elevation,
          shadowColor: Others.shadow_color
        }}
        containerStyle={{
          minWidth: 200,
          alignSelf: 'center',
          justifyContent: 'flex-end',
          paddingVertical: 20,
          borderRadius: 100,
        }}
      />
    </View>
  );
};

const Info = (label: string, value: string) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'baseline', flex: 1 }}>
      <Text style={{ color: 'black', fontSize: 16, fontWeight: '600' }}>{label} : </Text>
      <Text style={{ color: '#7D7D7D', fontSize: 15, fontWeight: '400' }}>{value}</Text>
    </View>
  );
}

const Param = (label: string) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text style={{ color: 'black', fontSize: 16, fontWeight: '600', flex: 1 }}>{label}</Text>
      <Image style={{ width: 15, height: 15, position: 'relative' }} source={require('../assets/right-arrow.png')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.white,
    borderRadius: Border.secondary_radius,
    width: '100%',
    padding: 15,
    elevation: Others.elevation,
    shadowColor: Others.shadow_color
  },
  profilePictureContainer: {
    alignItems: 'center',
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  editIcon: {
    width: 35,
    height: 35,
    position: 'relative',
    bottom: 25,
    left: 35,
  },
});

export { ProfileScreen };
