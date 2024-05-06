import React, { useState } from 'react';
import { Modal, StyleSheet, Text, View, TouchableOpacity, Image, Pressable } from 'react-native';
import { Button } from '@rneui/themed';
import { Incident } from '../../api/Model';

type IncidentReviewModalParams = {
    isModalVisible: boolean,
    setIsModalVisible: Function,
    removeIncident: Function,
    incident: Incident | undefined,
};

function IncidentReviewModal({ isModalVisible, removeIncident, setIsModalVisible, incident }: IncidentReviewModalParams) {
    if (!incident) {
        if (isModalVisible) alert("Désolé, nous n'avons pas pu récupérer les informations liées à l'incident demandé.")
        return;
    }

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="none"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => {
                    setIsModalVisible(false);
                }}>
                <Pressable onPress={() => setIsModalVisible(false)} style={{ width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', ...styles.centeredView }}>
                    <View style={styles.modalView}>

                        <View style={styles.container}>
                            <Text style={styles.heading}>Incident</Text>
                            <View>
                                <Text style={styles.name}>Titre</Text>
                                <Text
                                    style={{ borderColor: '#ccc', ...styles.input }}
                                    numberOfLines={1}
                                >{incident.title}</Text>
                            </View>
                            <View>
                                <Text style={styles.name}>Description</Text>
                                <Text
                                    style={{ borderColor: '#ccc', ...styles.input }}
                                    numberOfLines={5}
                                >{incident.description}</Text>
                            </View>
                            <View>
                                <Text style={styles.name}>Niveau d'Urgence</Text>
                                <Text
                                    style={{ borderColor: '#ccc', ...styles.input }}
                                    numberOfLines={1}
                                >{incident.level}</Text>
                            </View>

                            <View>
                                {(incident.evidences.length!=0) && <Text style={styles.name}>Photos ({incident.evidences.length})</Text>}
                                <View style={{
                                    flexDirection: 'row',
                                    gap: 7,
                                    flexWrap: 'wrap'
                                }}>
                                    {incident.evidences?.map((evidence, index) => {
                                        return (
                                            <View key={index}>
                                                <View style={{ borderRadius: 5 }}>
                                                    <Image
                                                        source={{ uri: `data:image/png;base64,${evidence}` }}
                                                        style={styles.image} />
                                                </View>
                                            </View>
                                        )
                                    })}
                                </View>
                            </View>

                            <Button
                                title={'Supprimer'}
                                onPress={() => {
                                    removeIncident(incident);
                                    setIsModalVisible(false);
                                }}
                                buttonStyle={{
                                    backgroundColor: '#E15656',
                                    borderRadius: 20,
                                }}
                                containerStyle={{
                                    minWidth: 200,
                                    marginTop: 20,
                                    alignSelf: 'center',
                                }}
                            />
                        </View >

                    </View>
                </Pressable>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '90%'
    },
    secondModalView: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 10,
        alignItems: 'center',
        width: '100%',
        height: '20%'
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 3,
        backgroundColor: '#2E9A99',
        position: 'relative',
        bottom: 5,
        borderColor: '#fff',
    },
    image: {
        width: 60,
        height: 60,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    marker: {
        height: 50,
        width: 50,
        tintColor: 'rgba(222, 77, 63, 0.8)'
    },
    markerContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 25,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        borderRadius: 10,
        width: '100%',
        backgroundColor: '#fff',
        padding: 20,
        gap: 10,
    },
    textContainer: {
        flexDirection: 'row',
        gap: 10,
    },
    info: {
        color: '#bbb',
    },
    name: {
        fontWeight: '500',
        paddingBottom: 5
    },
    input: {
        width: '100%',
        borderRadius: 5,
        borderWidth: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        paddingVertical: 5,
        color: '#ccc'
    },
    heading: {
        alignSelf: 'center',
        fontSize: 17,
        fontWeight: '600'
    },
});

export { IncidentReviewModal };