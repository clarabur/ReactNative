import React, {Component} from "react";
import {Text, TouchableOpacity, View, TextInput} from 'react-native';
import {StyleSheet} from 'react-native'
class Login extends Component{
    constructor(props){
        super(props);
        this.state={
        email: '',
       
        password:'',

      

        }
       
    } 
 render(){
     return (
        <View style={styles.page}>
       <View style={ styles.container}>
           <Text style={styles.title} >Login </Text>
           <TextInput 
           style={styles.input}
           keyboardType='email-address'
           placeholder='email'
           onChangeText={ text => this.setState({email: text})}/>
          
          
           <TextInput 
           style={styles.input}
           keyboardType='default'
           placeholder='contraseña'
           secureTextEntry={true}
           onChangeText={ text => this.setState({password: text})}
           />
 
 { this.state.email === "" || this.state.password === "" ?
                <TouchableOpacity style={styles.buttonUnable} >
                <Text style={styles.textButton}>Login</Text>
                </TouchableOpacity>:
                <TouchableOpacity style={styles.button} onPress={()=>this.props.login(this.state.email, this.state.password)}>
                    <Text style={styles.textButton}>Login</Text>
                </TouchableOpacity>
                }
                 <Text style={styles.errorText}>{this.props.errorMessage}</Text>

 
 
 
</View>  
</View>  
     )
 }

}


const styles = StyleSheet.create({
    page:{
        backgroundColor:"#EEECEC",
        flex:1

    },
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
    errorText:{
        textAlign:'center',
        fontFamily:'Comic Sans',
        fontSize:"large",
        color:'red',
        marginTop:1

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
export default Login

