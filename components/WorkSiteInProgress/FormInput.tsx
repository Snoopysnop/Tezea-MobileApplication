// components/formInput.jsx
import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { Controller } from 'react-hook-form';

interface FormInputParams {
    control: any,
    name: string,
    placeholder?: string,
    multiline?: boolean,
    numeric?: boolean
}

const FormInput = ({ control, name, placeholder, multiline, numeric }: FormInputParams) => {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
                <View>
                    <Text style={styles.name}>
                        {name}
                    </Text>
                    <TextInput
                        style={{borderColor: error?'#E15656':'#ccc', ...styles.input}}
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        placeholder={placeholder}
                        multiline={multiline}
                        numberOfLines={multiline?5:1}
                        textAlignVertical={multiline?'top':'center'}
                        keyboardType={numeric?'numeric':'default'}
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
        // flexDirection: "row",
        // justifyContent: "space-between",
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        paddingVertical: 5,
    },
    errorMessage: {
        fontSize: 12,
        color: '#E15656'
    }
});

export default FormInput;