// ** React Imports
import {forwardRef} from "react";

const Avatar = forwardRef((props, refs) => {
    // ** Props
    const {
        img
    } = props;
    return (
        <div className="avatar avatar-online">
            {img === false || img === undefined ? (
                <img src={require('../../../assets/img/default-avatar.png')} alt="" className="h-auto rounded-circle"/>
            ) : (
                <img src={require(img)} alt="" className="h-auto rounded-circle"/>
            )}
        </div>
    );
});

export default Avatar;

