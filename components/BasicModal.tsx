import React, { ReactNode } from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import { Button } from '@rneui/themed';

type ModalParams = {
    isModalVisible: boolean
    setIsModalVisible: Function
    component: ReactNode
};

function BasicModal({ isModalVisible, setIsModalVisible, component }: ModalParams) {
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
                        {component}

                        <Button
                            title={'Fermer'}
                            onPress={() => setIsModalVisible(!isModalVisible)}
                            buttonStyle={{
                                backgroundColor: '#76C3F0',
                                borderRadius: 20,
                            }}
                            containerStyle={{
                                width: 100,
                                marginTop: 10,
                                alignSelf: 'center'
                            }}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        maxWidth: '95%'
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

export { BasicModal };