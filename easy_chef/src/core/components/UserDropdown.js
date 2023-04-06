// ** React Imports
import { Link } from "react-router-dom";

// ** Custom Components
import Avatar from "../components/avatar";

// ** Reactstrap Imports
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
} from "reactstrap";

const UserDropdown = () => {
  return (
    <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
      <DropdownToggle
        href="/"
        tag="a"
        className="nav-link dropdown-user-link"
        onClick={(e) => e.preventDefault()}
      >
        <Avatar/>
      </DropdownToggle>
      <DropdownMenu end>
        <DropdownItem tag={Link} to="/user-profile">
          <div className="d-flex">
            <div className="flex-shrink-0 me-3">
              <div className="avatar avatar-online">
                <img src={require('../../assets/img/default-avatar.png')} alt=""
                  className="h-auto rounded-circle"/>
              </div>
            </div>
            <div className="flex-grow-1">
              <span className="fw-semibold d-block">Brittney Doe</span>
              <small className="text-muted">User</small>
            </div>
          </div>
        </DropdownItem>
        <DropdownItem tag={Link} to="/user-profile" >
          <i className="ti ti-user-check me-2 ti-sm"></i>
          <span className="align-middle">My Profile</span>
        </DropdownItem>
        <DropdownItem tag={Link} to="/log-out">
          <i className="ti ti-logout me-2 ti-sm"></i>
          <span className="align-middle">Log Out</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default UserDropdown;
