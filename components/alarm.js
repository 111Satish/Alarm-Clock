import React from "react";

import {
    Button,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
  View,
} from 'react-native';

const Alarm = ({navigation}) => {
  return(
    <SafeAreaView>
      <View>
        <Pressable>
          <Text style={styles.highlight} >03:00 AM</Text>
        </Pressable>
    </View>
    <View>
        <Text style={styles.highlight}>04:15 AM</Text>
    </View>
    <View>
        <Text style={styles.highlight}>04:30 AM</Text>
    </View>
    <View>
        <Text style={styles.highlight}>05:00 AM</Text>
    </View>
    <View>
        <Text style={styles.highlight}>06:20 AM</Text>
</View>
<View>
        <Text style={styles.highlight}>02:00 PM</Text>
    </View>
    <View style={styles.fixToText}>
    <Button title="Stop Watch" color= 'black'  onPress={()=>
            navigation.navigate('StopWatch')} />
    </View>
    
    </SafeAreaView>
    
  );
};


const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: 'red',
    paddingTop: 50,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  fixToText: {
    width: 150,
    height: 40,
    alignItems: 'center',
    marginTop:700,
    position:'absolute',
    alignSelf: 'center',
    backgroundColor: 'black',
    

  },
  highlight: {
    fontWeight: '700',
    fontSize: 30,
    backgroundColor: 'gray',
    paddingBottom: 10,
    marginTop: 20,
    textAlign: 'left',
    paddingLeft: 20,
  },
  heading: {
    fontWeight: '700',
    fontSize: 50,
    backgroundColor: 'yellow',
    paddingBottom: 10,
    textAlign: 'center',
  },
  buttonbottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 30,
  },

});

export default Alarm; 