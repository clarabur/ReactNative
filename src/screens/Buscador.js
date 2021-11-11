import React, {Component} from "react";
import {Text, View, TouchableOpacity, TextInput, FlatList} from "react-native"
import {StyleSheet} from 'react-native'
import Post from "../components/Post";
import {db, auth} from '../firebase/config'

class Register extends Component{
    constructor(){
        super()
        this.state={
            search: '',
            posteos: [], 
            resultados: false

        }
    }
    buscar(){
        db.collection('posts').where('owner', '==', this.state.search).orderBy('createdAt', 'asc').onSnapshot(
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
                    posteos: post,
                    resultados: true
                })
            }
        )
        
        
        

    }
    
    render(){
        return(
            <React.Fragment >
            <View style={styles.container}>
                <Text style={styles.title}>Buscar Posts</Text>
                <Text>{this.state.resultados}</Text>
                <TextInput 
                        style={styles.input}
                        keyboardType='default'
                        placeholder='search'
                        onChangeText={ text => this.setState({search: text})}/>

             
                
                { this.state.search === "" ?
                <TouchableOpacity style={styles.buttonUnable} >
                <Text style={styles.textButton}>Buscar</Text>
                </TouchableOpacity>:
                <TouchableOpacity style={styles.button} onPress={()=>this.buscar()} >
                    <Text style={styles.textButton}>Buscar</Text>
                </TouchableOpacity>
                }
                
               
            </View>
            <View style={styles.subcontainer}>
                { this.state.posteos.length === 0 && this.state.resultados ?
            
                    <Text style={styles.title}>No hay resultados</Text>:
                   
                    <FlatList
                    data={this.state.posteos}
                    keyExtractor={post => post.id}
                    renderItem={ ({item}) => <Post postData={item} />}
                    />
                    
                }
            
            </View>
            </React.Fragment >
        )
    }
}
const styles = StyleSheet.create({
   
    title:{
        textAlign:'center',
        fontFamily:'Comic Sans',
        fontSize:"x-large",
        color:'#5B88FA'
    },
    container:{
        paddingHorizontal:10,
        marginTop:20,
        borderColor:"#ccc",
        backgroundColor:'white',
        borderStyle:'solid',
        flex:2,
        justifyContent:'center',
        alignContent:'center',
        marginHorizontal:'25%',
        borderWidth:1,
        marginBottom:20
     
    },
    subcontainer:{
        flex:4

    },
    input:{
        height:20,
        paddingVertical:15,
        paddingHorizontal:10,
        borderWidth:1,
        borderColor:"#ccc",
        borderStyle:"solid",
        borderRadius:6,
        marginVertical:10,
        backgroundColor:'#EEECEC'
    },
    button:{
        backgroundColor:"#5B88FA",
        paddingHorizontal:10,
        paddingVertical:6,
        textAlign:"center",
        borderRadius:4,
        borderWidth:1,
        borderColor:"#ccc"
    },
    textButton:{
        color:'white'
    },
    buttonUnable:{
        backgroundColor:"#9DCFFC",
        paddingHorizontal:10,
        paddingVertical:6,
        textAlign:"center",
        borderRadius:4,
        borderWidth:1,
        borderColor:"#ccc"

    }
})

export default Register