import { useForm } from 'react-hook-form';
import { Alert, StyleSheet, Text, TextInput, View, Modal, TouchableOpacity, Pressable, Image, FlatList } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@rneui/themed';
import FormInput from './FormInput';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { IndexPath, Select, SelectItem } from '@ui-kitten/components';
import { Controller } from 'react-hook-form';

const formSchema = z.object({
    Titre: z.string().min(3, 'Le titre doit contenir au moins 3 charactères'),
    Description: z.string().optional(),
    Prix: z.coerce.number({
        required_error: "Champ obligatoire",
        invalid_type_error: "Le prix doit être un nombre"
    }).positive("Le prix doit être supérieur à zéro"),
});

type IncidentFormParams = {
    addIncident: Function,
    setIsModalVisible: Function,
}

function IncidentForm({ addIncident, setIsModalVisible }: IncidentFormParams) {
    const [evidences, setEvidences] = useState<string[]>([]);

    const levels = ['Faible', 'Majeur', 'Bloquant']

    const { control, handleSubmit } = useForm({
        defaultValues: {
            Titre: '',
            Description: '',
            Niveau: '',
        },
        resolver: zodResolver(formSchema),
    });

    const onSubmit = (data: any) => {
        addIncident({
            title: data.Titre,
            description: data.Description,
            level: data.Niveau,
            evidences: evidences,
        })
        setIsModalVisible(false);
    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            quality: 1,
        });

        if (!result.canceled) {
            setEvidences(result.assets.map(asset => asset.uri));
        }
    };

    // const renderItem = ({ item }) => (
    //     <View style={styles.carouselItem}>
    //         <Image
    //             source={{ uri: item }}
    //             style={styles.image} />
    //     </View>
    // );

    // const addPhotos = (
    //     <TouchableOpacity style={styles.addPhotos} onPress={pickImage}>
    //         <Image
    //             source={require('../../assets/icons/more.png')}
    //             style={styles.addPhotosIcon}
    //         />
    //     </TouchableOpacity>
    // )

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Facture</Text>
            <FormInput
                control={control}
                name={'Titre'}
                placeholder="titre de l'incident"
            />
            <FormInput
                control={control}
                name={'Description'}
                placeholder='description'
                multiline={true}
                optional={true}
            />

            <View>
                <Text style={styles.name}>Niveau</Text>
                <Controller
                    control={control}
                    name='Niveau'
                    render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
                        <Select
                            value={value}
                            onSelect={(index) => { onChange(levels[index.row]); }}
                            onBlur={onBlur}
                        >
                            <SelectItem
                                key={'Minor'}
                                title={'Faible'}
                            />
                            <SelectItem
                                key={'Severe'}
                                title={'Majeur'}
                            />
                            <SelectItem
                                key={'Blocking'}
                                title={'Bloquant'}
                            />
                        </Select>
                    )}
                />
            </View>

            <View>
                <Text style={styles.name}>Photos</Text>
                <View style={{
                    alignSelf: 'flex-start',
                    ...styles.container
                }}>
                    {/* <FlatList
                        data={evidences}
                        // renderItem={(item) => renderItem(item)}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        // ListFooterComponent={addPhotos}
                    /> */}
                </View>


                        {/* // <View key={index}>
                        //     <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center', borderRadius: 5, borderWidth: 1, borderColor: '#ccc', padding: 5 }}>
                        //         <Image
                        //             source={{ uri: evidence }}
                        //             style={{ width: 40, height: 40, backgroundColor: 'white' }}
                        //         />
                        //     </View>
                        //     <Text style={{ color: '#76C3F0' }}>Ajouter une facture.</Text>
                        // </View> */}

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

export { IncidentForm };