import Menu from './Menu'
import NavBar from './NavBar'
import Footer from './Footer'
import {useState} from "react";

const MainLayout = ({children}) => {
    const [refresh, setRefresh] = useState(false);
    function Refresh(){
        setRefresh(!refresh);
    }
    return (
        <div className="layout-wrapper layout-navbar-full layout-horizontal layout-without-menu">
            <div className="layout-container">
                <NavBar OnLoggedIn={Refresh}/>
                <div className="layout-page">
                    <div className="content-wrapper">
                        <Menu/>
                        <div className="container-xxl flex-grow-1 container-p-y">
                            {children}
                        </div>
                        <Footer/>
                        <div className="content-backdrop fade"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainLayout