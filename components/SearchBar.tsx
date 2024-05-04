import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image, TextInput } from 'react-native';

type Props<Type> = {
    data: Type
    setData: Function
};

function SearchBar<Type>({ data, setData }: Props<Type>) {
    const [search, setSearch] = React.useState('');

    const handleSearch = (input: string) => {
        setSearch(input);
        // setData(input);
        // setData(input == '' ? data : data.filter(element => element.title.toUpperCase().includes(input.toUpperCase())));
    }

    return (
        <View style={styles.searchBarContainer}>
            <TextInput
                placeholder="Search..."
                placeholderTextColor='#ccc'
                onChangeText={handleSearch}
                value={search}
                style={styles.searchBar}
                autoCapitalize="none"
                autoCorrect={false}
            />
            <TouchableOpacity
                style={styles.closeButtonParent}
                onPress={() => handleSearch('')}
            >
                <Image
                    style={styles.closeButton}
                    source={require("../assets/close.png")}
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    searchBarContainer: {
        borderColor: "#ccc",
        borderRadius: 8,
        borderWidth: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: '#fff',
        width: '92%'
    },
    searchBar: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 35,
        paddingVertical: 10,
    },
    closeButton: {
        height: 20,
        width: 20,
        marginRight: 10,
        position: 'relative',
    },
    closeButtonParent: {
        justifyContent: "center",
        alignItems: "center",
        marginRight: 5,
    },
})

export { SearchBar };