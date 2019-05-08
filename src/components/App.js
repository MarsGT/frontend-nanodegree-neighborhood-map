import React, { Component } from 'react'
import { Icon, Nav, AutoComplete, InputGroup } from 'rsuite'
import Frame from '@rsuite/react-frame'
import '../style/react-frame.css'
import MapContainer from './MapContainer'
import catta from 'catta'

class App extends Component {
    state = {
        isExpand: true,
        value: '',
        markerList: []
    }

    handleChange = (value) => {
        this.setState({ value })
        this.getVenues(value)
    }

    // 从Foursquare请求地点信息
    getVenues = (search, latlng) => {
        const url = 'https://api.foursquare.com/v2/venues/explore?'
        const client_id = '3XGZ3YW1BLDWP0M1RDXHJUDQ1L32WSZ1UOFLW0VLVXCVAC1K'
        const client_secret = 'XC4FNRIBWXZXAESV4YGHNEXV5KP4GWNYZUH0AWDZQOP0O4V0'
        const ll = latlng || '39.9075,116.39723' // Foursquare的北京中心坐标
        const query = search || ''
        const parameters = {
            client_id,
            client_secret,
            ll,
            query,
            v: '20180323',
            limit: 10
        }

        // 请求数据
        catta(url + new URLSearchParams(parameters))
            .then(res => {
                const venues = res.response.venues
                const markerList = venues.map((venue) => {
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

    getLogo = () => <Icon icon='search' />
    renderTitle = () => <div>搜索</div>

    render() {
        const { isExpand, value, markerList } = this.state
        return (
            <Frame className='App'>
                <Frame.Nav expand={isExpand} renderTitle={this.renderTitle}>
                    <Nav style={{ padding: 20 }}>
                        <InputGroup inside style={{ marginBottom: 10 }}>
                            <AutoComplete placeholder='请输入要搜索的内容' data={markerList} value={value} onChange={this.handleChange} />
                            <InputGroup.Addon>
                                <Icon icon='search' />
                            </InputGroup.Addon>
                        </InputGroup>
                    </Nav>
                </Frame.Nav>
                <Frame.Content>
                    <MapContainer markerList={markerList} />
                </Frame.Content>
            </Frame>
        )
    }
}

export default App;
