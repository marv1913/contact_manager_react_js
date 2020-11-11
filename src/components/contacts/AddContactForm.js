import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import {addContact} from '../../store/actions/contactActions';
import PropTypes from 'prop-types';

class AddContactForm extends Component {
    state = {
        forename: "",
        name: "",
        street: "",
        postId: "",
        town: "",
        country: "",
        isPrivate: false,
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    handleCheckboxChange = (e) => {
        this.setState({
            isPrivate: !this.state.isPrivate
        });
    }


    onSubmit = (e) => {
        e.preventDefault();
        const {forename, name, street, postId, town, country, isPrivate} = this.state;

        let newContact = {
            forename,
            name,
            street,
            postId,
            town,
            country,
            isPrivate,
        }

        this.props.addContact(newContact)

        this.setState({
            forename: "",
            name: "",
            street: "",
            postId: "",
            town: "",
            country: "",
            isPrivate: false,
        });
        this.props.history.push("/main");
    };

    render() {
        const {forename, name, street, postId, town, country, isPrivate} = this.state;
        return (
            <div className="modal" id="modalAddress">
                <form className="modal-content" id="AddressForm"
                      onSubmit={this.onSubmit}>
                    <div className="modal-header">
                        <Link to={"/main"}>
                            <span className="close-button">&times;</span>
                        </Link>
                        <h2>Add New Address</h2>
                    </div>
                    <div className="container">
                        <label htmlFor="forename">Forename:</label>
                        <input type="text" id="forename" value={forename} onChange={this.handleChange}
                               required/>
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" value={name} onChange={this.handleChange} required/>
                        <label htmlFor="street">Street:</label>
                        <input type="text" id="street" value={street} onChange={this.handleChange}
                               required/>
                        <label htmlFor="postId">Postcode:</label>
                        <input type="number" id="postId" value={postId} onChange={this.handleChange}
                               required/>
                        <label htmlFor="town">Town:</label>
                        <input type="text" id="town" value={town} onChange={this.handleChange} required/>
                        <label htmlFor="country">Country:</label>
                        <input type="text" id="country" value={country} onChange={this.handleChange}
                               required/>
                        <label htmlFor="updateAdressCheck">Private:</label>
                        <input type="checkbox" id="updateAddressCheck" value={isPrivate} checked={isPrivate}
                               onChange={this.handleCheckboxChange}/>
                        <button type="submit" className="form-button">Add</button>
                    </div>
                </form>
            </div>
        );
    }
}

AddContactForm.propsType = {
    addContact: PropTypes.func.isRequired,
};

export default connect(null, {addContact})(AddContactForm);