import React, { Component } from 'react'
import { Icon, Nav, AutoComplete, InputGroup } from 'rsuite'
import Frame from '@rsuite/react-frame'
import '../style/react-frame.css'
import MapContainer from './MapContainer'

class App extends Component {
    state = {
        isExpand: true,
        data: [],
        value: '',
        markerList: []
    }

    handleChange(value) {
        this.setState({
            value
        });
    }
    getLogo = () => <img alt="" height="20" width="20" src="https://rsuitejs.com/favicon.ico" />
    renderTitle = () => <div style={{ textAlign: 'center' }}>搜索</div>

    render() {
        const { isExpand, data, value, markerList } = this.state
        return (
            <Frame className='App'>
                <Frame.Nav expand={isExpand} renderTitle={this.renderTitle} brand={this.getLogo}>
                    <Nav>
                        <InputGroup inside style={{ width: 300, marginBottom: 10 }}>
                            <AutoComplete placeholder='请输入要搜索的内容' data={data} value={value} onChange={this.handleChange} />
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
