import React, {Component} from "react";
import {Text, TouchableOpacity, View, StyleSheet, Image, ActivityIndicator, FlatList, TextInput} from 'react-native';


class Perfil extends Component{
    constructor(props){
        super(props);
        this.state={
            user: this.props.user

        }
       
    } 

    render(){
        return(
           <View>
            <Text>Email registrado: {this.props.userData.email} </Text>
            <Text>Usuario creado el: {this.props.userData.metadata.creationTime} </Text>
            <Text>Ultimo ingreso: {this.props.userData.metadata.lastSignInTime} </Text>
            <TouchableOpacity  style={styles.enter} onPress={()=> this.props.logout(this.state.email, this.state.password)  }>
              <Text style={styles.texto}>
        Logout
    </Text>
        </TouchableOpacity>  
  
        </View>

)


}
}
const styles = StyleSheet.create({
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
}
})


export default Perfil