import {Link} from "react-router-dom";
import img_avatar from "../../assets/img_avatar.jpg";
import React, {Component} from "react";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {deleteContact} from "../../store/actions/contactActions";

class ContactItem extends Component {

    state = {
        showContactAction: false
    };

    onDeleteClick = id => {
        this.props.deleteContact(id);
    };

    render() {

        const {id, forename, name} = this.props.contact
        const {showContactAction} = this.state;
        return (
            <div>
                <li key={id}>
                    {/*TODO: add onClick Handler to display current Contact Position on Map*/}
                    <div className="chip">
                        <Link to={`/show/${id}`} key={id}>
                            <img id="contactIcon" src={img_avatar} alt="Avatar Icon"/>
                            <span
                                id="contactName"> {forename + " " + name} </span>
                        </Link>
                        {this.props.user.isAdmin && (
                            <span id="moreAction-button" onClick={() => this.setState({
                                showContactAction: !this.state.showContactAction
                            })}>&darr;</span>
                        )}
                    </div>
                </li>
                {showContactAction ? (
                    <div>
                        <span className="popup-button" id="delete-button"
                              onClick={this.onDeleteClick.bind(this, id)}>Delete</span>
                        <Link to={`/edit/${id}`}>
                            <span className="popup-button" id="edit-button">Edit</span>
                        </Link>
                    </div>
                ) : null}
            </div>
        )
    }
}

ContactItem.propTypes = {
    user: PropTypes.object.isRequired,
    deleteContact: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    user: state.auth.user
});

export default connect(mapStateToProps, {deleteContact})(ContactItem);