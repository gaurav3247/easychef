import { NavLink, useLocation } from "react-router-dom";

function NavBar(){
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path;
    };
    
    return (
        <aside id="layout-menu" className="layout-menu-horizontal menu-horizontal menu bg-menu-theme flex-grow-0"
            data-bg-class="bg-menu-theme" style={{"userSelect": "none", "touchAction": `none`}}>
            <div className="container-xxl d-flex h-100">
                <a href="#" className="menu-horizontal-prev d-none"></a>
                <div className="menu-horizontal-wrapper">
                    <ul className="menu-inner py-1" style={{"marginLeft": "0px"}}>
                        <li className={"menu-item " + (isActive("/") ? "active" : "")}>
                            <NavLink to="/" activeclassname="active" className="menu-link">
                                <i className="menu-icon tf-icons ti ti-smart-home"></i>
                                Home
                            </NavLink>
                        </li>
                        <li className={"menu-item " + (isActive("/all-recipes") ? "active" : "")}>
                            <NavLink to="/all-recipes" activeclassname="active"  className="menu-link">
                                <i className="menu-icon tf-icons ti ti-receipt"></i>
                                All Recipes
                            </NavLink>
                        </li>
                        <li className={"menu-item " + (isActive("/my-recipes") ? "active" : "")}>
                            <NavLink to="/my-recipes" activeclassname="active"  className="menu-link">
                                <i className="menu-icon tf-icons ti ti-book"></i>
                                My Recipes
                            </NavLink>
                        </li>
                        <li className={"menu-item " + (isActive("/shopping-list") ? "active" : "")}>
                            <NavLink to="/shopping-list" activeclassname="active"  className="menu-link">
                                <i className="menu-icon tf-icons ti ti-shopping-cart"></i>
                                Shopping List
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <a href="#" className="menu-horizontal-next d-none"></a></div>
        </aside>
    )
}

export default NavBar
