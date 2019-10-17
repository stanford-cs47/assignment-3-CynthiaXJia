/*
 *
 * Assignment 3
 * Starter Files
 *
 * CS47
 * Oct, 2018
 */

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';
import { Images, Colors, Metrics } from './App/Themes';
import APIRequest from './App/Config/APIRequest';

import News from './App/Components/News';
import Search from './App/Components/Search';

export default class App extends React.Component {
  state = {
    loading: true,
    isRefreshing: false,
    articles: [],
    searchText: '',
    category: ''
  };

  componentDidMount() {
    this.loadArticles(this.state.category);
  }

  loadArticles = async (searchTerm, category = '') => {
    this.setState({ articles: [], loading: true });
    var resultArticles = [];
    if (category === '') {
      resultArticles = await APIRequest.requestSearchPosts(searchTerm);
    } else {
      resultArticles = await APIRequest.requestCategoryPosts(category);
    }
    console.log(resultArticles);
    this.setState({
      loading: false,
      refreshing: true,
      articles: resultArticles
    });
  };

  render() {
    const { articles, loading, isRefreshing } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          {/* move header to its own component? */}
          <View>
            <View style={styles.headerContainer}>
              <Image source={Images.logo} style={styles.headerImage} />
            </View>
            <Search reload={this.loadArticles} />
            {loading ? (
              <ActivityIndicator size="large" />
            ) : (
              // TODO: center this when list is loading
              <News
                articles={articles}
                reload={this.loadArticles}
                isRefreshing={isRefreshing}
              />
            )}
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    margin: Metrics.overallMargin
  },

  headerContainer: {
    width: Metrics.screenWidth - 2 * Metrics.overallMargin,
    height: 100
  },

  headerImage: {
    flex: 1,
    height: undefined,
    width: undefined,
    resizeMode: 'contain'
  }
});
