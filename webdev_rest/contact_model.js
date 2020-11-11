const Pool = require('pg').Pool;
const axios = require('axios');

let pool = new Pool({
    user: 'postgres',
    host: '10.5.0.6',
    database: 'postgres',
    password: 'admin',
    port: 5432,
});


/**
 * method to get all contacts in database
 * @returns JSON of all contacts stored in database
 */
const getContacts = () => {
    return new Promise(function (resolve, reject) {
        pool.query('SELECT * FROM contacts order by id asc', (error, results) => {
            if (error) {
                reject(error)
            }
            let my_result = results.rows
            my_result.map(contact => {
                contact.postId = contact.postid;
                delete contact.postid;
                contact.isPrivate = contact.isprivate;
                delete contact.isprivate;
            });
            resolve(my_result)
        })
    })
};

/**
 * method to get specific contact from database
 * @returns JSON of specific contact
 */
const getContact = (id) => {
    return new Promise(function (resolve, reject) {
        pool.query('SELECT * FROM contacts WHERE id=$1', [id], (error, results) => {
            if (error) {
                reject(error)
            }

            let my_result = results.rows

            my_result[0].postId = my_result[0].postid;
            delete my_result[0].postid;
            my_result[0].isPrivate = my_result[0].isprivate;
            delete my_result[0].isprivate;
            resolve(my_result[0]);
        })
    })
};

/**
 * method to get specific contact from database
 * @returns JSON of specific contact
 */
const getNewId = () => {
    return new Promise(function (resolve, reject) {
        pool.query('SELECT * FROM contacts', (error, results) => {
            if (error) {
                reject(error)
            }

            let my_result = results.rows
            let currentIds = []
            my_result.map((result) => {
                currentIds.push(result.id)
            });
            for (let i = 1; i < 10000; i++) {
                if (!currentIds.includes(i)) {
                    resolve(i);
                }
            }
        })
    })
};

/**
 * method to add a new contact to the database
 * @param body JSON with necessary information
 * example for correct JSON: {'forename': 'Marvin', 'name': 'Rausch', 'street': 'Gaillardstraße', 'postId': 13187,
               "latitude": 52.45, 'longitude': 13.42, 'isPrivate': 'true', 'town': 'berlin', 'country': 'Deutschland'}
 * @returns if contact was successfully added to database: JSON of new contact; else response text of database
 */
const createContact = (body) => {
    return new Promise(function (resolve, reject) {

        // firstly get all contacts to determine a correct id for the new contact
        addressExisting(body.street + " " + body.postId + " " + body.town).then((return_value) => {
            if (return_value !== 'address not found') {
                let markerPos = return_value;
                getNewId().then(response => {
                    let new_id = response;
                    const {forename, name, street, postId, town, country, isPrivate} = body
                    pool.query('INSERT INTO contacts (forename, name, street, postId, town, country, id, isPrivate,' +
                        ' latitude, longitude) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *', [forename, name, street, postId, town, country, new_id, isPrivate, markerPos[0], markerPos[1]], (error, results) => {
                        if (error) {
                            reject(error)
                        }
                        if (results !== undefined) {
                            getContact(new_id).then(response => {
                                resolve(response)
                            })
                        }
                    })
                })
            } else {
                reject('address not found')
            }
        }).catch(error => {
            reject(error)
        })
    })
};

/***
 * method to check username and password
 * @param body JSON with login data
 * example for correct format: {'username': 'admin', 'password': 'admin'}
 * @returns a Promise object which contains the login data when they were correct;
 * else Promise object with error message
 */
const checkCredentials = (body) => {
    console.log(pool)
    return new Promise(function (resolve, reject) {

        const {username, password} = body
        pool.query('SELECT * from users where username=$1 and password=$2', [username, password], (error, results) => {
            if (error) {
                reject(error)
            }
            if (results.rowCount === 0) {
                reject("error: login data were not correct")
            } else {
                let my_result = results.rows[0];
                my_result.isAdmin = my_result.isadmin;
                delete my_result.isadmin;
                resolve(my_result);
            }
        })
    })
};

