import Menu from './Menu'
import NavBar from './NavBar'
import Footer from './Footer'

const MainLayout = ({children}) => {
    return (
        <div className="layout-wrapper layout-navbar-full layout-horizontal layout-without-menu">
            <div className="layout-container">
                <NavBar/>
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