import React, { useState } from 'react';
import { Modal, StyleSheet, Text, View, TouchableOpacity, Image, Pressable } from 'react-native';
import { Button } from '@rneui/themed';
import { InvoiceForm } from './InvoiceForm';

type ModalParams = {
    isModalVisible: boolean
    setIsModalVisible: Function
};

function InvoiceModal({ isModalVisible, setIsModalVisible }: ModalParams) {
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="none"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => {
                    setIsModalVisible(!isModalVisible);
                }}>
                <View style={{ width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', ...styles.centeredView }}>
                    <View style={styles.modalView}>

                        <InvoiceForm />

                    </View>
                </View>
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
});

export { InvoiceModal };