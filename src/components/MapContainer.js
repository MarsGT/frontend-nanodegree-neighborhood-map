import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

const Loading = () => {
    const style = {
        width: '100vw',
        height: '100vh',
        lineHeight: '100vh',
        textAlign: 'center'
    }
    return (
        <div style={style}>正在加载，请稍候...</div>
    )
}
class MapContainer extends Component {
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
    };

    onMarkerClick = (props, marker) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });

    render() {
        const style = {
            width: '100vw',
            height: '100vh'
        }
        const mapStyle = [
            {
                featureType: 'water',
                stylers: [
                    { color: '#19a0d8' }
                ]
            }, {
                featureType: 'administrative',
                elementType: 'labels.text.stroke',
                stylers: [
                    { color: '#ffffff' },
                    { weight: 6 }
                ]
            }, {
                featureType: 'administrative',
                elementType: 'labels.text.fill',
                stylers: [
                    { color: '#e85113' }
                ]
            }, {
                featureType: 'road.highway',
                elementType: 'geometry.stroke',
                stylers: [
                    { color: '#efe9e4' },
                    { lightness: -40 }
                ]
            }, {
                featureType: 'transit.station',
                stylers: [
                    { weight: 9 },
                    { hue: '#e85113' }
                ]
            }, {
                featureType: 'road.highway',
                elementType: 'labels.icon',
                stylers: [
                    { visibility: 'off' }
                ]
            }, {
                featureType: 'water',
                elementType: 'labels.text.stroke',
                stylers: [
                    { lightness: 100 }
                ]
            }, {
                featureType: 'water',
                elementType: 'labels.text.fill',
                stylers: [
                    { lightness: -100 }
                ]
            }, {
                featureType: 'poi',
                elementType: 'geometry',
                stylers: [
                    { visibility: 'on' },
                    { color: '#f0e4d3' }
                ]
            }, {
                featureType: 'road.highway',
                elementType: 'geometry.fill',
                stylers: [
                    { color: '#efe9e4' },
                    { lightness: -25 }
                ]
            }
        ]
        const google = this.props.google;
        const maps = google.maps;
        const cityBeijing = new maps.LatLng(39.9047253699, 116.4072154982)
        
        return (
            <div style={style}>
                <Map
                    google={this.props.google}
                    zoom={14}
                    mapTypeControl={false}
                    initialCenter={cityBeijing}
                    styles={mapStyle}
                >
                    <Marker
                        onClick={this.onMarkerClick}
                        name={'Current location'}
                    />
                    <InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}
                    >
                        <div>
                            <h1>{this.state.selectedPlace.name}</h1>
                        </div>
                    </InfoWindow>
                </Map>
            </div>
        )
    }
}
export default GoogleApiWrapper({
    apiKey: 'AIzaSyCE36zOr913BFjDNqa5mJMorVWNgACARaA',
    language: 'zh-CN',
    LoadingContainer: Loading
})(MapContainer)