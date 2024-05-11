import React, { useState, useRef } from 'react';
import { StyleSheet, View, Alert, Modal, Image, Dimensions, Text, ImageBackground, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { NativeSyntheticEvent, NativeTouchEvent } from 'react-native';
import { captureRef } from 'react-native-view-shot';
import * as FileSystem from 'expo-file-system';
import { useNavigation, ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack";
import { AirbnbRating } from 'react-native-ratings';
import { Button } from '@rneui/themed';
import MainApi from '../../api/MainApi';
import { WorkSiteStatusAPI } from '../../api/Enums';

type SignatureScreenParams = {
  workSiteId: string;
  refresh: boolean;
  setRefresh: Function;
  setValidationScreenModal: Function;
}

function SignatureScreen({ workSiteId, refresh, setRefresh, setValidationScreenModal }: SignatureScreenParams) {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const [paths, setPaths] = useState<string[]>([]);
  const [currentPath, setCurrentPath] = useState('');
  const [capturedImageUri, setCapturedImageUri] = useState<string | null>(null);
  const svgRef = useRef<Svg>(null);

  const [rating, setRating] = useState("");

  async function uriToBase64(uri: string) {
    const result = await fetch(uri)
    const blob = await result.blob()

    const reader = new FileReader()
    reader.readAsDataURL(blob)

    return new Promise((resolve, reject) => {
      reader.onerror = reject;
      reader.onload = () => {
        resolve(String(reader?.result).split(",")[1])
      }
    })
  }

  const updateWorkSite = async (signature: string) => {
    try {
      // upload signature and rating
      let b64 = await uriToBase64(signature) as string
      b64 = await uriToBase64(signature) as string
      await MainApi.getInstance().uploadSignatureAndRating(workSiteId, b64, rating)

      // update workSite status
      await MainApi.getInstance().updateWorksiteStatus(workSiteId, WorkSiteStatusAPI.Done)
      setRefresh(!refresh)
    } catch (error) {
      console.log(error)
    }
  }

  const handleRating = (rating: number) => {
    let ratingOptions = ["Dissatisfied", "Low", "Medium", "High", "Perfect"];
    setRating(ratingOptions[rating - 1])
  };

  const handleTouchStart = (event: NativeSyntheticEvent<NativeTouchEvent>) => {
    const { pageX, pageY } = event.nativeEvent.touches[0];
    setCurrentPath(`M${pageX},${pageY - 230}`);
  };

  const handleTouchMove = (event: NativeSyntheticEvent<NativeTouchEvent>) => {
    const { pageX, pageY } = event.nativeEvent.touches[0];
    const newPosition = `L${pageX},${pageY - 230}`;
    setCurrentPath((prevPath) => prevPath + newPosition);
  };

  const handleTouchEnd = () => {
    setPaths((prevPaths) => [...prevPaths, currentPath]);
    setCurrentPath('');
  };

  const handleCapture = async () => {
    if (svgRef.current) {
      try {
        // const uri = await captureRef(svgRef, { format: 'png', quality: 1 });
        setCapturedImageUri(await captureRef(svgRef, { format: 'png', quality: 1 }));
      } catch (error) {
        console.error('Error capturing image:', error);
        Alert.alert('Error', 'Failed to capture image.');
      }
    }
  };

  const handleClear = () => {
    setPaths([]);
  };

  const handleModalClose = () => {
    setCapturedImageUri(null);
  };

  const handleValidate = async () => {
    if (capturedImageUri) {
      try {
        updateWorkSite(capturedImageUri);
      } catch (error) {
        console.error('Error getting file info:', error);
        Alert.alert('Error', 'Failed to get file info.');
      }
    }
  };


  return (
    <ImageBackground source={require('../../assets/mask-group.png')} resizeMode="cover" style={{ width: '100%', height: '100%' }}>
      <TouchableOpacity onPress={() => setValidationScreenModal(false)}>
        <Image source={require('../../assets/arrow.png')} style={{ position: 'absolute', top: 20, left: 20, height: 30, width: 30 }} resizeMode="contain" />
      </TouchableOpacity>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

        <Modal visible={capturedImageUri != undefined} transparent={true} onRequestClose={handleModalClose}>
          <View style={{ paddingBottom: 50, ...styles.modalContainer }}>
            <View style={styles.blueRectangle}>
              <Image source={{ uri: capturedImageUri }} style={styles.modalImage} resizeMode="contain" />
            </View>

            <View style={[styles.ratingContainer]}>
              <Text style={{ fontSize: 20, color: 'white', fontWeight: '600', marginBottom: 10 }}>Satisfaction</Text>
              <AirbnbRating
                count={5}
                reviews={["Pas du Tout Satisfait", "Peu Satisfait", "Satisfait", "Très Satisfait", "Parfait"]}
                defaultRating={0}
                size={30}
                showRating={false}
                onFinishRating={handleRating}
              />
            </View>
            <View style={{ ...styles.modalButtonContainer }}>
              <Button
                title={'Valider'}
                onPress={handleValidate}
                buttonStyle={{
                  backgroundColor: '#006EE3',
                  borderRadius: 20,
                }}
                containerStyle={{
                  width: 130,
                  alignSelf: 'center'
                }}
              />
              <Button
                title={'Annuler'}
                onPress={handleModalClose}
                buttonStyle={{
                  backgroundColor: '#006EE3',
                  borderRadius: 20,
                }}
                containerStyle={{
                  width: 130,
                  alignSelf: 'center'
                }}
              />
            </View>

          </View>
        </Modal>


        <Text style={{ fontSize: 17, color: 'white', fontWeight: '600', alignSelf: 'flex-start', marginBottom: 5, marginLeft: 55 }}>Signez ci-dessous</Text>

        <View style={{ width: '90%', height: '35%', borderWidth: 2, borderColor: '#76C3F0' }}>
          <Svg style={{ backgroundColor: 'white', borderWidth: 2 }} ref={svgRef} width="100%" height="100%" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
            {paths.map((path, index) => (
              <Path key={index} d={path} fill="none" stroke="black" strokeWidth={2} />
            ))}
            <Path d={currentPath} fill="none" stroke="black" strokeWidth={2} />
          </Svg>
        </View>

        <View style={{ flexDirection: 'row', marginTop: 15, gap: 20 }}>
          <Button
            title={'Valider'}
            onPress={handleCapture}
            buttonStyle={{
              backgroundColor: '#008FE3',
              borderRadius: 20,
            }}
            containerStyle={{
              width: 130,
              alignSelf: 'center'
            }}
          />
          <Button
            title={'Effacer'}
            onPress={handleClear}
            buttonStyle={{
              backgroundColor: '#008FE3',
              borderRadius: 20,
            }}
            containerStyle={{
              width: 130,
              alignSelf: 'center'
            }}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 20,
    justifyContent: 'center'
  },
  blueRectangle: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
  },
  modalImage: {
    width: Dimensions.get('window').width - 60, // Réduit la largeur de l'image
    height: Dimensions.get('window').height - 450, // Réduit la hauteur de l'image
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 30,
  },
  ratingContainer: {
    marginTop: 20,
    alignItems: 'center',
  },

});

export { SignatureScreen };