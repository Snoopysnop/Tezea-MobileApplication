import React, { useState } from 'react';
import { Modal, StyleSheet, Text, View, TouchableOpacity, Image, Pressable } from 'react-native';
import { IncidentInfo, InvoiceInfo } from '../../screens/workSite/workSiteInProgress';
import { Button } from '@rneui/themed';

type InvoiceReviewModalParams = {
    isModalVisible: boolean,
    setIsModalVisible: Function,
    removeInvoice: Function,
    invoice: InvoiceInfo | IncidentInfo | undefined,
};

function InvoiceReviewModal({ isModalVisible, removeInvoice, setIsModalVisible, invoice }: InvoiceReviewModalParams) {
    if (!invoice) {
        if (isModalVisible) alert("Désolée, nous n'avons pas pu récupérer les informations liées à la facture demandée.")
        return;
    }

    invoice = invoice as InvoiceInfo

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
                            <Text style={styles.heading}>Facture</Text>
                            <View>
                                <Text style={styles.name}>Titre</Text>
                                <Text
                                    style={{ borderColor: '#ccc', ...styles.input }}
                                    numberOfLines={1}
                                >{invoice.title}</Text>
                            </View>
                            <View>
                                <Text style={styles.name}>Description</Text>
                                <Text
                                    style={{ borderColor: '#ccc', ...styles.input }}
                                    numberOfLines={5}
                                >{invoice.description}</Text>
                            </View>
                            <View>
                                <Text style={styles.name}>Prix</Text>
                                <Text
                                    style={{ borderColor: '#ccc', ...styles.input }}
                                    numberOfLines={1}
                                >{invoice.price}</Text>
                            </View>

                            <View>
                                <Text style={styles.name}>Facture</Text>
                                <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', borderRadius: 5, borderWidth: 1, borderColor: '#ccc', padding: 5 }}>
                                    {invoice.invoice.type == 'file' ?
                                        <Image
                                            source={require('../../assets/file.png')}
                                            style={{ width: 40, height: 40, backgroundColor: 'white' }}
                                        />
                                        :
                                        <Image
                                            source={{ uri: invoice.invoice.uri }}
                                            style={{ width: 40, height: 40, backgroundColor: 'white' }}
                                        />
                                    }
                                    <Text numberOfLines={1} style={{ color: '#ccc' }}>{invoice.invoice.name}</Text>
                                </View>
                            </View>

                            <Button
                                title={'Supprimer'}
                                onPress={() => {
                                    removeInvoice(invoice);
                                    setIsModalVisible(false);
                                }}
                                buttonStyle={{
                                    backgroundColor: '#E15656',
                                    borderRadius: 20,
                                }}
                                containerStyle={{
                                    minWidth: 200,
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

export { InvoiceReviewModal };