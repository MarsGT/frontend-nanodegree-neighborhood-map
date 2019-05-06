import React from 'react'
import { Icon, Nav, AutoComplete, InputGroup } from 'rsuite'
import Frame from '@rsuite/react-frame'
import '~@rsuite/rsuite-frame/lib/styles/less/index.less'
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

    render() {
        const { isExpand, data, value, markerList } = this.state
        return (
            <Frame className='App'>
                <Frame.Nav logo={<Icon icon='search' />} expand={isExpand} >
                    <Nav>
                        <Nav.Item eventKey='1' icon={<Icon icon='search' />}>
                            <InputGroup inside style={{ width: 300, marginBottom: 10 }}>
                                <AutoComplete placeholder='搜索' data={data} value={value} onChange={this.handleChange}
                                    renderItem={item => (
                                        <p><Icon icon='map-marker' /> {item.label}</p>
                                    )}
                                />
                                <InputGroup.Addon>
                                    <Icon icon='search' />
                                </InputGroup.Addon>
                            </InputGroup>
                        </Nav.Item>
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
