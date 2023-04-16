// ** React Imports
import {forwardRef} from "react";

const Avatar = forwardRef((props, refs) => {
    // ** Props
    const {
        img
    } = props;
    return (
        <div className="avatar avatar-online">
            {!img ? (
                <img src={require('../../../assets/img/default-avatar.png')} alt="" className="h-auto rounded-circle"/>
            ) : (
                <img style={{"object-fit": "cover"}} src={`http://127.0.0.1:8000${img}`} alt="" className="rounded-circle" width="40"
                     height="40"/>
            )}
        </div>
    );
});

export default Avatar;

