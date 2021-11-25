import React, {Component} from 'react';
import {Text, TouchableOpacity, View, StyleSheet, Image, ActivityIndicator, FlatList, TextInput} from 'react-native';
import { db, auth } from '../firebase/config';
import MyCamera from '../components/MyCamera'

class PostForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            textoPost: '',
            mostrarCamara: true,
            url: ''
        }
    }
    submitPost(){
        db.collection('posts').add({
            owner: auth.currentUser.email,
            texto: this.state.textoPost,
            createdAt: Date.now(),
            foto: this.state.url
        })
        .then(() => {
            this.setState({
                textoPost: ''
            })
            this.props.drawerProps.navigation.navigate('Home')
        })
        .catch(error => console.log(error))
    }
    imageUpload(url){
        this.setState({
            mostrarCamara: false,
            url: url
        })
    }
    render(){
        return(
            <View style={styles.containerView}>
                {this.state.mostrarCamara ?
                <MyCamera imageUpload={(url) => this.imageUpload(url)}/>
                :
                <View style={styles.container}>
                    <Text style={styles.title}>Agregar texto al posteo</Text>
                    <TextInput style={styles.field} keyboardType='default' placeholder='Escribir aquí' onChangeText={text => this.setState({textoPost: text})} multiline value={this.state.textoPost} />
                    {this.state.textoPost == '' ? 
                    <TouchableOpacity style={styles.botonUnable} onPress={() => this.submitPost()}>
                        <Text style={styles.textoBoton}>Guardar</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={styles.boton} onPress={() => this.submitPost()}>
                        <Text style={styles.textoBoton}>Guardar</Text>
                    </TouchableOpacity>
                    }
                    
                </View>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        marginTop: 20
    },
    containerView: {
        flex: 1
    },
    title:{
        textAlign:'center',
        fontFamily:'Comic Sans',
        fontSize:"x-large",
        color:'#5B88FA',
        marginBottom: 40
    },
    field: {
        height: 100,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical: 10
    },
    boton: {
        backgroundColor:"#5B88FA",
        paddingHorizontal:10,
        paddingVertical:6,
        textAlign:"center",
        borderRadius:4,
        borderWidth:1,
        borderColor:"#ccc"
    },
    botonUnable: {
        backgroundColor:"#9DCFFC",
        paddingHorizontal:10,
        paddingVertical:6,
        textAlign:"center",
        borderRadius:4,
        borderWidth:1,
        borderColor:"#ccc"
    },
    textoBoton: {
        color: '#fff'
    }
})

export default PostForm