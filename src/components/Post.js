import React, { Component } from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Modal, TextInput, FlatList} from 'react-native';
import { db, auth } from '../firebase/config';
import firebase from 'firebase'

class Post extends Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }


   

render(){
    return(
        <View style={styles.contanier}>
        <Text>user: {this.props.postData.data.owner} </Text>  
        <Text>Texto del post: {this.props.postData.data.texto}</Text>
        <Text>Likes:{this.state.likes} </Text> 


        <Text>Like</Text>
        <Text>Quirar Like</Text>
        </View>
 )   
}
}
const styles = StyleSheet.create({
    contanier:{
        marginBottom: 20,
        borderRadius:4,
        borderColor: "#ccc",
        borderWidth: 1,
        padding: 10,
    },
    
  

})


export default Post