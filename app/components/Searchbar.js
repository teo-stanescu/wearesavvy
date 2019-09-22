import React, {useState} from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { SearchBar } from 'react-native-elements';

const width = Dimensions.get("window").width;

const Searchbar = (props) => {
    const [search, setSearch] = useState("");

    function setText (value) {
        setSearch(value);
        props.updateSearch(value);
    }

    return (
        <SearchBar
            placeholder="Search ..."
            onChangeText={setText}
            value={search}
            containerStyle={styles.searchbarContainer}
            inputContainerStyle={styles.searchbarInputContainer}
        />
    )
}

const styles = StyleSheet.create({
    searchbarContainer: {
        width: width*0.8,
        marginBottom: 10,
        backgroundColor: 'transparent',
        borderBottomWidth: 0,
        borderTopWidth: 0
    },
    searchbarInputContainer: {
        backgroundColor: 'transparent',
        borderBottomWidth: 1,
    }
})

export default Searchbar;