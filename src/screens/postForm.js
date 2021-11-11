import React, {Component} from 'react';
import {Text, TouchableOpacity, View, StyleSheet, Image, ActivityIndicator, FlatList, TextInput} from 'react-native';
import { db, auth } from '../firebase/config';
import MyCamera from '../components/MyCamera'

class PostForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            textoPost: '',
            mostrarCamara: '',
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
            <View>
                {this.state.mostrarCamara ?
                <MyCamera imageUpload={(url) => this.imageUpload(url)}/>
                :
                <View>
                    <TextInput keyboardType='default' placeholder='Escribir aquí' onChangeText={text => this.setState({textoPost: text})} multiline value={this.state.textoPost} />
                    <TouchableOpacity onPress={() => this.submitPost()}>
                        <Text>Guardar</Text>
                    </TouchableOpacity>
                </View>
                }
            </View>
        )
    }
}

export default PostForm