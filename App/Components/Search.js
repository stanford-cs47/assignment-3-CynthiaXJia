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
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { Metrics, Colors } from '../Themes';
import { FontAwesome } from '@expo/vector-icons';

const Search = props => {
  const [text, setText] = React.useState('');

  const reloadArticles = () => {
    setText('');
    props.reload(text);
  };

  return (
    <View style={styles.container}>
      <TextInput
        onChangeText={text => setText(text)}
        onSubmitEditing={reloadArticles}
        value={text}
        style={styles.textIn}
        placeholder={'Search for news'}
      ></TextInput>

      <TouchableOpacity onPress={reloadArticles}>
        <FontAwesome name="search" size={22} />
      </TouchableOpacity>
      {/* TODO: dismiss keyboard with Keyboard.dismiss */}
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 6,
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 15
  },
  textIn: {
    flex: 1,
    alignSelf: 'stretch'
  }
});
