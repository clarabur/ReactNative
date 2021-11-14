import React, {Component} from "react";
import {Text, TouchableOpacity, View, StyleSheet, Image, ActivityIndicator, FlatList, TextInput} from 'react-native';
import {auth, db} from '../firebase/config'
<<<<<<< HEAD
import Post from "../components/Post";

=======
import Post from '../components/Post'
>>>>>>> 4bbf382edeea4d26c3566fab6a4d2ee1ea469658

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
<FlatList
data={this.state.posteos}
keyExtractor={post => post.id}
renderItem={ ({item}) => <Post postData={item} />}

/>



        </View>
    )
}
}


const styles = StyleSheet.create({
    container:{
        paddingHorizontal: 10,
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