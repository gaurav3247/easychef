import React from "react";
import api from "../../../../core/baseAPI";

function Ingredients(props) {
    return (
        <tr>
            <td>{props.name}</td>
            <td>{props.quantity}</td>
        </tr>
    );
}

export default Ingredients;