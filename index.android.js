/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  AsyncStorage
} from 'react-native';

export default class TodoList extends Component {
  state = {text: '', todos: []};
  constructor(props) {
    super(props)
    
  }
  async componentWillMount() {
    await AsyncStorage.getItem('todos', (err, result) => {
      if (result != null) {
        this.setState({todos: result.split(',')})
      }
    })
  }
  remove = (i) => {
    //that=this
    return ()=>{
      this.state.todos.splice(i, 1)
      AsyncStorage.setItem('todos', this.state.todos.toString())
      this.forceUpdate()
    }
  }
  add = () => {
    this.state.todos.push(this.state.text)
    AsyncStorage.setItem('todos', this.state.todos.toString())
    this.setState({text: ''})
    this.forceUpdate()
  }
  render = () => {
    return (
      <View style = {{flex: 1}}>
        <View style = {styles.header}>
          <Text style = {styles.headerText}>Todo List</Text>
        </View>
        <View style = {styles.body}>
          <Image source={require('./clipboard.png')} style = {{width: '100%', height: '15%'}} />
          <ScrollView>
            {(() => {
              let answer=[]
              counter = 1
              if (this.state.todos == null) {
                return null
              }
              for (i of this.state.todos) {
                answer.push(<View key = {counter} style = {styles.listItem}>
                              <TouchableOpacity style = {styles.removeButton} onPress = {this.remove(counter-1)}>
                                <Text style = {{color: 'white'}}>X</Text>
                              </TouchableOpacity>
                              <Text style = {{fontSize: 20}}>{counter}. {i}</Text>
                            </View>)
                counter++
              }
              return answer
            })()}
          </ScrollView>
          <TextInput
            style={styles.textbox}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
            placeholder='Enter a todo'
          />
          <TouchableOpacity style = {styles.addButton} onPress = {this.add}><Text style = {{color: 'white'}}>+</Text></TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0E0',
    elevation: 50
  },
  headerText: {
    fontSize: 30,
    justifyContent: 'center'
  },
  body: {
    flex: 5,
    width: '90%',
    marginTop: 10,
    marginBottom: 10,
    padding: 30,
    alignSelf: 'center',
    backgroundColor: 'white',
    borderColor: 'rgb(240,240,240)',
    borderWidth: 5,
    borderStyle: 'dashed',
    borderRadius: 20,
  },
  listItem: {
    borderStyle: 'solid',
    borderBottomColor: 'rgb(100,100,100)',
    borderBottomWidth: 3,
    marginTop: 10,
    flex: 1,
    flexDirection: 'row'
  },
  removeButton: {
    width: 30,
    height: 30,
    backgroundColor: 'red',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  },
  addButton: {
    width: 50,
    height: 50,
    backgroundColor: 'green',
    borderRadius: 120,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    margin: 10
  },
  textbox: {
    height: 50
  }
});

AppRegistry.registerComponent('TodoList', () => TodoList);
