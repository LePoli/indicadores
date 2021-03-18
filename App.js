import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect, version} from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack'
import { StyleSheet, Text, View} from 'react-native';
import { Chart, Indicador, Indicadores, Informacion } from './components';



const AppNavigator = createStackNavigator({
  Home: {
    screen: Indicadores,
    navigationOptions:{
      title: 'Indicadores'
    }
  },
  Indicador: {
    screen: Indicador
  },
  Informacion: {
    screen: Informacion
  }
})

Indicador.navigationOptions= ({navigation})=>{
  return {
    title: navigation.getParam('title','Cargando...')
  }
}
Informacion.navigationOptions= ({navigation})=>{
  return {
    title: navigation.getParam('title','Cargando...')
  }
}
export default createAppContainer(AppNavigator)
const styles = StyleSheet.create({
  center:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    color: '#000',
    fontSize: 20
  },
  black:{
    backgroundColor: '#fff'
  }
});
