import {Link} from "react-router-dom";
import NotFoundImg from "../../../assets/img/404.svg"

export default function NotFound() {
    return (
        <div className="container justify-items-center text-center mt-n4">
            <img src={NotFoundImg} alt="Card image cap" style={{height: "31rem", margin: "auto", display: "block"}}></img>
            <h1 className="mt-3">Oops! You seem to be lost.</h1>
            <Link to='/' className="btn btn-primary btn-lg waves-effect waves-light">Home</Link>
        </div>
    )
}
