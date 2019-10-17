/*
 *
 * Assignment 3
 * Starter Files
 *
 * CS47
 * Oct, 2018
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types'; //consider using this!
import {
  StyleSheet,
  SafeAreaView,
  View,
  FlatList,
  Text,
  Linking,
  TouchableOpacity
} from 'react-native';
import { material } from 'react-native-typography';
import { Metrics, Colors } from '../Themes';

const Article = props => {
  const { title, summary, author, date, url } = props;
  return (
    <TouchableOpacity onPress={() => Linking.openURL(url)}>
      <View style={styles.article}>
        <Text style={material.headline}>{title}</Text>
        <Text>{summary}</Text>
        {/* TODO: get author to be capitalized?? */}
        <Text style={[material.body2, { textTransform: 'capitalize' }]}>
          {author}
        </Text>
        <Text>{date}</Text>
      </View>
    </TouchableOpacity>
  );
};

const News = props => {
  const { articles, reload, isRefreshing } = props;

  return (
    <View style={styles.container}>
      <FlatList
        data={articles}
        renderItem={({ item }) => (
          <Article
            title={item.title}
            summary={item.snippet}
            author={item.byline}
            date={item.date}
            url={item.url}
          />
        )}
        keyExtractor={item => item.url}
        // onEndReachedThreshold={0.2}
        // onEndReached={reload}
        onRefresh={() => reload()}
        refreshing={isRefreshing}
      ></FlatList>
    </View>
  );
};

News.defaultProps = {
  articles: []
};

News.propTypes = {
  articles: PropTypes.array
};

export default News;

const styles = StyleSheet.create({
  container: {},
  article: { marginTop: 15, marginBottom: 15 }
});
