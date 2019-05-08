import React, { Component } from 'react'
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react'
import { Loader } from 'rsuite'

// 加载提示
const Loading = () => (
    <Loader backdrop center speed='fast' size='md' content='正在加载，请稍候...' />
)

// 自定义地图样式
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
        currFocus: this.props.currFocus
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            currFocus: nextProps.currFocus
        });
    }

    onMarkerClick = (props, marker, e) => {
        console.log(props, marker, e)
    }

    render() {
        const { google, markerList } = this.props
        const { currFocus } = this.state
        const maps = google.maps

        const cityBeijingPos = new maps.LatLng(39.9047253699, 116.4072154982) // 北京市中心定位

        return (
            <Map
                google={google}
                zoom={14}
                mapTypeControl={false}
                fullscreenControl={false}
                center={currFocus ? currFocus : cityBeijingPos}
                zoomControlOptions={{
                    position: maps.ControlPosition.RIGHT_BOTTOM,
                    style: maps.ZoomControlStyle.SMALL
                }}
                styles={mapStyle}
            >
                {
                    markerList.map((marker) =>
                        <Marker
                            key={marker.id}
                            onClick={this.onMarkerClick}
                            name={markerList.name}
                            position={{
                                lat: markerList.lat,
                                lng: markerList.lng
                            }}
                        />
                    )
                }
            </Map>
        )
    }
}
export default GoogleApiWrapper({
    apiKey: 'AIzaSyCE36zOr913BFjDNqa5mJMorVWNgACARaA',
    language: 'zh-CN',
    LoadingContainer: Loading
})(MapContainer)