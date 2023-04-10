import React, {useState, useEffect} from 'react'
import './profile.css'
import api from "../../../../core/baseAPI";
import {useParams} from 'react-router-dom';
import {Modal, ModalHeader} from 'reactstrap';
import ChangePasswordModal from '../../Modals/Change Password/change-password-popup';
import MyRecipes from "../../../Recipe/Pages/MyRecipes";
import FavoriteRecipe from "../../../Recipe/Pages/FavoriteRecipe";
import InteractionsRecipe from "../../../Recipe/Pages/InteractionsRecipe";

const UserProfile = () => {
    const {id} = useParams();
    const [profileName, setProfileName] = useState("");
    const [profileAvatar, setProfileAvatar] = useState("");
    const [profileEmail, setProfileEmail] = useState("");
    const [profilePhone, setProfilePhone] = useState("");
    const [profileCreated, setProfileCreated] = useState("");
    const [profileSaved, setProfileSaved] = useState("");
    const [profileRating, setProfileRating] = useState("");
    const [buttonData, setButtonData] = useState("");
    const [buttonClicked, setButtonClicked] = useState(0);
    const [showPopup, setPopup] = useState(false);

    const onClose = () => {
        setPopup(!showPopup)
    }

    useEffect(() => {
        let url = `/accounts/edit-profile/`;
        if (id) {
            url = `/accounts/details/${id}/`
        }
        api.get(url)
            .then((response) => {
                setProfileName(response.data.full_name);
                setProfileAvatar(response.data.avatar);
                setProfileEmail(response.data.email);
                setProfilePhone(response.data.phone_number);
                setProfileCreated(response.data.number_of_recipes_created);
                setProfileSaved(response.data.number_of_recipes_saved);
                setProfileRating(response.data.average_rating);
            });
    }, [id]);

    function CreatorRecipe() {
        setButtonClicked(0);
    }

    function FavRecipe() {
        setButtonClicked(1);
        api.get(`/recipe/favorites/`)
            .then((response) => {
                setButtonData(response.data);
            });
    }

    function InteractRecipe() {
        setButtonClicked(2);
        api.get(`/recipe/interactions/`)
            .then((response) => {
                setButtonData(response.data);
            });
    }

    function ProfileTabsContent() {
        if (buttonClicked === 0) {
            return (<MyRecipes isComponent={true} userID={id}></MyRecipes> )
        } else if (buttonClicked === 1) {
            return (<FavoriteRecipe isComponent={true}></FavoriteRecipe>)
        } else if (buttonClicked === 2) {
            return (<InteractionsRecipe isComponent={true}></InteractionsRecipe>)
        }
    }

    return (
        <div>
            <div>
                <h4>Personal Profile</h4>
                <div className="row">
                    <ChangePasswordModal show={showPopup} onClose={onClose} profileEmail={profileEmail}/>
                    <div className="col-lg-3">
                        <div className="card py-4 px-3">
                            <div className="d-flex justify-content-center">
                                <img style={{"height": "90px"}}
                                     src={profileAvatar ? `http://127.0.0.1:8000/${profileAvatar}` : require('../../../../assets/img/default-avatar.png')}
                                     alt=""
                                     className="d-block rounded user-profile-img"/>
                            </div>
                            <div className="text-center m-3 mb-0"><h4>{profileName}</h4></div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <p>
                                        <div className="jq-ry-container text-center mt-n4 mb-n2">
                                            <div
                                                className="jq-ry-group-wrapper">
                                                <div
                                                    className="jq-ry-normal-group jq-ry-group
                                star-icon"><span className="text">{profileRating}</span>
                                                    <svg version="1.1"
                                                         xmlns="http://www.w3.org/2000/svg" viewBox="0
                                  12.705 512 486.59" x="0px" y="0px"
                                                         width="15px"
                                                         height="15px" fill="orange">
                                                        <defs>
                                                            <linearGradient
                                                                id="half">
                                                                <stop offset="50%"
                                                                      stop-color="orange"></stop>
                                                                <stop offset="50%" stop-color="grey"></stop>
                                                            </linearGradient>
                                                            <linearGradient id="full">
                                                                <stop
                                                                    offset="100%" stop-color="orange"></stop>
                                                            </linearGradient>
                                                        </defs>
                                                        <polygon points="256.814,12.705
                                    317.205,198.566 512.631,198.566
                                    354.529,313.435 414.918,499.295
                                    256.814,384.427 98.713,499.295
                                    159.102,313.435 1,198.566 196.426,198.566 "></polygon>
                                                    </svg>
                                                    <svg version="1.1"
                                                         xmlns="http://www.w3.org/2000/svg" viewBox="0
                                  12.705 512 486.59" x="0px" y="0px"
                                                         width="15px"
                                                         height="15px" fill="orange" className="star-next">
                                                        <polygon
                                                            points="256.814,12.705 317.205,198.566
                                    512.631,198.566 354.529,313.435
                                    414.918,499.295 256.814,384.427
                                    98.713,499.295 159.102,313.435 1,198.566
                                    196.426,198.566 "></polygon>
                                                    </svg>
                                                    <svg version="1.1"
                                                         xmlns="http://www.w3.org/2000/svg" viewBox="0
                                  12.705 512 486.59" x="0px" y="0px"
                                                         width="15px"
                                                         height="15px" fill="orange" className="star-next">
                                                        <polygon
                                                            points="256.814,12.705 317.205,198.566
                                    512.631,198.566 354.529,313.435
                                    414.918,499.295 256.814,384.427
                                    98.713,499.295 159.102,313.435 1,198.566
                                    196.426,198.566 "></polygon>
                                                    </svg>
                                                    <svg version="1.1"
                                                         xmlns="http://www.w3.org/2000/svg" viewBox="0
                                  12.705 512 486.59" x="0px" y="0px"
                                                         width="15px"
                                                         height="15px" fill="orange" className="star-next">
                                                        <polygon
                                                            points="256.814,12.705 317.205,198.566
                                    512.631,198.566 354.529,313.435
                                    414.918,499.295 256.814,384.427
                                    98.713,499.295 159.102,313.435 1,198.566
                                    196.426,198.566 "></polygon>
                                                    </svg>
                                                    <svg version="1.1"
                                                         xmlns="http://www.w3.org/2000/svg" viewBox="0
                                  12.705 512 486.59" x="0px" y="0px"
                                                         width="15px"
                                                         height="15px" fill="grey" className="star-next">
                                                        <polygon
                                                            points="256.814,12.705 317.205,198.566
                                    512.631,198.566 354.529,313.435
                                    414.918,499.295 256.814,384.427
                                    98.713,499.295 159.102,313.435 1,198.566
                                    196.426,198.566 "></polygon>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </p>
                                </div>
                            </div>
                            <div className="d-flex justify-content-around my-2 pt-75">
                                <div className="d-flex align-items-start">
                                    <span style={{height: "31px", width: "31px"}}
                                          className="badge badge-center bg-label-primary rounded mt-1 me-2">
                                        <i className="ti-xs ti ti-chef-hat"></i>
                                    </span>
                                    <div className="ml-75 margin-top_2">
                                        <h5 className="mb-n1 font-size_9">{profileSaved}</h5>
                                        <small>Saved</small>
                                    </div>
                                </div>

                                <div className="d-flex align-items-start">
                        <span className="badge
                          badge-center bg-label-primary rounded mt-1 me-2 hw_31">
                          <i className="ti-xs ti ti-bookmarks"></i>
                        </span>
                                    <div className="ml-75 margin-top_2">
                                        <h5 className="mb-n1 font-size_9">{profileCreated}</h5>
                                        <small>Created</small>
                                    </div>
                                </div>
                            </div>
                            <div className="chat-history-header border-bottom"></div>
                            <div>
                                <p className="py-3 mb-0">DETAILS</p>
                                <div className="d-flex"><h6 className="me-2">Status:</h6><span
                                    className="badge bg-label-success w-25 h-50">Active</span></div>
                                <div className="d-flex"><h6 className="me-1">Email:</h6><small>{profileEmail}</small>
                                </div>
                                <div className="d-flex"><h6 className="me-1">Password:</h6><small
                                    className="me-1">*********</small><small>
                                    <a href="javascript:void(0)" onClick={() => setPopup(true)}>
                                        (ChangePassword)
                                    </a>
                                </small></div>
                                <div className="d-flex"><h6 className="me-1">Phone Number:</h6>
                                    <small>{profilePhone}</small>
                                </div>
                            </div>
                            <div className="d-flex justify-content-center">
                                <button className="btn btn-primary btn-sm
                        waves-effect waves-light btn_space my-1 width_35" type="button"
                                        data-bs-toggle="modal" data-bs-target="#edit-profile">Edit
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-9">
                        <ul className="nav nav-pills flex-column flex-md-row mb-4">
                            <li className="nav-item">
                                <button className={`nav-link ${buttonClicked === 0 ? 'active' : ''}`}
                                        onClick={CreatorRecipe}><i
                                    className="ti-xs ti ti-chef-hat me-1"></i>Recipes
                                </button>
                            </li>
                            <li className="nav-item">
                                <button className={`nav-link ${buttonClicked === 1 ? 'active' : ''}`}
                                        onClick={FavRecipe}><i className="ti-xs ti
                          ti-bookmarks me-1"></i>Favorite Recipes
                                </button>
                            </li>
                            <li className="nav-item">
                                <button className={`nav-link ${buttonClicked === 2 ? 'active' : ''}`}
                                        onClick={InteractRecipe}><i className="ti-xs ti ti-history
                          me-1"></i>Interactions
                                </button>
                            </li>
                        </ul>
                        <div className="row me-n5" id='interaction-buttons'>
                            {ProfileTabsContent()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile
