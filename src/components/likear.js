import React, { Component } from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Modal, TextInput, FlatList, Image} from 'react-native';
import { db, auth } from '../firebase/config';
import firebase from 'firebase'
import AwesomeAlert from 'react-native-awesome-alerts';

class Likear extends Component{
    constructor(props){
        super(props)
        this.state={
            

        }
    }
    render(){
        return(
            <View>
             {
            this.props.myLike === false ?
            <TouchableOpacity style={styles.likeButton} onPress={()=> this.props.likear()}>
                <Text styles={styles.textButton}>Like</Text>
            </TouchableOpacity> :

            <TouchableOpacity style={styles.likeButton} onPress={()=>this.props.desLikear()}>
                <Text styles={styles.textButton}>Unlike</Text>
            </TouchableOpacity>
            }
            </View>
        )
    }
}
const styles = StyleSheet.create({
    likeButton:{
        backgroundColor:"#F05B5B",
        paddingHorizontal:10,
        paddingVertical:6,
        textAlign:"center",
        borderRadius:4,
        borderWidth:1,
        borderColor:"#ccc",
        width:'15%',
    },
    textButton:{
        color:'red'
    },
})
export default Likear