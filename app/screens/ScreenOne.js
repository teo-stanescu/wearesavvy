import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Searchbar from '../components/Searchbar';



export default class ScreenOne extends React.Component {

    static navigationOptions = {
        header: null
    };

    constructor() {
        super();
        this.state = {
            light: true
        }
        this.search = "";
    }

    updateSearch = value => {
        this.search = value;
    }

    startSearch = () => {

        this.props.navigation.navigate("ScreenTwo", { search: this.search, light: this.state.light });
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: this.state.light ? '#fff' : '#242121' }}>

                <Button
                    title={this.state.light ? "Dark Theme" : "Light Theme"}
                    onPress={() => this.setState({ light: !this.state.light })}
                    style={{ alignSelf: "flex-end", marginRight: 15 }}
                />
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Searchbar updateSearch={this.updateSearch} />
                    <Button
                        icon={
                            <Icon
                                name="arrow-right"
                                size={15}
                                color="white"
                            />
                        }
                        iconRight={true}
                        iconContainerStyle={{ paddingHorizontal: 10 }}
                        title="Search  "
                        onPress={this.startSearch}
                    />
                </View>
            </SafeAreaView>
        );
    }
}

