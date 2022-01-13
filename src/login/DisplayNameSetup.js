import React, { useContext, useState, useEffect } from "react";
import { styles } from "./Styles";
import { View, TextInput, Button } from "react-native";
import { auth } from "../firebase-config";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import AuthContext from "../context/AuthContext";
import Home from "../Home";

export default function DisplayNameSetup() {
  const { user, setUser } = useContext(AuthContext);
  const [displayName, setDisplayName] = useState("");
  const updateDisplayName = async () => {
    try{
      const update = {
        displayName: displayName,
        photoURL: "test"
      };
      
       updateProfile(auth.currentUser, update);
       onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);})
       
        console.log(user);
      }
        catch(error){console.log(error.message);}
        
      };
  
  if(!user.displayName){
    return (
    <View>
      <View>
        <TextInput
          editable
          style={styles.input}
          placeholder="Display Name"
          onChange={(event) => {
            setDisplayName(event.target.value);
          }}
        />
      </View>
      
      <View>
        
        <Button title="Submit" onPress={updateDisplayName} />
      </View>
    </View>
  );
        }
    else{
      return(
        <Home />
      );
      }
}
