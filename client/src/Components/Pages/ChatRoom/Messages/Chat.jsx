import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import moment from 'moment';

import ActiveUsers from './ActiveUsers';
import Messages from './Messages';

let socket;

function Chat() {
    const [state, setState] = useState({
        users: [],
        messages: [],
        newMsg: '',
        fetchingLocation: false
    });
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        socket = io('http://localhost:8080');

        socket.emit('join', params, function (err) {
            if (err) {
                navigate('/');
            }
        });

        socket.on('updateUserList', function (users) {
            setState(prev => ({ ...prev, users }));
        });

        socket.on('newMessage', (message) => {
            let formattedTime = moment(message.createdDate).format('h:mm a');
            let newMsg = {
                text: message.text,
                from: message.from,
                room: message.room,
                createdDate: formattedTime
            };
            setState(prev => ({
                ...prev,
                messages: [...prev.messages, newMsg]
            }));
        });

        socket.on('disconnect', function () {
            console.log('Connection lost from server.');
        });

        return () => {
            socket.emit('leave', params);
            socket.off();
        };
    }, [navigate, params]);

    const inputUpdate = (e) => {
        const { name, value } = e.target;
        setState(prev => ({ ...prev, [name]: value }));
    };

    const newMessage = (e) => {
        e.preventDefault();
        if (state.newMsg.trim()) {
            socket.emit('createMessage', { text: state.newMsg }, function () {});
            setState(prev => ({ ...prev, newMsg: '' }));
        }
    };

    const sendLocation = () => {
        setState(prev => ({ ...prev, fetchingLocation: true }));
        if (!navigator.geolocation) {
            alert('GeoLocation not supported by your browser');
            return;
        }
        navigator.geolocation.getCurrentPosition((position) => {
            socket.emit('createLocationMsg', {
                lat: position.coords.latitude,
                lon: position.coords.longitude
            });
            setState(prev => ({ ...prev, fetchingLocation: false }));
        }, () => {
            alert('Unable to fetch location');
            setState(prev => ({ ...prev, fetchingLocation: false }));
        });
    };

    return (
        <div className="chatPage">

        {/* <LoadingScreen
            loading={this.state.fetchingLocation}
            bgColor='#F5F7F4'
            spinnerColor='#3597DE'
            textColor='#010000'
            text='Fetching your current location'
        >
            <div className="hide"></div>
        </LoadingScreen> */}

            <ActiveUsers users={state.users} />
            <Messages messages={state.messages} room={params.room} />
            <form onSubmit={newMessage} id="message-form" className="message-form">
                <input 
                    type="text" 
                    value={state.newMsg} 
                    onChange={inputUpdate} 
                    name="newMsg" 
                    placeholder="Type a message..." 
                    autoComplete="off" 
                />
                <button type="submit">Send</button>
                <button type="button" onClick={sendLocation}>Send Location</button>
            </form>
        </div>
    );
}

export default Chat;
