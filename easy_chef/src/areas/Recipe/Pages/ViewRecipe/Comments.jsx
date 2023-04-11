import React from "react";
import { useState, useEffect } from "react";

function Comments(props) {
    const[profileAvatar, setProfileAvatar] = useState("");

    useEffect(() => {
        setProfileAvatar(props.avatar);
    }, [props.avatar]);
    return (
        <li className="chat-message">
        <div className="d-flex overflow-hidden">
            <div className="user-avatar flex-shrink-0 me-3">
                <div className="avatar avatar-sm">
                <img style={{"object-fit": "cover"}} width="42" height="42" src={profileAvatar ? profileAvatar : require('../../../../assets/img/default-avatar.png')}
                                 alt="Avatar" className="rounded-circle"/>
                </div>
            </div>
            <div className="chat-message-wrapper flex-grow-1">
                <h6 className="chat-contact-name text-truncate m-0">{props.full_name}</h6>
                <div className="chat-message-text">
                    <p className="mb-0">{props.text}</p>
                    <div id="carouselExample" className="carousel slide">
                        <div className="carousel-inner">
                            
                        </div>
                        <a className="carousel-control-prev" href="#carouselExample" role="button" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                        </a>
                        <a className="carousel-control-next" href="#carouselExample" role="button" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                        </a>
                    </div>
                </div>
                <div className="text-muted mt-1 mb-1">
                    <small>{props.date_created}</small>
                </div>
            </div>
        </div>
    </li>
    );
}

export default Comments;