import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { ListItem, Button } from 'react-native-elements';
import Loader from '../components/Loader';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class ScreenTwo extends React.Component {
  static navigationOptions = {
    header: null
  };

  backToSearch = () => {
    this.props.navigation.pop();
  }

  render() {

    return (
      <SafeAreaView style={{
        flex: 1,
        backgroundColor: this.props.navigation.getParam("light") ? '#fff' : '#242121'
      }}>
        <Button
          title="Go Back"
          onPress={this.backToSearch}
          style={{ alignSelf: "flex-start", marginLeft: 15, marginBottom: 15 }}
        />
        <RepoList username={this.props.navigation.getParam("search")} />
      </SafeAreaView>
    );
  }
}

const RepoList = ({ username }) => (
  <Query
    query={GET_USER_REPOSITORIES}
    variables={{ username }}
    skip={!username}
  >
    {({ loading, error, data, refetch }) => {
      if (loading) return <Loader loading={true} />;
      if (error) return <Text style={{ color: '#86939e', fontSize: 16, alignSelf: 'center' }}>Please try a different username!</Text>;
      // console.log("dataaa ", data);
      return (
        <ScrollView style={{ width: '100%' }}>
          {data.user.repositoriesContributedTo.edges.length > 0 ? (
            <View>
              <Text style={{
                fontSize: 20,
                alignSelf: "center",
                marginVertical: 20,
                color: '#86939e'
              }}>
                {username}'s top Repositories
              </Text>
              <FlatList
                data={data.user.repositoriesContributedTo.edges}
                keyExtractor={(item, index) => item.node.url}
                renderItem={({ item }) => (
                  <ListItem
                    title={item.node.name}
                    titleStyle={{ fontSize: 16, color: '#86939e', fontWeight: "700", marginBottom: 10 }}
                    subtitle={item.node.description}
                    subtitleStyle={{ fontSize: 14, color: '#86939e' }}
                    rightTitle={() => (
                      <View style={{ flexDirection: 'row' }}>
                        <Text style={{ color: '#86939e' }}>{item.node.stargazers.totalCount}</Text>
                        <Icon
                          name="star"
                          size={15}
                          color="#FFD700"
                          style={{ paddingHorizontal: 5 }}
                        />
                      </View>
                    )}
                    bottomDivider={true}
                    containerStyle={{ backgroundColor: 'transparent' }}
                  />
                )}
              />
            </View>)
            : (
              <Text style={{ color: '#86939e', fontSize: 16, alignSelf: 'center' }}>{username} has no repositories!</Text>
            )}
        </ScrollView>
      )
    }}
  </Query>
);

const GET_USER_REPOSITORIES = gql`
query ($username: String!) {
	user (login: $username) {
      repositoriesContributedTo(first: 10, contributionTypes: [PULL_REQUEST, COMMIT], orderBy: {field: STARGAZERS, direction: DESC}, includeUserRepositories: true) {
        edges {
          node {
            stargazers {
              totalCount
            }
            owner {
              login
            }
            name
            description
            url
          }
        }
      }
    }
  }`