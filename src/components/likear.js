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
            <TouchableOpacity style={styles.containLike} onPress={()=> this.props.likear()}>
                
                <Image style={styles.iconLike}
                        source={{uri:'https://img.icons8.com/ios/48/000000/like--v1.png'}}
                        resizeMode='contain'
                        
                 />
                
            </TouchableOpacity> :

            <TouchableOpacity style={styles.containLike} onPress={()=>this.props.desLikear()}>
                <Image style={styles.iconLike}
                        source={{uri:'https://img.icons8.com/color/48/000000/like--v1.png'}}
                        resizeMode='contain'
                        
                 />
              
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
    iconLike:{
        height:50,
        marginLeft:0
    },
    containLike:{
        width:40
       
        
    }
})

export default Likear