import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes

function ActiveUsers({ users }) {
    return (
        <div className="activeUsers">
            <h2 className="headline">Active users</h2>
            <div id="users">
                <ul>
                    {users.map((user, index) => (
                        <li key={index}>
                            <i className="fas fa-circle"></i>
                            <span>{user}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

ActiveUsers.propTypes = {
    users: PropTypes.arrayOf(PropTypes.string).isRequired // Define PropTypes for users
};

export default ActiveUsers;