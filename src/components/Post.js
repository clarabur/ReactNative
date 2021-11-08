import React, { Component } from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Modal, TextInput, FlatList} from 'react-native';
import { db, auth } from '../firebase/config';
import firebase from 'firebase'

class Post extends Component{
    constructor(props){
        super(props);
        this.state = {
           
           showModal: false, //vista del modal
           comment: '', //para limpiar el campo despues de enviar
        }
    }


    showModal(){
        this.setState({
            showModal: true,
        
        })
    }
hideModal(){
    this.setState({
        showModal: false,
    })
}
guardarComentario(){
//creamos el comentario
    let oneComment={
        createdAt: Date.now(),
        autor: auth.currentUser.email,
        comment: this.state.comment

    }
//guardarlo en una colleccion: modificar un documento
    //lo que queremos modificar
    db.collection('posts').doc(this.props.postData.id).update({
       comments: firebase.firestore.FieldValue.arrayUnion(oneComment),
    })
    // conseguir el estado y limpiarlo
.then(()=>{
    this.setState({
        comment: '',
    })
})
    

}
render(){
    return(
        <View style={styles.contanier}>
        <Text>Texto del post: {this.props.postData.data.texto}</Text>
        <Text>user: {this.props.postData.data.owner} </Text>  
        <Text>Likes:{this.state.likes} </Text> 

        <Text>Like</Text>
        <Text>Quirar Like</Text>


        <TouchableOpacity onPress={()=> this.showModal()}> 
    <Text> Ver comentarios</Text>
</TouchableOpacity>


{ this.state.showModal ?
    <Modal
    style={styles.modalConteiner}
    visible= {this.state.showModal}
    animationType= 'slide'
    transparent={false}
    >
<TouchableOpacity onPress={()=> this.hideModal()}> 
    <Text style={styles.cruz}> X</Text>
</TouchableOpacity>  

<FlatList
   data={this.props.postData.data.comments}
   keyExtractor={(comment)=>comment.createdAt.toString()}
   renderItem={({item})=> <Text>{item.author}: {item.comment}</Text>}  
/>

<View>
    <TextInput 
    style={styles.input}
    placeholder="Comentar..."
    keyboardType= 'default'
    multiline
    onChangeText={text => this.setState({comment: text})}
    value={this.state.comment}
    />
<TouchableOpacity 
  style={styles.boton}
onPress={()=> this.guardarComentario()}>
<Text style={styles.texto}> Guardar Comentario</Text>
</TouchableOpacity>

</View>

    </Modal>  :
    <Text></Text>

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
    cruz: {
        
        color: '#fff',
        padding:5,
        backgroundColor :'#dc3545',
        alignSelf: 'flex-end',
        borderRadius: 4,
        paddingHorizontal: 8,
        
    },
    modalConteiner:{
width:'97%',
borderRadius:4,
padding: 5 ,
alignSelf: 'center',
boxShadow:'rgb(204 204 204) 0px 0px 9px 7px',
marginVertical: 10,
marginTop:20,

    },

    input:{
        height:20,
        paddingVertical:15,
        paddingHorizontal:10,
        borderWidth:1,
        borderColor: '#ccc',
        borderStyle: "solid",
        borderRadius: 6,
        marginVertical: 10,
        },
        boton:{
            backgroundColor: '#28a745',
            paddingHorizontal:10,
            paddingVertical: 6,
            textAlign:"center",
            borderRadius: 4,
            borderEndWidth: 1,
            borderStyle: "solid",
            borderColor: '#28a745',  
          },
          texto:{
              color: '#fff',
          }
  

})


export default Post