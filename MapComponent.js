/*
* Swapnil Nandapure
* Commands : npm install react-native-maps --save
*/

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import MapView, { Marker, ProviderPropType, Animated } from 'react-native-maps';

import flagPinkImg from '../../assets/marker96.png'
const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.00922 * 1.9;
const LONGITUDE_DELTA = 0.00421 * 1.9;
let id = 0;

class MapComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

      mapRegion: null,
      lastLat: null,
      lastLong: null,

      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      markers: [],

    };

    this.onMapPress = this.onMapPress.bind(this);

    this.onRegionChange = this.onRegionChange.bind(this);
  }

  componentDidMount() {
    this.watchID = navigator.geolocation.watchPosition((position) => {
      let region = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }
      this.mapView.animateToRegion(region,1000)
      this.props.onRef(this)
    });
  }

  componentWillUnmount() {
    this.props.onRef(undefined)
  }

  updateMap() {
    console.log('Call updateMap');
    if(this.props.getData.length!==0){
      let region = {
        latitude: this.props.getData[0].coordinate.latitude,
        longitude: this.props.getData[0].coordinate.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }
      this.mapView.animateToRegion(region,1000)
    }
    
  }

  onMapPress(e) {
    this.setState({
      markers: [
        ...this.state.markers,
        {
          coordinate: e.nativeEvent.coordinate,
          key: `foo${id++}`,
        },
      ],
    });
  }

  onRegionChange(region) {
    this.setState({ region });
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          ref = {(ref)=>this.mapView=ref}
          provider={this.props.provider}
          style={styles.map}
          showsUserLocation={true}
          followUserLocation={true}
          initialRegion={this.state.region}
          region={this.state.mapRegion}
          onPress={this.onMapPress}
          onRegionChange={this.onRegionChange}
        >
      
          {/* By Swapnil */}
          {this.props.getData.map(marker => (
            <Marker
              title={marker.name}
              image={flagPinkImg}
              key={marker.id}
              coordinate={{
                latitude: marker.coordinate.latitude,
                longitude: marker.coordinate.longitude,
              }}
            />
          ))}
        </MapView>
        <View style={styles.buttonContainer}>

        </View>
      </View>
    );
  }
}

MapComponent.propTypes = {
  provider: ProviderPropType,
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
});

export default MapComponent;