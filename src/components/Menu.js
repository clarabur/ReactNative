import React, {Component} from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {auth} from "../firebase/config"
import Register from "../screens/Register";
import Login from "../screens/Login";
import Home from '../screens/Home'

const Drawer = createDrawerNavigator();
class Menu extends Component{
    constructor(){
        super()
        this.state={
            loggedIn: false,
            user: "",
            errorMessage: '',
            errorCode:'',
            
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
        .catch(error => console.log(error))
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
            
                <Login login={(email, pass) => this.login(email, pass)} errorMessage={this.state.errorMessage} errorCode={this.state.errorCode}/>
                 <Register register={(email, pass) => this.register(email, pass)} errorMessage={this.state.errorMessage} errorCode={this.state.errorCode} />
              
            </NavigationContainer> 


           
        )
    }
}
export default Menu