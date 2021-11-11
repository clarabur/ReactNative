import React, { Component } from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Modal, TextInput, FlatList} from 'react-native';
import { db, auth } from '../firebase/config';
import firebase from 'firebase'

class Post extends Component{
    constructor(props){
        super(props);
        this.state = {
           
         
           likes: 0,
           myLike: false
        }
    }
    componentDidMount(){
        if(this.props.postData.data.likes){
            this.setState({
                likes: this.props.postData.data.likes.length,
                myLike: this.props.postData.data.likes.includes(auth.currentUser.email)
            })
        }
    }
    likear(){
        db.collection("posts").doc(this.props.postData.id).update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
        .then(()=>{
            this.setState({
                likes: this.state.likes + 1,
                myLike: true
            })
        })
    }
    desLikear(){
        db.collection("posts").doc(this.props.postData.id).update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
        .then(()=>{
            this.setState({
                likes: this.state.likes - 1,
                myLike: false
            })
        })
        .catch(error => console.log(error))
    }


   
render(){
    return(
        <View style={styles.contanier}>
        <Text>user: {this.props.postData.data.owner} </Text>  
        <Text>Likes: {this.state.likes}</Text>
        {
            this.state.myLike === false ?
            <TouchableOpacity style={styles.likeButton} onPress={()=> this.likear()}>
                <Text styles={styles.textButton}>Like</Text>
            </TouchableOpacity> :

            <TouchableOpacity style={styles.likeButton} onPress={()=>this.desLikear()}>
                <Text styles={styles.textButton}>Unlike</Text>
            </TouchableOpacity>
        }
      



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
    likeButton:{
        backgroundColor:"#F05B5B",
        paddingHorizontal:10,
        paddingVertical:6,
        textAlign:"center",
        borderRadius:4,
        borderWidth:1,
        borderColor:"#ccc",
        width:'25%'
    },
    textButton:{
        color:'white'
    },
  

})


export default Post