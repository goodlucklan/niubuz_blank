import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { NativeModules } from 'react-native';

export default function App() {

  const [value, onChangeText] = React.useState('1');

  const showToast = async (amount) => {

    var purchase = "23498458";

    try {
      var requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
          'Authorization': 'Basic Z2lhbmNhZ2FsbGFyZG9AZ21haWwuY29tOkF2MyR0cnV6'
        },
        redirect: 'follow'
      };

      fetch("https://apitestenv.vnforapps.com/api.security/v1/security", requestOptions)
        .then(response => response.text())
        .then(token =>
          // console.log(result)
          NativeModules.NiubizModule.payWithNiubiz(token, amount, purchase).then(niubizResponse => {
            console.log('niubizResponse: ', niubizResponse);
            var jsonResponse = JSON.parse(niubizResponse);
            if (jsonResponse.dataMap != undefined) {
              console.log('Mensaje: ', jsonResponse.dataMap.ACTION_DESCRIPTION);
            } else {
              console.log('Mensaje: ', jsonResponse.data.ACTION_DESCRIPTION);
            }
          })
        )
        .catch(error => console.log('error', error));
    } catch (error) {
      console.error(error);
    }

  }

  return (
    <View style={styles.container}>
      <Text>Ingrese importe</Text>
      <TextInput keyboardType='numeric' style={{ height: 50, width: 150, borderColor: 'gray', borderWidth: 1 }} value={value} onChangeText={text => onChangeText(text)} />
      <Button title="Pagar" onPress={() => showToast(value)} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
