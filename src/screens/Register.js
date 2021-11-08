import React, {Component} from "react";
import {Text, View, TouchableOpacity, TextInput} from "react-native"


class Register extends Component{
    constructor(props){
        super(props)
        this.state={
            user:"",
            email:"",
            password:""

        }
    }

    render(){
        return(
            <View>
                <Text>Registracion</Text>
                <TextInput
                    keyboardType='default'
                    placeholder='nombre de usuario'
                    onChangeText={text => this.setState({user:text})}
                />
                 <TextInput
                    keyboardType='email-address'
                    placeholder='email'
                    onChangeText={text => this.setState({email:text})}
                />
                 <TextInput
                    keyboardType='default'
                    placeholder='contraseña'
                    secureTextEntry={true}
                    onChangeText={text => this.setState({password:text})}
                />
                { this.state.user === "" || this.state.email === "" || this.state.password === "" ?
                <Text></Text>:
                <TouchableOpacity onPress={()=>this.props.register(this.state.email, this.state.password)}>
                    <Text>Registrate</Text>
                </TouchableOpacity>
                }
            </View>
        )
    }
}

export default Register