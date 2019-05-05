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
    render() {
        const style = {
            width: '100vw',
            height: '100vh'
        }
        return (
            <div style={style}>
                <Map google={this.props.google} zoom={14}>

                    <Marker
                        onClick={this.onMarkerClick}
                        name={'Current location'}
                    />

                    <InfoWindow onClose={this.onInfoWindowClose}>
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
    LoadingContainer: LoadingContainer
})(MapContainer)