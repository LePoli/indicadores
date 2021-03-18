import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect, version} from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import moment from "moment";
import {Chart} from '../components';


export default ({navigation})=> {
    const indicatorName = navigation.getParam('indicatorName');
    console.log(indicatorName)
    const [indicador, setIndicador] = useState([]);
    const [loading, setLoading] = useState(true);

  useEffect(()=>{
    fetch(`https://mindicador.cl/api/${indicatorName}`)
    .then(response=>response.json())
    .then(data=>{
      const dt= [];
      Object.keys(data).map((keyA)=>{
        if(["serie"].includes(keyA)){
            dt.push(...data[keyA])
        }   
      })
    //   datos.sort((a, b) => a.nombre.localeCompare(b.nombre));
      setIndicador(data)
      setLoading(false)
    })
  },[])

  if(loading){
    return <View style={styles.center}><ActivityIndicator size="large"/></View>
  }

  return (
      <View style={styles.container}>
        <View style={styles.content}>
            <Text style={styles.bigTextBlue}>
                $ {indicador.serie[0].valor}
            </Text>
            <View style={styles.item}>
                <Text>
                    Nombre
                </Text>
                <Text>
                    {indicador.nombre}
                </Text>
            </View>
            <View style={styles.item}>
                <Text>
                    Fecha
                </Text>
                <Text>
                    {moment(indicador.serie[0].fecha).format('DD-MM-YYYY')}
                </Text>
            </View>
            <View style={styles.item}>
                <Text>
                    Unidad de Medida
                </Text>
                <Text>
                    {indicador.unidad_medida}
                </Text>
            </View>
        </View>
        <Chart indicador={indicador}/>
    </View>
  );
}

const styles = StyleSheet.create({
    center:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        flex:1,
        backgroundColor: '#fff',
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        paddingTop: 15,
        paddingBottom: 15,
        width: Dimensions.get('window').width
    },
    text:{
        color: '#000',
        fontSize: 20
    },
    content:{
        borderBottomColor: '#c4c4c4',
        borderBottomWidth: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent:'space-between',
        padding: 15,
        paddingBottom: 0
    },
    item:{
        borderBottomColor: '#c4c4c4',
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent:'space-between',
        padding: 15
    },
    flexColumnStart:{
        flexDirection: 'column',
        alignItems:'flex-start',
        justifyContent: 'space-evenly'
    },
    flexRowEnd:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    bigTextBlue:{
        color: '#0055FF',
        fontSize: 28,
        fontWeight: '600',
        textAlign: 'center',
        paddingBottom:30,
        paddingTop: 20
    }
});
