import React, {Component} from "react";
import {auth} from "../firebase/config"
import Register from "../screens/Register";

class Menu extends Component{
    constructor(){
        super()
        this.state={
            loggedIn: false,
            user: ""
            
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
    render(){
        return(
            <Register register={(email, pass)=>this.register(email,pass)}/>
        )
    }
}
export default Menu