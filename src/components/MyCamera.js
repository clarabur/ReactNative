import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {Camera} from 'expo-camera';
import {db, storage} from '../firebase/config';
import { log } from 'react-native-reanimated';

class MyCamera extends Component{
    constructor(props){
        super(props)
        this.state = {
            permission: false,
            foto: '',
            mostrarCamara: true
        }
        this.camera;
    }
    componentDidMount(){
        Camera.requestCameraPermissionsAsync()
        .then(() => {
            this.setState({
                permission: true
            })
        })
        .catch(error => console.log(error))
    }
    sacarFoto(){
        this.camera.takePictureAsync()
        .then((foto) => {
            this.setState({
                foto: foto.uri,
                mostrarCamara: false
            })
        })
        .catch(error => console.log(error))
    }
    guardarFoto(){
        fetch(this.state.foto)
        .then(res => res.blob())
        .then(image => {
            const ref = storage.ref(`fotos/${Date.now()}.jpg`)
            ref.put(image)
            .then(() => {
                ref.getDownloadURL()
                .then(url => {
                    this.props.imageUpload(url)
                    this.setState({
                        foto: ''
                    })
                })
                .catch(error => console.log(error))
            })
            .catch(error => console.log(error))
        })
    }
    borrarFoto(){
        this.setState({
            foto: '',
            mostrarCamara: true
        })
    }
    render(){
        return(
            <View>
                {this.state.permission ?
                    this.state.mostrarCamara == false ?
                    <React.Fragment>
                        <Image source={{uri: this.state.foto}}/>
                        <View>
                            <TouchableOpacity onPress={() => this.guardarFoto()}>
                                <Text>Aceptar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.borrarFoto()}>
                                <Text>Rechazar</Text>
                            </TouchableOpacity>
                        </View>
                    </React.Fragment>
                    :
                    <View>
                        <Camera type={Camera.Constants.Type.back} ref={reference => this.camera = reference}/>
                        <TouchableOpacity onPress={() => this.sacarFoto()}>
                            <Text>Sacar foto</Text>
                        </TouchableOpacity>
                    </View>
                :
                <Text>No tenes permisos para usar la cámara</Text>
                }
            </View>
        )
    }
}

export default MyCamera