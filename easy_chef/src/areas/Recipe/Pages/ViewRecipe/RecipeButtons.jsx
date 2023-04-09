import React from "react";
import api from "../../../../core/baseAPI";
import { Link } from "react-router-dom"

function RecipeButtons(props) {
    function deleteClick() {
        console.log('Button was clicked');
        api.delete(`/recipe/delete/${props.id}`)
            .then(response => {
                console.log('User deleted successfully');
            })
            .catch(error => {
                console.error('Error deleting user', error);
        });
    }
    function addClick() {
        console.log('Button was clicked');
        api.post(`/shopping-list/add-recipe`)
            .then(response => {
                console.log('User deleted successfully');
            })
            .catch(error => {
                console.error('Error adding recipe to shopping cart', error);
        });
    }

    return (
        <div class="card mb-4 p-2">
            <Link to='../EditRecipe' class="btn btn-primary btn-md waves-effect waves-light btn_space m-1" type="button">Edit</Link>
            <Link to='../EditRecipe' class="btn btn-primary btn-md waves-effect waves-light btn_space m-1" type="button">Convert to New Recipe</Link>
            <button onClick={addClick} class="btn btn-primary btn-md waves-effect waves-light btn_space m-1" type="button">Add to Shopping Cart</button>
            <button onClick={deleteClick} class="btn btn-outline-primary btn-md waves-effect waves-light btn_space m-1" type="button">Delete</button>
        </div>
    );
}

export default RecipeButtons;