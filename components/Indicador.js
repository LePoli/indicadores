import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect, version} from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator,ScrollView ,TouchableOpacity,Dimensions} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import moment from "moment";


export default ({navigation})=> {
    const indicatorName = navigation.getParam('indicatorName');
    const [serie, setSerie] = useState([]);
    const [indicador, setIndicador] = useState([]);
    const [loading, setLoading] = useState(true);
    // const indicatorName = 'bitcoin'
    const fetchIndicador = async ()=>{
        await fetch(`https://mindicador.cl/api/${indicatorName}`)
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
        setSerie(dt)
        setLoading(false)
    })
    }


  useEffect(()=>{
    fetchIndicador()
  },[])

  if(loading){
    return <View style={styles.center}><ActivityIndicator size="large"/></View>
  }

  return (
    <View style={styles.container}>
        <FlatList
          style={styles.black}
          data={serie}
          renderItem={({item})=>(
            <View style={styles.item}>
                <View>
                    <Text>
                        {
                            moment(item.fecha).format('DD-MM-YYYY')
                        }
                    </Text>
                </View>
                <View>
                    <Text>
                        $
                        {
                            item.valor
                        }
                    </Text>
                </View>
         </View>
          )}
        />
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
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'stretch',
        justifyContent: 'space-evenly',
        paddingTop: 15,
        paddingBottom: 15,
        width: Dimensions.get('window').width
    },
    text:{
        color: '#000',
        fontSize: 20
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
    }
});
