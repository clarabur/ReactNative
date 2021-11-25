import React, {Component} from "react";
import {Text, TouchableOpacity, View, StyleSheet, Image, ActivityIndicator, FlatList, TextInput, Button} from 'react-native';
import { db, auth } from '../firebase/config';
import firebase from 'firebase'
import Post from "../components/Post";


class Perfil extends Component{
    constructor(props){
        super(props);
        this.state={
            user: this.props.user,
            email: this.props.email,
           password:this.props.password,
           posteos:[],
           showAlert : false
        }
       
    } 


    componentDidMount() {
        db.collection('posts')
        .where ('owner', '==', this.props.user.email)
        .orderBy('createdAt','desc')
        .onSnapshot(
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

    
    render(){
        console.log(this.props)
        return(
            <React.Fragment>
          
           <View style={styles.page}>

             <Text style={styles.input}>Usuario registrado: {this.props.user.displayName} </Text> 
             <Text style={styles.input}>Email registrado: {this.props.user.email} </Text>
             <Text style={styles.input}>Ultimo ingreso: {this.props.user.metadata.creationTime} </Text> 
             <Text style={styles.input}>Cantidad total de posteos:{this.state.posteos.length}  </Text> 


            <View style={styles.container}>

                <FlatList
                data={this.state.posteos}
                keyExtractor={post => post.id}  
                renderItem={ ({item}) => <Post user={this.props.user} postData={item} />}
                />
                
        
                
               
                
                   
            </View>

 
            <TouchableOpacity  style={styles.enter} onPress={()=> this.props.logout(this.state.email, this.state.password)  }>
            <Text style={styles.texto}>
            Logout
            </Text>
            </TouchableOpacity>  


       
  
            </View>
            </React.Fragment>
        




)


}
}
const styles = StyleSheet.create({
    page: {
        flex:1,
        paddingHorizontal:10
    },
    input:{
        height:20,
        paddingVertical:15,
        paddingHorizontal:10,
        borderStyle: "solid",
        borderRadius: 6,
        marginVertical: 10,
        color:'#5B88FA',
    },
    
    container:{
        paddingHorizontal: 10
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
    padding: 5,
    backgroundColor :'#dc3545',
    alignSelf: 'flex-end',
    borderRadius: 4,
    paddingHorizontal: 4,
    marginBottom: 10,    
}

})


export default Perfil