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
            <View style={styles.container}>
                {this.state.permission ?
                    this.state.mostrarCamara == false ?
                    <React.Fragment>
                        <Image style={styles.cameraBody} source={{uri: this.state.foto}}/>
                        <View style={styles.juntos}>
                            <TouchableOpacity style={styles.botonJunto} onPress={() => this.guardarFoto()}>
                                <Text style={styles.textoBoton}>Aceptar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.botonJunto} onPress={() => this.borrarFoto()}>
                                <Text style={styles.textoBoton}>Rechazar</Text>
                            </TouchableOpacity>
                        </View>
                    </React.Fragment>
                    :
                    <View style={styles.container}>
                        <Camera style={styles.cameraBody} type={Camera.Constants.Type.back} ref={reference => this.camera = reference}/>
                        <TouchableOpacity style={styles.boton} onPress={() => this.sacarFoto()}>
                            <Text style={styles.textoBoton}>Sacar foto</Text>
                        </TouchableOpacity>
                    </View>
                :
                <Text>No tenes permisos para usar la cámara</Text>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    cameraBody: {
        flex: 7
    },
    boton: {
        justifyContent: 'center',
        alignContent: 'center',
        height: 2,
        flex: 0.5,
        backgroundColor:"#5B88FA",
        paddingHorizontal:10,
        paddingVertical:1,
        textAlign:"center",
        borderRadius:4,
        borderWidth:1,
        borderColor:"#ccc"
    },
    textoBoton: {
        color: '#fff'
    },
    juntos: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row'
    },
    botonJunto: {
        justifyContent: 'center',
        alignContent: 'center',
        height: 30,
        flex: 0.5,
        backgroundColor:"#5B88FA",
        paddingHorizontal:10,
        paddingVertical:1,
        textAlign:"center",
        borderRadius:4,
        borderWidth:1,
        borderColor:"#ccc",
        width: '48%'
    }
})

export default MyCamera