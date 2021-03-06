import React, { Component } from 'react'
import { Icon, Nav, Input, InputGroup, Modal } from 'rsuite'
import Frame from '@rsuite/react-frame'
import '../style/react-frame.css'
import MapContainer from './MapContainer'
import catta from 'catta'

const foursquare = {
    client_id: 'YOUR_CLIENT_ID',
    client_secret: 'YOUR_CLIENT_SECRET'
}

class App extends Component {
    state = {
        isExpand: true,
        currLocation: null,
        currFocus: null,
        value: '',
        markerList: [],
        showing: false,
        markerInfo: null
    }

    componentDidMount() {
        if (navigator && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(pos => {
                const coords = pos.coords
                const location = {
                    lat: coords.latitude,
                    lng: coords.longitude
                }
                // 同时设置当前定位和当前聚焦为请求的定位位置，
                // 目的在于使地图第一次聚焦到定位
                this.setState({
                    currLocation: location,
                    currFocus: location
                })
            })
        } else {
            // 没有获得定位信息
            alert('抱歉！您的浏览器貌似不支持定位~')
            console.error(`Error: Your browser doesn't support geolocation.`)
        }
    }

    // 输入搜索字符后的回调
    handleChange = value => {
        const { currLocation } = this.state
        this.setState({ value })
        this.getVenues(value, currLocation ? `${currLocation.lat},${currLocation.lng}` : '')
    }

    // 点击搜索结果的回调
    handleClick = (ev, marker) => {
        const { lat, lng, id } = marker
        const location = { lat, lng }
        this.updateFocus(location)
        this.getVenueInfo(id)
    }

    // 更新当前聚焦位置（在地图中体现）
    updateFocus = location => {
        this.setState({
            currFocus: location
        })
    }

    // 从Foursquare请求地点列表
    getVenues = (search, latlng) => {
        const url = 'https://api.foursquare.com/v2/venues/explore?'
        const { client_id, client_secret } = foursquare
        const ll = latlng || '39.9075,116.39723' // Foursquare的北京中心坐标
        const query = search || ''
        const parameters = {
            client_id,
            client_secret,
            ll,
            query,
            v: '20180323',
            limit: 20, // 限制结果数量
            radius: 7000 // 限制搜索范围
        }

        // 请求数据
        catta(url + new URLSearchParams(parameters))
            .then(res => {
                const items = res.response.groups[0].items
                const markerList = items.map(item => {
                    const { venue } = item
                    const { id, name, location } = venue
                    const { lat, lng } = location
                    return { id, name, lat, lng }
                })
                this.setState({
                    markerList
                })
            })
            .catch(err => {
                console.error(`[getVenues]\tERROR:${err.message}`)
                console.error(`query='${query}'`)
            })
    }

    // 从Foursquare请求地点详细信息
    getVenueInfo = id => {
        const url = `https://api.foursquare.com/v2/venues/${id}?`
        const { client_id, client_secret } = foursquare
        const parameters = {
            client_id,
            client_secret,
            v: '20180323'
        }

        // 请求数据
        catta(url + new URLSearchParams(parameters))
            .then(res => {
                const venue = res.response.venue
                const markerInfo = {
                    name: venue.name,
                    cate: venue.categories[0].name,
                    phone: venue.contact.formattedPhone || '',
                    addr: venue.formattedAddress ? venue.formattedAddress.join(', ') : '',
                    post: venue.postalCode || '',
                    url: venue.url || ''
                }
                this.setState({
                    markerInfo,
                    showing: true
                })
            })
            .catch(err => {
                console.error(`[getVenueInfo]\tERROR:${err.message}`)
            })
    }

    close = () => {
        this.setState({ showing: false })
    }

    render() {
        const { isExpand, value, currFocus, markerList, markerInfo, showing } = this.state

        return (
            <Frame className="App">
                <Frame.Nav expand={isExpand} renderTitle={() => <div>探索附近</div>}>
                    <Nav
                        style={{
                            padding: 20,
                            overflow: 'hidden'
                        }}>
                        <InputGroup
                            inside
                            style={{
                                marginBottom: 10
                            }}>
                            <Input
                                placeholder="请输入要搜索的内容"
                                value={value}
                                onChange={this.handleChange}
                                role="search"
                                aria-label="为您即时搜索附近的地点"
                            />
                            <InputGroup.Addon>
                                <Icon icon="search" />
                            </InputGroup.Addon>
                        </InputGroup>
                        {markerList.map(marker => (
                            <p
                                key={marker.id}
                                style={{
                                    marginTop: 15,
                                    cursor: 'pointer'
                                }}
                                role="listitem"
                                aria-label={marker.name}
                                onClick={ev => this.handleClick(ev, marker)}>
                                <Icon icon="map-marker" />
                                &emsp;{marker.name}
                            </p>
                        ))}
                    </Nav>
                </Frame.Nav>
                <Frame.Content>
                    <MapContainer markerList={markerList} currFocus={currFocus} />
                </Frame.Content>
                {markerInfo && (
                    <Modal show={showing} onHide={this.close}>
                        <Modal.Header>
                            <Modal.Title>地点信息</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>名称：{markerInfo.name}</p>
                            <p>类别：{markerInfo.cate}</p>
                            <p>电话：{markerInfo.phone}</p>
                            <p>地址：{markerInfo.addr}</p>
                            <p>邮编：{markerInfo.post}</p>
                            <p>网址：{markerInfo.url}</p>
                        </Modal.Body>
                    </Modal>
                )}
            </Frame>
        )
    }
}

export default App
