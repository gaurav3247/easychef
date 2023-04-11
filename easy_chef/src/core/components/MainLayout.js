import Menu from './Menu'
import NavBar from './NavBar'
import Footer from './Footer'
import {forwardRef, useImperativeHandle, useRef, useState} from "react";
import {Toaster} from "react-hot-toast";

const MainLayout = forwardRef(({children}, ref) => {
    const [refresh, setRefresh] = useState(false);
    const nabBarRef = useRef();

    function Refresh() {
        setRefresh(!refresh);
        nabBarRef.current.ReRender();
    }

    useImperativeHandle(ref, () => ({
        ReRender(){
            Refresh();
        }
    }));

    return (
        <div className="layout-wrapper layout-navbar-full layout-horizontal layout-without-menu">
            <div className="layout-container">
                <NavBar ref={nabBarRef} OnLoggedIn={Refresh}/>
                <div className="layout-page">
                    <div className="content-wrapper">
                        <Menu/>
                        <div className="container-xxl flex-grow-1 container-p-y">
                            <div>
                                <Toaster
                                    position="bottom-right"
                                    reverseOrder={false}/>
                            </div>
                            {children}
                        </div>
                        <Footer/>
                        <div className="content-backdrop fade"></div>
                    </div>
                </div>
            </div>
        </div>
        )
});

export default MainLayout