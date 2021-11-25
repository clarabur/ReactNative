import React, { Component } from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Modal, TextInput, FlatList, Image} from 'react-native';
import { db, auth } from '../firebase/config';
import firebase from 'firebase';

class ComentarModal extends Component{
    constructor(props){
        super(props)
        this.state = {
            comentario: ''
        }
    }
    guardarComentario(){
        let comentario = {
            createdAt: Date.now(),
            autor: auth.currentUser.email,
            texto: this.state.comentario
        }
        db.collection('posts').doc(this.props.id).update({
            comentarios: firebase.firestore.FieldValue.arrayUnion(comentario)
        })
        .then(() => {
            this.setState({
                comentario: ''
            })
        })
    }
    render(){
        return(
            <View>
                {
                    this.props.showModal ?
                    <Modal style={styles.containerModal} visible={this.props.showModal} animationType='slide' transparent={false}>
                        <View style={styles.modal}>
                            <TouchableOpacity onPress={() => this.props.ocultar()}>
                                <Text style={styles.cerrarModal}>X</Text>
                            </TouchableOpacity>
                            <Text style={styles.title}>Comentarios</Text>

                            <FlatList data={this.props.comentarios} keyExtractor={(comentario) => comentario.createdAt.toString()} renderItem={({item}) => <Text style={styles.tt}>{item.autor}: {item.texto}</Text>}/>

                            <View>
                                
                                { this.props.comentarios == null ?
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
            </View>
        )
    }
} 

const styles = StyleSheet.create({
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

export default ComentarModal;