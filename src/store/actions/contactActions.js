import {
    GET_CONTACTS,
    DELETE_CONTACT,
    GET_CONTACT,
    UPDATE_CONTACT, ADD_CONTACT
} from './types';
import axios from 'axios';

/** get all contacts from Rest server endpoint**/
export const getContacts = () => dispatch => {
    axios.get('http://10.5.0.5:3300/adViz/contacts').then(res => {
        console.log(res);
        dispatch({
            type: GET_CONTACTS,
            payload: res.data
        });
    })
};

/** send an id to the Rest server endpoint, to get one contact
 * @param id **/
export const getContact = id => dispatch => {
    axios.get(
        `http://10.5.0.5:3300/adViz/contacts/${id}`
    ).then(res => {
        dispatch({
            type: GET_CONTACT,
            payload: res.data
        });
    })

};

/** send a new contact to the Rest server endpoint
 * @param contact **/
export const addContact = contact => dispatch => {
    axios.post(
        `http://10.5.0.5:3300/adViz/contacts`,
        contact
    ).then(res => {
        dispatch({
            type: ADD_CONTACT,
            payload: res.data
        });
    }).catch(() => {
        alert("Address not found!!!")
    });
};

/** send an id to the Rest server endpoint, to delete an contact
 * @param id **/
export const deleteContact = id => dispatch => {
    axios.delete(`http://10.5.0.5:3300/adViz/contacts/${id}`).then(() => {
        dispatch({
            type: DELETE_CONTACT,
            payload: id
        });
    }).catch(() => {
        alert("Wrong Contact ID");
    });
};

/** send an updated contact to Rest server endpoint
 * @param contact **/
export const updateContact = contact => dispatch => {
    axios.put(
        `http://10.5.0.5:3300/adViz/contacts/${contact.id}`,
        contact
    ).then((res) => {
        dispatch({
            type: UPDATE_CONTACT,
            payload: res.data
        });
    }).catch(() => {
        alert("Address not found!!!")
    })
};
