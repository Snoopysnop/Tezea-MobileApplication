// components/formInput.jsx
import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { Controller } from 'react-hook-form';
import { Color } from '../../../GlobalStyles';

interface FormInputParams {
    control: any,
    name: string,
    placeholder?: string,
    multiline?: boolean,
    numeric?: boolean,
    optional?: boolean
}

const FormInput = ({ control, name, placeholder, multiline, numeric, optional }: FormInputParams) => {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
                <View>
                    <Text style={styles.name}>
                        {name} {optional && "(facultatif)"}
                    </Text>
                    <TextInput
                        style={{ borderColor: error ? '#E15656' : '#ccc', ...styles.input }}
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        placeholder={placeholder}
                        multiline={multiline}
                        numberOfLines={multiline ? 5 : 1}
                        textAlignVertical={multiline ? 'top' : 'center'}
                        keyboardType={numeric ? 'numeric' : 'default'}
                    />
                    {error && <Text style={styles.errorMessage}>
                        {error.message}
                    </Text>
                    }
                </View>
            )}
        />
    )
}

const styles = StyleSheet.create({
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
    },
    errorMessage: {
        fontSize: 12,
        color: Color.red
    }
});

export default FormInput;