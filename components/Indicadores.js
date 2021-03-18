import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect, version} from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator,TouchableOpacity, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';


export default ({navigation})=> {
    const [indicadores, setIndicadores] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchIndicadores = async ()=>{
        await fetch('https://mindicador.cl/api/')
        .then(response=>response.json())
        .then(data=>{
          const indicador = [];
          const dt = []
          Object.keys(data).map((keyA)=>{
            if(!["version","autor","fecha"].includes(keyA)){
              indicador.push(data[keyA])
            }   
          })
          indicador.sort((a, b) => a.nombre.localeCompare(b.nombre));
          setIndicadores(indicador)
          setLoading(false)
        })
    }


  useEffect(()=>{
    fetchIndicadores()
  },[])

  if(loading){
    return <View style={styles.center}><ActivityIndicator size="large"/></View>
  }

  return (
    <View style={styles.container}>
        <FlatList
          data={indicadores}
          renderItem={({item})=>(
            <View style={styles.item}>
                <View>
                    {console.log(item.codigo)}
                    <TouchableOpacity style={styles.flexColumnStart} onPress={()=>navigation.navigate('Indicador', {indicatorName: item.codigo,title:item.nombre})}>
                        <Text style={styles.bigText}>
                            {item.nombre}
                        </Text>
                        <Text style={styles.smallText}>
                            {
                                item.unidad_medida
                            }
                        </Text>
                    </TouchableOpacity>
                </View>
                <View>
                     <TouchableOpacity style={styles.flexRowEnd} onPress={()=>navigation.navigate('Informacion', {indicatorName: item.codigo,title:item.nombre})}>
                         <Text>
                             <MaterialCommunityIcons name="information-outline" size={28} color="blue" /> 
                         </Text>
                         <Text>
                             {
                                 <MaterialCommunityIcons name="chevron-right" size={24} color="#4a4a4a" />
                             }
                         </Text>
                     </TouchableOpacity>
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
