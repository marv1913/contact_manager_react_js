import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ContactItem from './ContactItem';

class ContactList extends Component {

    render() {
        const {contacts} = this.props;
        const isAdmin = this.props.isAdmin;
        if (isAdmin) {
            return < AdminContacts contacts={contacts}/>
        } else {
            return <NormaloContacts contacts={contacts}/>
        }
    }
}

function NormaloContacts(props) {
    const {contacts} = props;
    return (
        <div className="modal" id="contactList">
            <div id="contact-content">
                <div className="modal-header">
                    <h2> Contact List </h2>
                </div>
                <div className="container" id="list-container">
                    <ul id="contactListEntries">
                        {contacts && contacts.map(contact => {
                                return !contact.isPrivate ? (<ContactItem key={contact.id} contact={contact}/>) : null
                            }
                        )}
                    </ul>
                </div>
            </div>
        </div>
    )
}

function AdminContacts(props) {
    const {contacts} = props;
    return (
        <div className="modal" id="contactList">
            <div id="contact-content">
                <div className="modal-header">
                    <h2> Contact List </h2>
                </div>
                <div className="container" id="list-container">
                    <ul id="contactListEntries">
                        {contacts && contacts.map(contact => (
                                <ContactItem key={contact.id} contact={contact}/>
                            )
                        )}
                    </ul>
                </div>
            </div>
        </div>
    )
}

ContactList.propTypes = {
    isAdmin: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
    isAdmin: state.auth.user.isAdmin
});

export default connect(mapStateToProps)(ContactList);