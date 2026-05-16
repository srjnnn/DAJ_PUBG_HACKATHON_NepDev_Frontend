
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRss, faChalkboardUser, faCircleUser } from '@fortawesome/free-solid-svg-icons';

const Nav = () => {
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4 flex justify-around">
            <Link to="/explore" className="text-center flex flex-col items-center">
                <FontAwesomeIcon icon={faRss} />
                <label>Explore</label>
            </Link>
            <Link to="/session" className="text-center flex flex-col items-center">
                <FontAwesomeIcon icon={faChalkboardUser} />
                <label>Session</label>
            </Link>
            <Link to="/profile" className="text-center flex flex-col items-center">
                <FontAwesomeIcon icon={faCircleUser} />
                <label>Profile</label>
            </Link>
        </div>
    );
};

export default Nav;
