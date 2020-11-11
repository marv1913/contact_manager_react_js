import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {getContact, updateContact} from "../../store/actions/contactActions";

class EditContactForm extends Component {
    state = {
        forename: "",
        name: "",
        street: "",
        postId: "",
        town: "",
        country: "",
        isPrivate: false,
        id: "",
        latitude: "",
        longitude: ""
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextState) {
        const {forename, name, street, postId, town, country, isPrivate, longitude, latitude} = nextProps.contact;
        this.setState({
            forename,
            name,
            street,
            postId,
            town,
            country,
            isPrivate,
            longitude,
            latitude
        });
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.getContact(id);
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
        const {forename, name, street, postId, town, country, isPrivate, longitude, latitude} = this.state;
        const {id} = this.props.match.params;

        const updateContact = {
            id,
            forename,
            name,
            street,
            postId,
            town,
            country,
            isPrivate,
            longitude,
            latitude
        }

        this.props.updateContact(updateContact)

        this.setState({
            forename: "",
            name: "",
            street: "",
            postId: "",
            town: "",
            country: "",
            isPrivate: "",
            longitude: "",
            latitude: ""
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
                        <h2>Update Address</h2>
                    </div>
                    <div className="container">
                        <label htmlFor="forname">Forename:</label>
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
                        <button type="submit" className="form-button">Update</button>
                    </div>
                </form>
            </div>
        );
    }
}

EditContactForm.propTypes = {
    contact: PropTypes.object.isRequired,
    getContact: PropTypes.func.isRequired,
    updateContact: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    contact: state.contact.contact
});

export default connect(mapStateToProps, {getContact, updateContact})(EditContactForm);