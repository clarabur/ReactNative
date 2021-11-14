import React, {Component} from "react";
import {Text, TouchableOpacity, View, StyleSheet, Image, ActivityIndicator, FlatList, TextInput} from 'react-native';
import {auth, db} from '../firebase/config'
import Post from "../components/Post";


class Home extends Component {
    constructor(){
        super();
        this.state={
           posteos: [],
        }
}
componentDidMount() {
    db.collection('posts').orderBy('createdAt','desc').onSnapshot(
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
render (){
    return(
        <View style={styles.container}>
            {
                this.state.posteos.length === 0 ?
                <ActivityIndicator></ActivityIndicator>:
            
                <FlatList
                data={this.state.posteos}
                keyExtractor={post => post.id}
                renderItem={ ({item}) => <Post user={this.props.user} postData={item} />}

                />
            }



        </View>
    )
}
}


const styles = StyleSheet.create({
    container:{
        paddingHorizontal: 10,
        flex:1
    },
    image: {
        height:250,
    },
    touchable:{
        backgroundColor: 'red',
        borderRadius: 4,

    },
    formulario:{
       
       marginHorizontal: 10,
       padding: 20,

    },
    field: {
        backgroundColor:'pink',
        borderColor: 'blue',
        borderWidth:1,
        borderStyle:'solid',
        height: 20,
        paddingHorizontal: 10,
        paddingVertical: 10,

    }
     

})
export default Home