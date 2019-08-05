import React from 'react';
import {Menu} from'semantic-ui-react';
import UserPanel from './UserPanel/UserPanel';

class SidePanel extends React.Component {
    render() { 
        return ( 
                <Menu
                size="large"
                inverted
                fixed="left"
                vertical
                style={{background: '#4c3c4c', fontSize: '1.5rem'}}
                >
                    <UserPanel  currentUser={this.props.currentUser}/>
                </Menu>
         );
    }
}
 
export default SidePanel;