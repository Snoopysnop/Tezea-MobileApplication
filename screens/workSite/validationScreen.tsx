import React, { useState, useRef } from 'react';
import { StyleSheet, View, Button, Alert, Modal, Image, Dimensions,Text } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { NativeSyntheticEvent, NativeTouchEvent } from 'react-native';
import { captureRef } from 'react-native-view-shot';
import * as FileSystem from 'expo-file-system';
import { useNavigation, ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack";
import { AirbnbRating } from 'react-native-ratings';
import { fonts } from '@rneui/base';
import { FontSize } from '../../GlobalStyles';

const SignatureScreen = ({ route }: any) => {
  const { workSiteId } = route.params;

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

  // const putClientInfo = async () => {
  //   try {
  //     // create new invoice
  //     let b64 = await uriToBase64(invoice.invoiceFile) as string
  //     await MainApi.getInstance().putInvoiceForWorkSite(workSiteAndRequest.id, invoice, b64)

  //     // retrieve all invoices
  //     let newInvoices = await MainApi.getInstance().getInvoicesForWorkSite(workSiteAndRequest.id)

  //     setInvoices(newInvoices)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  const handleRating = (rating: number) => {
    alert(rating);
  };
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

  const [paths, setPaths] = useState<string[]>([]);
  const [currentPath, setCurrentPath] = useState('');
  const [capturedImageUri, setCapturedImageUri] = useState<string | null>(null);
  const svgRef = useRef<Svg>(null);

  const handleTouchStart = (event: NativeSyntheticEvent<NativeTouchEvent>) => {
    const { pageX, pageY } = event.nativeEvent.touches[0];
    setCurrentPath(`M${pageX},${pageY - 150}`);
  };

  const handleTouchMove = (event: NativeSyntheticEvent<NativeTouchEvent>) => {
    const { pageX, pageY } = event.nativeEvent.touches[0];
    const newPosition = `L${pageX},${pageY - 150}`;
    setCurrentPath((prevPath) => prevPath + newPosition);
  };

  const handleTouchEnd = () => {
    setPaths((prevPaths) => [...prevPaths, currentPath]);
    setCurrentPath('');
  };

  const handleCapture = async () => {
    if (svgRef.current) {
      try {
        const uri = await captureRef(svgRef, { format: 'png', quality: 1 });
        setCapturedImageUri(uri);
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

  const handleReturnToWorkSiteInfo = () => {
    //TODO refresh le status du worksite
  };


  const handleValidate = async () => {
    if (capturedImageUri) {
      try {
        const { uri } = await FileSystem.getInfoAsync(capturedImageUri);
        Alert.alert('Success', `Image successfully stored at: ${uri}`);
        handleReturnToWorkSiteInfo();
      } catch (error) {
        console.error('Error getting file info:', error);
        Alert.alert('Error', 'Failed to get file info.');
      }
    }
  };


  return (
    <View style={styles.container}>
      {capturedImageUri ? (
        <Modal visible={true} transparent={true} onRequestClose={handleModalClose}>
          <View style={styles.modalContainer}>
            <View style={styles.blueRectangle}>
              <Image source={{ uri: capturedImageUri }} style={styles.modalImage} resizeMode="contain" />
            </View>
            
            <View style={[styles.ratingContainer]}>
            <Text style={{fontSize:30}}>Satisfaction client</Text>
              <AirbnbRating
                count={5}
                reviews={["Pas du Tout Satisfait", "Peu Satisfait", "Satisfait", "Très Satisfait", "Parfait"]}
                defaultRating={0}
                size={30}
                showRating={true}
                onFinishRating={handleRating}
              />
            </View>
            <View style={styles.modalButtonContainer}>
              <Button title="Valider" onPress={handleValidate} />
              <Button title="Close" onPress={handleModalClose} />
            </View>

          </View>

        </Modal>
      ) : (

        <Svg ref={svgRef} width="100%" height="70%" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
          {paths.map((path, index) => (
            <Path key={index} d={path} fill="none" stroke="black" strokeWidth={2} />
          ))}
          <Path d={currentPath} fill="none" stroke="black" strokeWidth={2} />
        </Svg>
      )}
      {!capturedImageUri && (

        <View style={styles.buttonContainer}>
          <Button title="Capture" onPress={handleCapture} />
          <Button title="Clear" onPress={handleClear} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 20,
  },
  blueRectangle: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 10,
    marginTop: 100,
  },
  modalImage: {
    width: Dimensions.get('window').width - 60, // Réduit la largeur de l'image
    height: Dimensions.get('window').height - 400, // Réduit la hauteur de l'image
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  ratingContainer: {
    marginTop: 20,
    alignItems: 'center',
  },

});

export { SignatureScreen };