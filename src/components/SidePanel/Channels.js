import React from "react";
import { Menu, Icon, Modal, Form, Input, Button } from "semantic-ui-react";
import firebase from '../../firebase';

class Channels extends React.Component {
  state = {
    user: this.props.currentUser,
    channels: [],
    channelName: "",
    channelDetails: "",
    channelRef: firebase.database().ref('channels'),
    modal: false
  };

  componentDidMount() {
      this.addListeners();
  }

  addListeners = () => {
      let lodadedChannels = [];
      this.state.channelRef.on('child_added', snap => {
          lodadedChannels.push(snap.val());
           this.setState({ channels: lodadedChannels});
        })
  }

  handleSubmit = event => {
    event.preventDefault();

    if(this.FormValid(this.state)){
        this.addChannel();
    }
  };

  addChannel = () => {
    const {channelRef, channelName, channelDetails, user} = this.state;

    const key = channelRef.push().key;

    const newChannel = {
        id: key,
        name: channelName,
        details: channelDetails,
        createdBy: {
            name: user.displayName,
            // avatar: user.photoUrl
        }
    };
    channelRef
        .child(key)
        .update(newChannel)
        .then(() => {
            this.setState({ channelName: '', channelDetails: ''});
            this.closeModal();
            console.log("Channel is added");
            
        })
  }

  displayChannels= (channels) => (
    channels.length > 0 && channels.map(channel => (
        <Menu.Item
        key = {channel.id}
        onClick={() => console.log(channel)}
        >
            # {channel.name}
        </Menu.Item>
    ))

  )

  

  FormValid = ({channelName, channelDetails}) => channelName && channelDetails;

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  openModal = () => this.setState({ modal: true });

  closeModal = () => this.setState({ modal: false });

  render() {
    const { channels, modal } = this.state;

    return (
      <React.Fragment>
        <Menu.Menu style={{ paddingBottom: "2em" }}>
          <Menu.Item>
            <span>
              <Icon name="exchange" /> CHANNELS
            </span>
            ({channels.length}) <Icon name="add" onClick={this.openModal} />
          </Menu.Item>
          {/* Channels */}
          {this.displayChannels(channels)}
        </Menu.Menu>

        {/* Add Channel Modal */}
        <Modal basic open={modal} onClose={this.closeModal}>
          <Modal.Header>Add a Channel</Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.handleSubmit}>
              <Form.Field>
                <Input
                  fluid
                  label="Name of Channel"
                  name="channelName"
                  onChange={this.handleChange}
                />
              </Form.Field>

              <Form.Field>
                <Input
                  fluid
                  label="About the Channel"
                  name="channelDetails"
                  onChange={this.handleChange}
                />
              </Form.Field>
            </Form>
          </Modal.Content>

          <Modal.Actions>
            <Button color="green" inverted onClick={this.handleSubmit}>
              <Icon name="checkmark" />
               Add
            </Button>
            <Button color="red" inverted onClick={this.closeModal}>
              <Icon name="remove" /> 
              Cancel
            </Button>
          </Modal.Actions>
        </Modal>
      </React.Fragment>
    );
  }
}  

export default Channels;
