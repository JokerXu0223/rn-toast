/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View } from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

// utils
import Toast from './utils/toast';

// components
import Button from './components/Button';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <View style={styles.welcome}>
          <Button
            text="点我"
            onPress={() => alert(123)}
          />
        </View>
        <View style={styles.welcome}>
          <Button
            text="加载Toast"
            onPress={() => Toast.showLoading('加载中...')}
          />
        </View>
        <View style={styles.welcome}>
          <Button
            text="成功Toast"
            onPress={() => Toast.showSuccess('成功！')}
          />
        </View>
        <View style={styles.welcome}>
          <Button
            text="失败Toast"
            onPress={() => Toast.showError('失败！')}
          />
        </View>
        <View style={styles.welcome}>
          <Button
            text="警告Toast"
            onPress={() => Toast.showWarning('警告！')}
          />
        </View>
        <View style={styles.welcome}>
          <Button
            text="文字Toast"
            onPress={() => Toast.showText('文字！')}
          />
        </View>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
    paddingHorizontal: 30,
  },
  welcome: {
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
