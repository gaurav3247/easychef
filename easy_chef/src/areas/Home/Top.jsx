import React from "react";
import {NavLink} from "react-router-dom";

function Top(props) {
    const userId = `/user-profile/${props.id}`
    return (
        <NavLink to={userId} href="id">
            <li class="mb-3">
                <div class="d-flex align-items-start">
                    <div class="d-flex align-items-start">
                        <div class="avatar me-1">
                            <img src={props.avatar}
                                 alt="Avatar" class="rounded-circle"/>
                        </div>
                        <div class="me-2 ms-1">
                            <h5 class="mb-0">{props.full_name}</h5>
                            <small class="text-muted">{props.number_of_recipes_created} created</small>
                        </div>
                    </div>
                </div>
            </li>
        </NavLink>
    );
}

export default Top;