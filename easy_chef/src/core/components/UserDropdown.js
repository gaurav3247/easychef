// ** React Imports
import {Link} from "react-router-dom";
import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";

// ** Custom Components
import Avatar from "../components/avatar";

// ** Reactstrap Imports
import {
    UncontrolledDropdown,
    DropdownMenu,
    DropdownToggle,
    DropdownItem,
} from "reactstrap";
import api from "../baseAPI";

const UserDropdown = ({OnRefresh}) => {
    const [userFullName, setuserFullName] = useState('')
    const [userAvatar, setUserAvatar] = useState('')
    const navigate = useNavigate();

    function logoutUser() {
        localStorage.removeItem("user_tokens");
        localStorage.removeItem("user");
        setuserFullName("");
        navigate("/");
        OnRefresh();
    }

    useEffect(() => {
        const requestOptions = {
            method: "GET",
        };

        api.get('/accounts/edit-profile/', requestOptions)
            .then((response) => {
                let data = response.data;
                setuserFullName(data.full_name);
                setUserAvatar(data.avatar);
            })
    }, [])

    return (
        <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
            <DropdownToggle
                href="/"
                tag="a"
                className="nav-link dropdown-user-link"
                onClick={(e) => e.preventDefault()}
            >
                <Avatar img={userAvatar}/>
            </DropdownToggle>
            <DropdownMenu end>
                <DropdownItem tag={Link} to="/user-profile">
                    <div className="d-flex">
                        <div className="flex-shrink-0 me-3">
                            <div className="avatar avatar-online">
                                <Avatar img={userAvatar}/>
                            </div>
                        </div>
                        <div className="flex-grow-1">
                            <span className="fw-semibold d-block">{userFullName}</span>
                            <small className="text-muted">User</small>
                        </div>
                    </div>
                </DropdownItem>
                <DropdownItem tag={Link} to="/user-profile">
                    <i className="ti ti-user-check me-2 ti-sm"></i>
                    <span className="align-middle">My Profile</span>
                </DropdownItem>
                <DropdownItem onClick={logoutUser}>
                    <i className="ti ti-logout me-2 ti-sm"></i>
                    <span className="align-middle">Log Out</span>
                </DropdownItem>
            </DropdownMenu>
        </UncontrolledDropdown>
    );
};

export default UserDropdown;
