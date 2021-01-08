import React from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView
} from "react-native";
import db from "../config";
import firebase from "firebase";
import { Header } from "react-native-elements";

export default class SignUpLoginScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      emailId: "",
      password: "",
    };
  }

  toLogin = (emailId, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(emailId, password)
      .then(() => {
        return Alert.alert("User Login Successful");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        return Alert.alert(errorMessage);
      });
  };

  toSignIn = (emailId, password) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(emailId, password)
      .then((response) => {
        return Alert.alert("User successfully signedUp");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        return Alert.alert(errorMessage);
      });
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>
        <Header
          backgroundColor={"rgb(225, 185, 135)"}
          centerComponent={{
            text: "Barter App",
            style: { color: "#fff", fontSize: 40, fontWeight: "bold" },
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Email Id"
          keyboardType="email-address"
          onChangeText={(text) => {
            this.setState({
              emailId: text,
            });
          }}
        />

        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder="password"
          onChangeText={(text) => {
            this.setState({
              password: text,
            });
          }}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.toLogin(this.state.emailId, this.state.password);
          }}
        >
          <Text style={{textAlign: 'center', fontSize: 20}}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, {marginBottom: 250}]}
          onPress={() => {
            this.toSignIn(this.state.emailId, this.state.password);
          }}
        >
          <Text style={{textAlign: 'center', fontSize: 20}}>SignUp</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#D7C49E",
    alignItems: "center",
    //flex: 1,  
  },
  input: {
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 100,
    fontSize: 22,
    width: 300,
    height: 40,
    backgroundColor: "#ded7ba",
  },
  button: {
    justifyContent: "space-around",
    backgroundColor: "#e0cc92",
    marginTop: 100,
    width: 200,
    height: 30,
    borderRadius: 6,
    textAlign: "center",
    alignSelf: "center",
  },
});