/**
 * method to update an existing contact in the database
 * @param id id of contact you want to edit
 * @param body JSON with contact data
 * example for correct JSON: {'forename': 'Marvin', 'name': 'Rausch', 'street': 'Gaillardstraße', 'postId': 13187,
               "latitude": 52.45, 'longitude': 13.42, 'isPrivate': 'true', 'town': 'berlin', 'country': 'Deutschland'}
 * @returns a Promise object which contains a return message
 */
const updateContact = (id, body) => {
    return new Promise(function (resolve, reject) {
        addressExisting(body.street + " " + body.postId + " " + body.town).then((return_value) => {
            if (return_value !== 'address not found') {
                let markerPos = return_value;
                const {forename, name, street, postId, town, country, isPrivate} = body
                pool.query('UPDATE contacts set forename=$1, name=$2, street=$3, postId=$4, town=$5, country=$6, ' +
                    'isPrivate=$7, latitude=$8, longitude=$9 where id=$10', [forename, name, street, postId, town, country, isPrivate, markerPos[0], markerPos[1], id], (error, results) => {
                    if (error) {
                        console.log(error)
                        reject(error)
                    }
                    if (results.rowCount === 0) {
                        reject("contact to update was not found in database")
                    } else {
                        console.log('contact has been updated')
                        getContact(id).then(response => {
                            console.log(response)
                            resolve(response)
                        });
                    }
                })
            } else {
                reject('address not found')
            }
        }).catch(error => {
            reject(error)
        })
    })
};

/**
 * method to delete a contact in database
 * @param id id of contact you want to delete
 * @returns {Promise<unknown>}
 */
const deleteContact = (id) => {
    return new Promise(function (resolve, reject) {
        pool.query('DELETE FROM contacts WHERE id = $1', [id], (error, results) => {
            if (error) {
                console.log(error)
                reject(error)
            }
            if (results.rowCount === 0) {
                reject("contact to delete was not found in database")
            } else {
                resolve(`contact deleted with ID: ${id}`)
            }
        })
    })
};


const addressExisting = (address) => {
    return new Promise(function (resolve, reject) {
        let params = new URLSearchParams(address);
        let url = "https://api.tomtom.com/search/2/geocode/" + params + ".json?countrySet=DE&key=SL0aR93PQoAaWTez8PLTAGhARjEgeDhf";
        axios.get(url)
            .then(
                (results) => {
                    try {
                        //let latitude = results.data.results[0].position.lat;
                        let latitde = 52.520007;
                     	let longitude = 13.404954;
                        //let longitude = results.data.results[0].position.lon;

                        resolve([latitude, longitude])
                    } catch (e) {
                        reject('address was not found')
                    }
                }
            )
    })
};

/***
 * method to create a new user
 * @param body JSON with login data
 * example for correct format: {'username': 'admin', 'password': 'admin', 'isAdmin': True}
 * @returns a Promise object which contains the login data when they were correct;
 * else Promise object with error message
 */
const createNewUser = (body) => {
    return new Promise(function (resolve, reject) {
        const {username, password, isAdmin} = body
        if (isAdmin === undefined || username === undefined || password === undefined) {
            reject('request has a bad format')
        } else {
            pool.query('INSERT INTO users VALUES ($1, $2, $3)', [username, password, isAdmin], (error) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(body);
                }
            })
        }
    })
};

/**
 * method to delete an user in database
 * @param username username of contact you want to delete
 * @returns {Promise<unknown>}
 */
const deleteUser = (username) => {
    return new Promise(function (resolve, reject) {
        pool.query('DELETE FROM users WHERE username = $1', [username], (error, results) => {
            if (error) {
                console.log(error)
                reject(error)
            }
            if (results.rowCount === 0) {
                reject("contact to delete was not found in database")
            } else {
                resolve(`user deleted with username: ${username}`)
            }
        })
    })
};


module.exports = {
    getContacts: getContacts,
    createContact: createContact,
    deleteContact: deleteContact,
    updateContact: updateContact,
    checkCredentials: checkCredentials,
    getContact: getContact,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
}
