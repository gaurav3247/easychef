import React from "react";

function Comments(props) {
    return (
        <li class="chat-message">
        <div class="d-flex overflow-hidden">
            <div class="user-avatar flex-shrink-0 me-3">
                <div class="avatar avatar-sm">
                <img src={props.avatar} alt="Avatar" class="rounded-circle" />
                </div>
            </div>
            <div class="chat-message-wrapper flex-grow-1">
                <h6 class="chat-contact-name text-truncate m-0">{props.full_name}</h6>
                <div class="chat-message-text">
                    <p class="mb-0">{props.text}</p>
                    <div id="carouselExample" class="carousel slide">
                        <div class="carousel-inner">
                            
                        </div>
                        <a class="carousel-control-prev" href="#carouselExample" role="button" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                        </a>
                        <a class="carousel-control-next" href="#carouselExample" role="button" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                        </a>
                    </div>
                </div>
                <div class="text-muted mt-1 mb-1">
                    <small>{props.date_created}</small>
                </div>
            </div>
        </div>
    </li>
    );
}

export default Comments;