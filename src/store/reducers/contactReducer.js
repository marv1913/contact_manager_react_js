const initialState = {
    contacts: [],
    contact: {}
}

/**function gets an action and changes the contacts and contact state
 * @param action**/
export default function (state = initialState, action) {

    switch (action.type) {
        case "GET_CONTACTS":
            return {
                ...state,
                contacts: action.payload
            };
        case  "GET_CONTACT":
            return {
                ...state,
                contact: action.payload
            };
        case "DELETE_CONTACT":
            return {
                ...state,
                contacts: state.contacts.filter(
                    contact => contact.id !== action.payload
                )
            };
        case "ADD_CONTACT":
            return {
                ...state,
                contacts: [...state.contacts, action.payload]
            };
        case "UPDATE_CONTACT":
            return {
                ...state,
                contacts: state.contacts.map(contact =>
                    contact.id === action.payload.id
                        ? action.payload
                        : contact
                )
            };
        default:
            return state;
    }
}