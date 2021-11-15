import React, { Component } from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Modal, TextInput, FlatList} from 'react-native';
import { db, auth } from '../firebase/config';
import firebase from 'firebase'
import AwesomeAlert from 'react-native-awesome-alerts';

class Post extends Component{
    constructor(props){
        super(props);
        this.state = {
           
            posteos:[],
            showAlert : false,
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
    showAlert(){
        this.setState({
            showAlert: true
        })
    }
    hideAlert(){
        this.setState({
            showAlert: false
        })

    }
    //borrar posteo
    borrarPosteo(){
        db.collection("posts").doc(this.props.postData.id).delete({
            posteos: firebase.firestore.FieldValue.arrayUnion()
        })
        .then(()=>{
            this.setState({
                posteos: this.state.posteos.length
            })
        })
        
    
    }
  

   
render(){
    console.log(this.props.postData)
    return(
        <View style={styles.contanier}>
             {
            this.props.postData.data.owner === this.props.user.email ?
            <TouchableOpacity style={styles.borrar} onPress={()=> this.showAlert()}> 
            <Text>Borrar posteo</Text>
            </TouchableOpacity>
        
        //copiar para el mensaje de error
        <AwesomeAlert
        show={this.state.showAlert}
        showProgress ={false}
        title='Borrar posteo'
        message='Desea borrar el posteo'
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="No"
        confirmText="Yes, borrarlo"
        confirmButtonColor="#DD6B55"
        onCancelPressed={() => {
            this.hideAlert();
        }}
        onConfirmPressed={() => {
            this.borrarPosteo();
        }}
        />


      
           :
           <Text></Text>
        }
           
        <Text style={styles.input}>Comentario: {this.props.postData.data.texto}</Text>
        <Text style={styles.input}>Foto: {this.props.postData.data.foto}</Text>
        <Text style={styles.input}>user: {this.props.postData.data.owner} </Text>  
        <Text style={styles.input}>Likes: {this.state.likes}</Text>
        {
            this.state.myLike === false ?
            <TouchableOpacity style={styles.likeButton} onPress={()=> this.likear()}>
                <Text styles={styles.textButton}>Like</Text>
            </TouchableOpacity> :

            <TouchableOpacity style={styles.likeButton} onPress={()=>this.desLikear()}>
                <Text styles={styles.textButton}>Unlike</Text>
            </TouchableOpacity>
        }
        <TouchableOpacity >
                <Text style={styles.input}>Comentar</Text>
            </TouchableOpacity>



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
        width:'15%'
    },
    textButton:{
        color:'red'
    },
  
input:{
   
    padding: 5,
},
borrar: {    
    color: '#fff',
    padding: 5,
    backgroundColor :'#dc3545',
    alignSelf: 'flex-end',
    borderRadius: 4,
    paddingHorizontal: 4,
    marginBottom: 10,    
}


})


export default Post