import React from "react";
import { useState, useEffect } from "react";
import './Comments.css';
import Carousel from 'react-bootstrap/Carousel';

function Comments(props) {
    const[profileAvatar, setProfileAvatar] = useState("");
    const attachmentArray = props.attachments;

    function isImage(filename) {
        const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
        const extension = filename.substring(filename.lastIndexOf('.')).toLowerCase();
        return imageExtensions.includes(extension);
    }

    function isVideo(filename) {
        const videoExtensions = ['.mp4', '.mov', '.avi', '.wmv'];
        const extension = filename.substring(filename.lastIndexOf('.')).toLowerCase();
        return videoExtensions.includes(extension);
    }

    function renderItem(item) {
        if (isImage(item)) {
            return <img className="attachsize" src={item.includes('http') ? item : `http://127.0.0.1:8000/${item}`} alt={item} />;
        } else if (isVideo(item)) {
            return <video className="attachsize" src={item.includes('http') ? item : `http://127.0.0.1:8000${item}`} controls />;
        } else {
            return <small>Unsupported file type: {item}</small>;
        }
    }

    useEffect(() => {
        setProfileAvatar(props.avatar);
    }, [props.avatar]);

    return (
        <li className="chat-message">
         <div className="d-flex overflow-hidden">
            <div className="user-avatar flex-shrink-0 me-3">
                <div className="avatar avatar-sm">
                <img style={{"object-fit": "cover"}} width="42" height="42" src={profileAvatar ? profileAvatar.includes('http') ? profileAvatar : `http://127.0.0.1:8000${profileAvatar}` : require('../../../../assets/img/default-avatar.png')}
                                 alt="Avatar" className="rounded-circle"/>
                </div>
            </div>
            <div className="chat-message-wrapper flex-grow-1">
                <h6 className="chat-contact-name text-truncate m-0">{props.full_name}</h6>
                <div className="chat-message-text">
                    <p className="mb-0">{props.text}</p>
                    <Carousel indicators={false} interval={null}>
                        {attachmentArray.map((a, index) => (
                            <Carousel.Item>
                                {renderItem(a.attachment)}
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </div>
                <div className="text-muted mt-1 mb-1">
                    <small>{new Date(props.date_created).toLocaleDateString()}</small>
                </div>
            </div>
        </div>
    </li>
    );
}

export default Comments;