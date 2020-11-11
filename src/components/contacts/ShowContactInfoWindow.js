import React, {Component} from "react";
import {Link} from "react-router-dom";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getContact} from "../../store/actions/contactActions";

class ShowContactInfoWindow extends Component {
    state = {
        forename: "",
        name: "",
        street: "",
        postId: "",
        town: "",
        country: "",
        isPrivate: false
    }

    //TODO: Properties are undefined when loading the component.
    UNSAFE_componentWillReceiveProps(nextProps, nextState) {
        const {forename, name, street, postId, town, country, isPrivate,} = nextProps.contact;
        this.setState({
            forename,
            name,
            street,
            postId,
            town,
            country,
            isPrivate,
        });
    }

    componentDidMount() {
        const {id} = this.props.match.params;
        this.props.getContact(id);
    }

    render() {
        const {forename, name, street, postId, town, country, isPrivate} = this.state;
        return this.state && (
            <div className="modal" id="modalAddressInfo">
                <div className="modal-content">
                    <div className="modal-header">
                        <Link to={`/main`}>
                            <span className="close-button">&times;</span>
                        </Link>
                        <h2>Address</h2>
                    </div>
                    <div className="container">
                        <label htmlFor="forename">Forename:</label>
                        <input type="text" id="forename" value={forename} readOnly={true} disabled={true}/>
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" value={name} readOnly={true} disabled={true}/>
                        <label htmlFor="street">Street:</label>
                        <input type="text" id="street" value={street} readOnly={true} disabled={true}/>
                        <label htmlFor="postId">Postcode:</label>
                        <input type="number" id="postId" value={postId} readOnly={true} disabled={true}/>
                        <label htmlFor="town">Town:</label>
                        <input type="text" id="town" value={town} readOnly={true} disabled={true}/>
                        <label htmlFor="country">Country:</label>
                        <input type="text" id="country" value={country} readOnly={true} disabled={true}/>
                        <label htmlFor="updateAddressCheck">Private:</label>
                        <input type="checkbox" id="updateAddressCheck" value={isPrivate}
                               checked={isPrivate}
                               disabled={true}/>
                    </div>
                </div>
            </div>
        )
    }


}

ShowContactInfoWindow.propTypes = {
    contact: PropTypes.object.isRequired,
    getContact: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    contact: state.contact.contact
});

export default connect(mapStateToProps, {getContact})(ShowContactInfoWindow);