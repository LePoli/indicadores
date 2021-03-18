import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect, version} from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator,Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import moment from "moment";
import {
    LineChart
  } from "react-native-chart-kit";


export default (props)=> {
    const {indicador} = props;
    const ind = (indicador.serie.filter((x,i)=>i<10)).sort((a, b) => a.fecha.localeCompare(b.fecha));
    console.log('========indicador============');
    console.log(ind);
    console.log('========indicador============');
    return (
        <View>
        <LineChart
            data={{
            labels: [...(ind.map((x,i)=> (i === 0|| i === 5 || i=== 9) && moment(x.fecha).format('DD-MM-YY'))).filter(x=>x!=false)],
            datasets: [
                {
                data: (ind.map(x=>x.valor)).filter((x,i)=>i<10)
                }
            ]
            }}
            width={Dimensions.get("window").width} 
            height={220}
            yAxisLabel="$"
            chartConfig={{
            backgroundColor: "#0000FF",
            backgroundGradientFrom: "#0000FF",
            backgroundGradientTo: "#0095FF",
            decimalPlaces: 0, 
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`       
            }}        
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


/** */