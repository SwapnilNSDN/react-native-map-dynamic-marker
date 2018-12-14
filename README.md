You can use this component to show markers to your map dynamically.

# How to use this component :

<p><b>1.</b> import MapComponent from './MapComponent';</p>

<b>2.</b> The state "arrayList" contain list of data including coordinatesby state <b>OR</b> set dynamically from componentWillReceiveProps()<br> 
```
constructor() { 
    super(); 
    this.state = { 
      arrayList: [{ 
        "id": "5bf396e2f19671262b39d73e", 
        "name": "Auto Glass by Mobile Auto Glass", 
        "coordinate":{"latitude":21.040194,"longitude":79.0136364} 
      }] 
    }; 
}
```

<b>3.</b> Below code for render()<br>
```
render(){
  <View style={{ flex: 0.35, height: '100%' }}>
          <MapComponent ref={instance => { this.child = instance; }} getData={this.state.arrayList}/>  
  </View>
}
```

<b>4.</b> At last call this cunction to onCLick, after getting result in componentWillReceiveProps() or componentDidMount()
```
componentDidMount() {
   this.child.updateMap();
}
```


# Output :

<p align="center">
  <img src="https://github.com/SwapnilNSDN/react-native-map-dynamic-marker/blob/master/assets/Screenshot%202018-12-12%20at%205.25.46%20PM.png" width="200">
</p>
