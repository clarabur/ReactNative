import React, {Component} from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {auth} from "../firebase/config"
import Register from "../screens/Register";
import Login from "../screens/Login";
import Home from '../screens/Home'
import Perfil from "../screens/Perfil";
import Buscador from "../screens/Buscador";

const Drawer = createDrawerNavigator();
class Menu extends Component{
    constructor(){
        super()
        this.state={
            loggedIn: false,
            user: "",
            errorMessage: '',
            errorCode:'',
            errorMessageRegister: ''
        }
    }
    componentDidMount(){
        auth.onAuthStateChanged(user => {
            if(user){
                this.setState({
                    loggedIn: true,
                    user: user
                })
            }
        })
    }
    register(email, pass){
        auth.createUserWithEmailAndPassword(email, pass)
        .then((response)=>{
            this.setState({
                loggedIn: true
            })
        })
        .catch(error => {
            console.log(error)
            this.setState({
                errorMessageRegister: error.message

            })
        })
    }
    login(email, pass){
        auth.signInWithEmailAndPassword(email, pass)
        .then((response) => {
           console.log (response)
           this.setState({
               loggedIn: true,
               user: response.user
           })
        })
        .catch (error => {
          console.log (error)
          this.setState({
            errorMessage: error.message,
            errorCode: error.code
          })
        })
    }
    logout(){
        auth.signOut()
        .then(()=> {
            this.setState({
                loggedIn: false,
                user: '',
            })
        })
    }  
    render(){
        return(
            <NavigationContainer>
                
                <Drawer.Navigator>
                    {this.state.loggedIn == false ?
                    <React.Fragment>
                        <Drawer.Screen name='Login' component={() => <Login login={(email, pass) => this.login(email, pass)} errorMessage={this.state.errorMessage} errorCode={this.state.errorCode}/>} />
                        <Drawer.Screen name='Registro' component={() => <Register register={(email, pass) => this.register(email, pass)} errorMessageRegister={this.state.errorMessageRegister}/>} />
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <Drawer.Screen name='Home' component={() => <Home />} />
                        <Drawer.Screen name='Perfil' component={() => <Perfil logout={()=> this.logout()} user={this.state.user}/>} />
                        <Drawer.Screen name='Buscador' component={() => <Buscador />} />
                    </React.Fragment>
                    }
                </Drawer.Navigator>

            </NavigationContainer>
        )
    }
}
export default Menu