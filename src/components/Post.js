import React, { Component } from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Modal, TextInput, FlatList, Image} from 'react-native';
import { db, auth } from '../firebase/config';
import firebase from 'firebase'
import AwesomeAlert from 'react-native-awesome-alerts';
import Likear from './likear'

class Post extends Component{
    constructor(props){
        super(props);
        this.state = {
            showAlert : false,
            likes: 0,
            myLike: false,
            showModal: false,
            comentario: '',
            user: this.props.user
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
        db.collection("posts").doc(this.props.postData.id).delete()
        .then(()=>{

           console.log( this.props.postData.data)
        })
        .catch(error => console.log(error))
    
    }
    showModal(){
        this.setState({
            showModal: true
        })
    }
    hideModal(){
        this.setState({
            showModal: false
        })
    }
    guardarComentario(){
        let comentario = {
            createdAt: Date.now(),
            autor: auth.currentUser.email,
            texto: this.state.comentario
        }
        db.collection('posts').doc(this.props.postData.id).update({
            comentarios: firebase.firestore.FieldValue.arrayUnion(comentario)
        })
        .then(() => {
            this.setState({
                comentario: ''
            })
        })
    }
  
    
   
render(){
   console.log(this.props.postData)
    return(
        <View style={styles.contanier}>
             {
            this.props.postData.data.owner === this.props.user.email ?
            <React.Fragment>
                <TouchableOpacity style={styles.borrar} onPress={()=> this.showAlert()}> 
                <Text>Borrar posteo</Text>
                </TouchableOpacity>
            </React.Fragment>
      
           :
           <Text></Text>
        }
         
        <Image style={styles.foto} source={{uri: this.props.postData.data.foto}} resizeMode='contain'/>
        <Text style={styles.input}>user: {this.props.postData.data.owner} </Text> 
        <Text style={styles.input}>Comentario: {this.props.postData.data.texto}</Text>
        <Text style={styles.input}>Likes: {this.state.likes} </Text>
        
        {/* likear componente */}
        <Likear likear={()=>this.likear()} desLikear={()=>this.desLikear()} like={this.state.likes} myLike={this.state.myLike}/>
       
        
        <TouchableOpacity onPress={() => this.showModal()}>
            <Text style={styles.input}>Ver/ agregar comentarios</Text>
        </TouchableOpacity>
        {
            this.state.showModal ?
            <Modal style={styles.containerModal} visible={this.state.showModal} animationType='slide' transparent={false}>
                <View style={styles.modal}>
                    <TouchableOpacity onPress={() => this.hideModal()}>
                        <Text style={styles.cerrarModal}>X</Text>
                    </TouchableOpacity>
                    <Text style={styles.title}>Comentarios</Text>

                    <FlatList data={this.props.postData.data.comentarios} keyExtractor={(comentario) => comentario.createdAt.toString()} renderItem={({item}) => <Text style={styles.tt}>{item.autor}: {item.texto}</Text>}/>

                    <View>
                        
                        { this.props.postData.data.comentarios == null ?
                        <Text>Aún no hay comentarios. Sé el primero en opinar.</Text>
                        :
                        <Text></Text>
                        }
                        <TextInput style={styles.field} placeholder='Comentar..' keyboardType='default' multiline onChangeText={text => this.setState({comentario: text})} value={this.state.comentario}/>
                        { this.state.comentario == '' ?
                        <TouchableOpacity style={styles.comentarNo} disabled={true} onPress={() => this.guardarComentario()}>
                            <Text style={styles.textoBoton}>Guardar comentario</Text>
                        </TouchableOpacity>    
                        :
                        <TouchableOpacity style={styles.comentar} onPress={() => this.guardarComentario()}>
                            <Text style={styles.textoBoton}>Guardar comentario</Text>
                        </TouchableOpacity>
                        }
                        
                    </View>
                </View>
            </Modal>
            :
            <Text></Text>
        }
        <AwesomeAlert
            style={{"zIndex":999}}
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
        width:'15%',
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
    },
    foto: {
        flex: 1,
        height: 300,
        marginBottom: 8
    },
    title:{
        textAlign:'center',
        fontFamily:'Comic Sans',
        fontSize:"x-large",
        color:'#5B88FA',
        marginBottom: 40
    },
    containerModal: {
        width: '97%',
        borderRadius: 4,
        padding: 5,
        alignSelf: 'center',
        boxShadow: '0 0 0 #ccc',
        marginTop: 20,
        marginBottom: 10
    },
    cerrarModal: {
        color: '#fff',
        padding: 5,
        backgroundColor:'#dc3545',
        alignSelf: 'flex-end',
        borderRadius: 4,
        paddingHorizontal: 8,
        marginBottom: 10
    },
    field: {
        height: 50,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical: 10,
        backgroundColor:'#EEECEC',
        marginTop: 20
    },
    comentarNo: {
        backgroundColor:"#9DCFFC",
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor:"#ccc"
    },
    comentar: {
        backgroundColor:"#5B88FA",
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor:"#ccc"
    },
    textoBoton: {
        color: '#fff'
    },
    modal: {
        width: '80%',
        borderRadius:4,
        borderColor: "#ccc",
        borderWidth: 1,
        padding: 10,
        alignSelf: 'center',
        marginTop: 30
    },
    tt: {
        marginVertical: 2
    }

})


export default Post