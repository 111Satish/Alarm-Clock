
import React, {Component} from 'react'
import {View, StyleSheet, Text, ScrollView, TouchableOpacity} from 'react-native'
import moment from 'moment'




function Timer({interval, style}){
  const pad = (n) => n < 10 ? '0' + n : n
  const duration = moment.duration(interval)
  const centiseconds = Math.floor(duration.milliseconds()/10)
  return( 
    <View style = {styles.timerContainer}>
    <Text style= {style}> {pad(duration.minutes())}:</Text>
    <Text style= {style}>{pad(duration.seconds())}:</Text>
    <Text style= {style}> {pad(centiseconds)}</Text>
    </View>
  )
}
 
function RoundButton({ title, color, background, onPress, disabled}){
  return(
    <TouchableOpacity
    onPress ={() => !disabled && onPress()}
    style={[ styles.button,{backgroundColor: background}]}
    activeOpacity= {disabled ? 1.0 : 0.7}
    >
      <View style={styles.buttonBoarder} >
      <Text style= {[styles.buttonTitle,{color}]}> {title}</Text>
      </View>
    </TouchableOpacity>
  )
}

function Lap({ number, interval, fastest, slowest }){
  
  const lapStyle =[
    styles.lapText,
    fastest && styles.fastest,
    slowest && styles.slowest,
  ]
  return(
    <View style = {styles.lap}>
      <Text style={lapStyle} >Lap {number}</Text>
      <Timer style={lapStyle} interval= {interval}/>
    </View>
  )
}

function LapTable({ laps, timer }){
  const finishedLaps = laps.slice(1)
  let min = Number.MAX_SAFE_INTEGER
  let max = Number.MIN_SAFE_INTEGER
  if (finishedLaps.length >= 2){
    finishedLaps.forEach(lap =>{
    if(lap < min) min = lap
    if(lap > max) max = lap
    }) 
  }
  return (
    <ScrollView style= {styles.scrollview}>
      {laps.map((lap, index)=>(
        <Lap number={laps.length-index}
        key={laps.length - index}
         interval= {index == 0 ? timer + lap : lap}
         fastest = {lap == min}
         slowest = {lap == max}
         />
        ))}
    </ScrollView>
  )
}

function ButtonsRow( {children}){
  return(
    <View style = {styles.buttonsRow}>{children}</View>
  )
}


export default class StopWatch extends Component {
  constructor(props){
    super(props)
    this.state = {
      start: 0,
      now: 0,
      laps:[],
    }
  }
  componentWillUnmount() {
    clearInterval(this.timer)
  }
  start = () => {
    const now = new Date().getTime()
    this.setState({
    start: now,
    now,
    laps: [0],
  })
  this.timer = setInterval(()=> {
    this.setState( { now: new Date().getTime()})
  }, 100 )
}

lap = () => {
  const timestamp = new Date().getTime()
  const { laps, now, start } = this.state
  const [firstLap, ...other] = laps
  this.setState({
    laps: [0, firstLap + now - start, ...other],
    start: timestamp,
    now: timestamp,
  })
}

stop = () => {
  clearInterval(this.timer)
  const { laps, now, start } = this.state
  const [firstLap, ...other] = laps
  this.setState({
    laps: [firstLap + now - start, ...other],
    start: 0,
    now: 0,
  })
}
reset = () => {
  this.setState({
    laps: [],
    start: 0,
    now: 0,
  })
}
resume = () => {
  const now = new Date().getTime()
  this.setState({
    start: now,
    now,
  })
  this.timer = setInterval(() => {
    this.setState({ now: new Date().getTime()})
  }, 100)
}
  render(){
    const {now, start, laps} = this.state
    const timer = now - start
    return(
<View style = {styles.container}>
  <Timer 
  interval={laps.reduce((total, curr) => total + curr, 0) + timer}
  style={styles.timer}
/>
{laps.length === 0 && (
  <ButtonsRow>
     <RoundButton 
     title= 'Lap'
     color= 'green'
     background= 'red'
     disabled
     />
     <RoundButton
     title= 'Start'
     color= 'white'
     background= 'gray'
     onPress = {this.start}
     />
  </ButtonsRow>
)}
{start > 0 && (
          <ButtonsRow>
            <RoundButton
              title='Lap'
              color='#FFFFFF'
              background='#3D3D3D'
              onPress={this.lap}
            />
            <RoundButton
              title='Stop'
              color='#E33935'
              background='#3C1715'
              onPress={this.stop}
            />
          </ButtonsRow>
)}
{laps.length > 0 && start === 0 && (
          <ButtonsRow>
            <RoundButton
              title='Reset'
              color='#FFFFFF'
              background='#3D3D3D'
              onPress={this.reset}
            />
            <RoundButton
              title='Start'
              color='#50D167'
              background='#1B361F'
              onPress={this.resume}
            />
          </ButtonsRow>
        )}
  <LapTable laps={laps} timer={timer}/>
</View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
    alignItems: 'center',
    paddingTop: 130,
    paddingHorizontal:70,
  },
  timer:{
    color: 'black',
    fontSize: 60,
    fontWeight: '400',
    width: 100,
  },
  button:{
    width:80,
    height: 80,
    borderRadius:40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTitle:{
    fontSize: 20,

  },
  buttonBoarder:{
    width: 76,
    height: 76,
    borderRadius:38,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
 
  buttonsRow:{
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    marginTop: 80,
    marginBottom: 30,
  },
  lapText:{
    color: 'white',
    fontSize: 18,
  },
  lapTimer: {
    width: 30,
  },
  lap:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: 'green',
    borderTopWidth: 1,
    paddingVertical: 10,
  },
  scrollview:{
    alignSelf: 'stretch',

  },
  fastest:{
    color:'green',
  },
  slowest:{
    color: 'red',
  },
  timerContainer:{
    flexDirection: 'row',
  }
  
})


