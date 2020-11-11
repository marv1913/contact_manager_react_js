import React, {Component} from 'react';
import {LayersControl, Map, Marker, Popup, TileLayer} from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {LocationIcon} from "../../constants/LocationIcon";

const {BaseLayer} = LayersControl;

class MapView extends Component {

    state = {
        currentLocation: {
            lat: 52.5172,
            lng: 13.3916
        },
        zoom: 11,
    }

    render() {
        const {currentLocation, zoom} = this.state;
        const {contacts} = this.props;
        const isAdmin = this.props.isAdmin;
        if (isAdmin) {
            return (
                <Map id="map" center={currentLocation} zoom={zoom}>
                    <LayersControl position="topright">
                        <BaseLayer checked name="OpenStreetMap.Mapnik">
                            <TileLayer
                                attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                        </BaseLayer>
                        <BaseLayer name="OpenStreetMap.Toner">
                            <TileLayer
                                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="http://tile.stamen.com/toner/{z}/{x}/{y}.png"
                            />
                        </BaseLayer>
                    </LayersControl>
                    <GetAllAdminMarkers contacts={contacts}/>
                </Map>
            )
        } else {
            return (
                <Map id="map" center={currentLocation} zoom={zoom}>
                    <TileLayer
                        attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <GetAllNormaloMarkers contacts={contacts}/>
                </Map>
            )
        }
    }
}

function GetAllNormaloMarkers(props) {
    const {contacts} = props
    return (
        contacts && contacts.map((contact) => {
            return !contact.isPrivate ? (
                <Marker key={`marker-${contact.id}`} position={[contact.latitude, contact.longitude]}
                        icon={LocationIcon}>
                    <Popup>{contact.forename + " " + contact.name}</Popup>
                </Marker>) : null
        })
    )
}

function GetAllAdminMarkers(props) {
    const {contacts} = props
    return (
        contacts && contacts.map((contact) =>
            <Marker key={`marker-${contact.id}`} position={[contact.latitude, contact.longitude]}
                    icon={LocationIcon}>
                <Popup>{contact.forename + " " + contact.name}</Popup>
            </Marker>
        )
    )
}

MapView.propTypes = {
    contacts: PropTypes.array.isRequired,
    isAdmin: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
    contacts: state.contact.contacts,
    isAdmin: state.auth.user.isAdmin
})

export default connect(mapStateToProps)(MapView);