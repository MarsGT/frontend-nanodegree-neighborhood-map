import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

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
class MapContainer extends Component {
    state = {
        currentLocation: null
    };

    componentDidMount() {
        if (this.props.centerAroundCurrentLocation) {
            if (navigator && navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((pos) => {
                    const coords = pos.coords
                    this.setState({
                        currentLocation: {
                            lat: coords.latitude,
                            lng: coords.longitude
                        }
                    })
                })
            } else {
                alert('抱歉！您的浏览器貌似不支持定位~')
                console.error(`Error: Your browser doesn't support geolocation.`)
            }
        }
    }

    onMarkerClick = (props, marker) => {}

    render() {
        const google = this.props.google;
        const maps = google.maps;

        const cityBeijingPos = new maps.LatLng(39.9047253699, 116.4072154982)
        
        return (
            <div style={style}>
                <Map
                    google={google}
                    zoom={14}
                    mapTypeControl={false}
                    initialCenter={currentLocation || cityBeijingPos}
                    zoomControlOptions={{
                        position: maps.ControlPosition.RIGHT_BOTTOM,
                        style: maps.ZoomControlStyle.SMALL
                    }}
                    styles={mapStyle}
                >
                    <Marker
                        onClick={this.onMarkerClick}
                        name={'???'}
                        position={{ lat: 37.759703, lng: -122.428093 }}
                    />
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