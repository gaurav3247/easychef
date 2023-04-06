import UserDropdown from './UserDropdown'
import {NavLink, useLocation} from "react-router-dom";

const NavBar = () => {
    return (
        <nav className="layout-navbar navbar navbar-expand-xl align-items-center bg-navbar-theme" id="layout-navbar">
            <div className="container-xxl">
                <div className="navbar-brand app-brand demo d-none d-xl-flex py-0 me-4">
                    <NavLink to="/" className={"app-brand-link gap-2"}>
                        <span className="app-brand-logo">
                            <img src={require('../../assets/img/logo.png')} alt="" className="h-auto"/>
                        </span>
                        <span className="app-brand-text demo menu-text fw-bold">Easy Chef</span>
                    </NavLink>
                    <a href={void (0)} className="layout-menu-toggle menu-link text-large ms-auto d-xl-none">
                        <i className="ti ti-x ti-sm align-middle"></i>
                    </a>
                </div>
                <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
                    <a className="nav-item nav-link px-0 me-xl-4" href={void (0)}>
                        <i className="ti ti-menu-2 ti-sm"></i>
                    </a>
                </div>
                <div className="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
                    <ul className="navbar-nav flex-row align-items-center ms-auto">
                        <li className="nav-item navbar-search-wrapper me-2 me-xl-0">
                            <NavLink to="/new-recipe">
                                <i className="ti ti-file-plus ti-md"></i>
                            </NavLink>
                        </li>
                        <li className="nav-item navbar-search-wrapper me-2 me-xl-0">
                            <a className="nav-link search-toggler" href={void (0)}>
                                <i className="ti ti-search ti-md"></i>
                            </a>
                        </li>
                        <UserDropdown/>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar