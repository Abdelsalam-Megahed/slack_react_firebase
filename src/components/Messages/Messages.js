import React, { Component } from 'react';
import { Segment, Comment} from 'semantic-ui-react';
import MessagesHeader from './MessagesHeader';
import MessageForm from './MessageForm';
import firebase  from 'firebase/app';

class Messages extends Component {
    state = { 
        messagesRef: firebase.database().ref('messages'),
        channel: this.props.currentChannel,
        user: this.props.currentUser
     }
    render() { 
        const { messagesRef, channel, user } = this.state;
        return ( 
            <React.Fragment>

                <MessagesHeader />

                <Segment>
                    <Comment.Group className="messages">

                    </Comment.Group>
                </Segment>

                <MessageForm 
                 messagesRef={messagesRef}
                 currentChannel={channel}
                 currentUser={user} />

            </React.Fragment>
         );
    }
}
 
export default Messages;