import React, {Component} from "react";
import {Text, TouchableOpacity, View, StyleSheet, Image, ActivityIndicator, FlatList, TextInput} from 'react-native';
import { db, auth } from '../firebase/config';
import firebase from 'firebase'

class Perfil extends Component{
    constructor(props){
        super(props);
        this.state={
            user: this.props.user,
            email: this.props.email,
           password:this.props.password,
           posteos:[],
        }
       
    } 


    componentDidMount() {
        db.collection('post').orderBy('createdAt','asc').onSnapshot(
            docs => {
                let post = []
                docs.forEach(doc => {
                    post.push({
                        id: doc.id,
                        data: doc.data(),
                    })
                })
                console.log(post)
    
                this.setState({
                    posteos: post
                })
            }
        )
    }
    //borrar posteo
    borrarPosteo(){
        db.collection("posts").doc(this.props.postData.id).delete({
            posteos: firebase.firestore.FieldValue.arrayUnion(oneComment)
        })
        .then(()=>{
            this.setState({
                posteos:this.props.postData.data.posteos.length
            })
        })
    }
   
    render(){
        return(
           <View>
            <Text style={styles.input}>Usuario registrado: {this.props.user.user} </Text>
            <Text style={styles.input}>Email registrado: {this.props.user.email} </Text>
            <Text style={styles.input}>Ultimo ingreso: {this.props.user} </Text>
            

            <View style={styles.container}>

<FlatList
data={this.state.posteos}
keyExtractor={post => post.id}
renderItem={ ({item}) => <Post postData={item} />}
/>
 </View>

 <TouchableOpacity onPress={()=> this.borrarPosteo()}> 
    <Text style={styles.borrar} > Borrar Posteo </Text>
</TouchableOpacity> 



            <TouchableOpacity  style={styles.enter} onPress={()=> this.props.logout(this.state.email, this.state.password)  }>
              <Text style={styles.texto}>
                Logout
               </Text>
            </TouchableOpacity>  


       
  
        </View>
//cantidad de posteos de ese usuario
//todos los posteos cargos por el usuario
//permitir borrar los posteos

)


}
}
const styles = StyleSheet.create({
    input:{
        height:20,
        paddingVertical:15,
        paddingHorizontal:10,
        borderStyle: "solid",
        borderRadius: 6,
        marginVertical: 10,
        color:'#5B88FA'

    },
    
    container:{
        paddingHorizontal: 10,
    },

    enter:{
        backgroundColor: 'red',
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
},

borrar: {
        
    color: '#fff',
    padding:5,
    backgroundColor :'#dc3545',
    alignSelf: 'flex-end',
    borderRadius: 4,
    paddingHorizontal: 8,
    
},
})


export default Perfil