import React from 'react';
import { Segment, Button, Input } from 'semantic-ui-react';
import firebase from '../../firebase';
import FileModal from './FileModal';

class MessageForm extends React.Component {
    state = { 
        message: '',
        channel: this.props.currentChannel,
        user: this.props.currentUser,
        errors:[],
        loading: false,
        modal: false
     }

     openModal = () => {
         this.setState({modal: true})
     }
     closeModal = () => {
        this.setState({modal: false})
    }

     handlechange = (event) => {
        this.setState({[event.target.name]: event.target.value})
     }

     createMessage = () => {
        const message={
           timestamp: firebase.database.ServerValue.TIMESTAMP,
            user:{
               id: this.state.user.uid,
               name: this.state.user.displayName,
            //    avatar: this.state.user.photoUrl
            },
            content: this.state.message
        };
        return message;
    }

     sendMessage = () => {
         const {messagesRef} = this.props;
        const { message, channel } = this.state;

         if(message){
             this.setState({loading: true})
            messagesRef
                       .child(channel.id)
                       .push()
                       .set(this.createMessage())
                       .then(() => {
                           this.setState({loading: false, message: '', errors: []})
                       })
                       .catch(err => {
                           this.setState({
                               loading: false,
                               errors: this.state.errors.concat(err)
                           })
                       })
         }else{
             this.setState({
                 errors: this.state.errors.concat({ message: 'Please add a message'})
             })
         }
     }

     uploadFile = (file, metadata) => {
        console.log(file, metadata);  
     }

    render() { 
        const {errors, message, loading, modal} = this.state;
       
        return ( 
                <Segment className="message__form">
                    <Input
                     className={
                        errors.some(error => error.message.includes('message')) ? 'error' : ''
                    }
                     onChange={this.handlechange}
                     fluid
                     name="message"
                     style={{marginBottom: '0.7em'}}
                     label={<Button icon={'add'} />}
                     labelPosition="left"
                     value={message}
                     placeholder="Write your message"
                     />
                     <Button.Group icon widths="2">
                         <Button
                         onClick={this.sendMessage}
                         color="orange"
                         content="Send a message"
                         labelPosition="left"
                         disabled={loading}
                         icon="edit"
                         />
                          <Button
                         color="teal"
                         content="Upload files"
                         labelPosition="right"
                         icon="cloud upload"
                         onClick={this.openModal}
                         />
                         <FileModal 
                          modal={modal}
                          closeModal={this.closeModal}
                          uploadFile={this.uploadFile}
                        />
                     </Button.Group>

                </Segment>
         );
    }
}
 
export default MessageForm;