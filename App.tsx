import React, { useEffect, useState } from 'react';
import { Button, ScrollView, Text, TextInput, View } from 'react-native';
import { styles } from './styles';
import { MMKV } from 'react-native-mmkv';

const storage = new MMKV({id: 'myapp'});

type User = {
  name: string;
  email: string;
}

function App(){
  
  const [dataUser, setDataUser] = useState<User>({ name: "", email: "" });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  
  function handleSave() {
      const data = storage.getString('user');
      
      if (data) {
        const parseData = JSON.parse(data);
        setDataUser(parseData); 
      }

      setDataUser((prevDataUser) => {
        if (!prevDataUser) return { name, email };
          const updatedUser = {
              ...prevDataUser,
              name: prevDataUser.name ? prevDataUser.name + ";" + name + ";" + email + "/n" : name + ";" + email + "/n" ,
              email: prevDataUser.email ? prevDataUser.email + ";" + email + "/n"  : email + "/n" 
              // name : "",
              // email: ""
          };

          storage.set('user', JSON.stringify(updatedUser));

          return updatedUser;
      });
  }


  useEffect(() => {
    fetchUser();
  }, [dataUser]);

  const [user, setUser] = useState<User>()

  function fetchUser(){
    const data = storage.getString('user');
    setUser(data? JSON.parse(data) : {})
  }
  return (
    <View style={styles.container}>
      
      <TextInput 
        placeholder='Nome' 
        style={styles.input}
        onChangeText={setName}
        />   

      <TextInput 
        placeholder='Email' 
        style={styles.input}
        onChangeText={setEmail}
        />  

      <Button 
      title='Salvar' 
      onPress={() => handleSave()}
      /> 

      <Text style={styles.text}>
        {user?.name} - {user?.email}
      </Text>
    </View>
  );
}


export default App;
