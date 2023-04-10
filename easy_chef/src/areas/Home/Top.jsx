import React from "react";
import {NavLink} from "react-router-dom";

function Top(props) {
    const userId = `/user-profile/${props.id}`
    return (
        <NavLink to={userId} href="id">
            <li className="mb-3">
                <div className="d-flex align-items-start">
                    <div className="d-flex align-items-start">
                        <div className="avatar me-1">
                            <img src={props.avatar}
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