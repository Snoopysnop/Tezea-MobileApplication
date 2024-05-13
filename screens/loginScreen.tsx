import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, Text, Image, ImageBackground } from 'react-native';
import { Border, Color, Others } from '../GlobalStyles';
import { Button } from '@rneui/themed';
import { Role } from '../api/Model';
import MainApi from '../api/MainApi';


function LoginScreen({route}:any) {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const { setUser } = route.params;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLogin = async () => {

    try {
      let response = await MainApi.getInstance().getuserByEmail(username)
      setLoginError('');
      await setUser(response);
      navigation.push("WorkSiteList",{user:response})
    } catch (error) {
      console.log(error)
      setLoginError('Nom d\'utilisateur ou mot de passe incorrect');
    }
  };

  useEffect(() => {
    
    navigation.addListener('beforeRemove', (e: any) => {
      // Prevent default behavior of leaving the screen
      e.preventDefault();
    })
  }, [])

  return (
    <ImageBackground source={require('../assets/mask-group.png')} resizeMode="cover" style={{ width: '100%', height: '100%' }}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Image source={require('../assets/tezea-logo-white.png')} style={{
          width: 120,
          height: 120,
          marginBottom: 20,
          resizeMode: 'contain',
        }} />

        <View style={{ padding: 20, backgroundColor: Color.white, borderRadius: 20, gap: 15, width: '90%', elevation: Others.elevation, shadowColor: Others.shadow_color, marginBottom: 60 }}>
          <Text style={{ color: Color.blue, fontSize: 20, fontWeight: '600' }}>Connexion</Text>

          <View>
            <TextInput
              style={{ marginBottom: 10, ...styles.input }}
              placeholder="Nom d'utilisateur"
              onChangeText={setUsername}
              value={username}
              autoCapitalize="none"
            />

            <TextInput
              style={{ marginBottom: 2, ...styles.input }}
              placeholder="Mot de passe"
              onChangeText={setPassword}
              value={password}
              secureTextEntry={true}
              autoCapitalize="none"
            />
            {loginError ? <Text style={{ fontSize: 13, color: Color.red }}>{loginError}</Text> : null}
          </View>

          <Button
            title={'Se connecter'}
            onPress={handleLogin}
            buttonStyle={{
              backgroundColor: Color.blue,
              borderRadius: Border.secondary_radius,
            }}
            containerStyle={{
              width: 150,
              alignSelf: 'center'
            }}
          />

          <Text style={{ color: '#A4A4A4', fontSize: 13 }}>Pour créer un nouveau compte, veuillez vous rapprochez de la <Text style={{ textDecorationLine: 'underline' }}>conciergerie</Text> de Tezea.</Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    fontSize: 15,
    borderRadius: Border.default_radius
  }
});

export { LoginScreen };
