import { useForm } from 'react-hook-form';
import { Alert, StyleSheet, Text, TextInput, View, Modal, TouchableOpacity, Pressable, Image } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@rneui/themed';
import FormInput from './FormInput';
import { useState } from 'react';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import { Invoice } from '../../screens/workSite/workSiteInProgress';

const formSchema = z.object({
    Titre: z.string().min(3, 'Le titre doit contenir au moins 3 charactères'),
    Description: z.string().optional(),
    Prix: z.coerce.number({
        required_error: "Champ obligatoire",
        invalid_type_error: "Le prix doit être un nombre"
    }).positive("Le prix doit être supérieur à zéro"),
});

type InvoiceFormParams = {
    addInvoice: Function,
    setIsModalVisible: Function,
}

function InvoiceForm({ addInvoice, setIsModalVisible }: InvoiceFormParams) {
    const [isSecondModalVisible, setIsSecondModalVisible] = useState(false);
    const [invoice, setInvoice] = useState<Invoice>();

    const { control, handleSubmit } = useForm({
        defaultValues: {
            Titre: '',
            Description: '',
            Prix: '',
        },
        resolver: zodResolver(formSchema),
    });

    const onSubmit = (data: any) => {
        if (!invoice) alert('La facture est obligatoire.')
        else {
            addInvoice({
                title: data.Titre,
                description: data.Description,
                price: data.Prix,
                invoice: invoice,
            })
            setIsModalVisible(false);
        }
    }

    const pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({});
        if (!result.canceled) {
            setInvoice({
                uri: result.assets[0].uri,
                name: result.assets[0].name,
                type: 'file'
            });
        }
    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });

        if (!result.canceled) {
            setInvoice({
                uri: result.assets[0].uri,
                name: result.assets[0].fileName,
                type: 'image'
            });
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Facture</Text>
            <FormInput
                control={control}
                name={'Titre'}
                placeholder='titre de la facture'
            />
            <FormInput
                control={control}
                name={'Description'}
                placeholder='description'
                multiline={true}
                optional={true}
            />
            <FormInput
                control={control}
                name={'Prix'}
                placeholder='prix'
                numeric={true}
            />

            <View>
                <Text style={styles.name}>Facture</Text>
                <TouchableOpacity onPress={() => setIsSecondModalVisible(true)}>
                    {invoice ?
                        <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', borderRadius: 5, borderWidth: 1, borderColor: '#ccc', padding: 5 }}>
                            {invoice.type == 'file' ?
                                <Image
                                    source={require('../../assets/file.png')}
                                    style={{ width: 40, height: 40, backgroundColor: 'white' }}
                                />
                                :
                                <Image
                                    source={{ uri: invoice.uri }}
                                    style={{ width: 40, height: 40, backgroundColor: 'white' }}
                                />
                            }
                            <Text numberOfLines={1} style={{ color: '#76C3F0' }}>{invoice.name}</Text>
                        </View>
                        :
                        <Text style={{ color: '#76C3F0' }}>Ajouter une facture.</Text>
                    }
                </TouchableOpacity>
            </View>

            <Button
                title={'Valider'}
                onPress={handleSubmit(onSubmit)}
                buttonStyle={{
                    backgroundColor: '#76C3F0',
                    borderRadius: 20,
                }}
                containerStyle={{
                    minWidth: 200,
                    alignSelf: 'center',
                }}
            />

            <Modal
                animationType='slide'
                transparent={true}
                visible={isSecondModalVisible}
                onRequestClose={() => {
                    setIsSecondModalVisible(!isSecondModalVisible);
                }}>
                <Pressable onPress={() => setIsSecondModalVisible(false)} style={{ width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.60)', flexDirection: 'row', alignItems: 'flex-end' }}>
                    <View style={styles.secondModalView}>
                        <View style={{ flexDirection: 'row', gap: 10 }}>
                            <TouchableOpacity onPress={() => {
                                pickImage();
                                setIsSecondModalVisible(false);
                            }} style={{ flex: 1 }}>
                                <View style={{ backgroundColor: '#76C3F0', justifyContent: 'center', borderRadius: 15, height: '100%', alignItems: 'center', gap: 5 }}>
                                    <Image
                                        source={require("../../assets/upload-picture.png")}
                                        style={{ aspectRatio: 1, height: 60 }}
                                    />
                                    <View style={{ alignItems: 'center' }}>
                                        <Text style={{ color: 'white' }}>Choisir Depuis</Text>
                                        <Text style={{ color: 'white' }}>Ma Gallerie</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                pickDocument();
                                setIsSecondModalVisible(false);
                            }} style={{ flex: 1 }}>
                                <View style={{ backgroundColor: '#40B3B1', justifyContent: 'center', borderRadius: 15, height: '100%', alignItems: 'center', gap: 5 }}>
                                    <Image
                                        source={require("../../assets/upload-file.png")}
                                        style={{ aspectRatio: 1, height: 55 }}
                                    />
                                    <View style={{ alignItems: 'center' }}>
                                        <Text style={{ color: 'white' }}>Choisir Depuis</Text>
                                        <Text style={{ color: 'white' }}>Mes Fichiers</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Pressable>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    name: {
        fontWeight: '500',
        paddingBottom: 5
    },
    heading: {
        alignSelf: 'center',
        fontSize: 17,
        fontWeight: '600'
    },
    container: {
        width: '100%',
        backgroundColor: '#fff',
        padding: 20,
        gap: 20,
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
});

export { InvoiceForm };