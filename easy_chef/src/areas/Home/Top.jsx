import React from "react";
import {NavLink} from "react-router-dom";
import { useState, useEffect } from "react";
import Avatar from "../../core/components/avatar";

function Top(props) {
    const userId = `/user-profile/${props.id}`
    const[profileAvatar, setProfileAvatar] = useState("");

    useEffect(() => {
        setProfileAvatar(props.avatar);
    }, [props.avatar]);

    return (
        <NavLink to={userId} href="id">
            <li className="mb-3">
                <div className="d-flex align-items-start">
                    <div className="d-flex align-items-start">
                        <div className="me-1">
                            <img style={{"object-fit": "cover"}} width="42" height="42" src={profileAvatar ? profileAvatar.includes('http') ? profileAvatar : `http://127.0.0.1:8000${profileAvatar}` : require('../../assets/img/default-avatar.png')}
                                 alt="Avatar" className="rounded-circle"/>
                        </div>
                        <div className="me-2 ms-1">
                            <h5 className="mb-0">{props.full_name}</h5>
                            <small className="text-muted">{props.number_of_recipes_created} created</small>
                        </div>
                    </div>
                </div>
            </li>
        </NavLink>
    );
}

export default Top;