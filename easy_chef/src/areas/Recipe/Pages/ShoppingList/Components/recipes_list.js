import api from '../../../../../core/baseAPI';
import React, { useState, useEffect } from 'react';
import no_image from '../../../../../assets/img/no-image.jpg'
/*import photo from '../../../../../../../backend/recipe/preview_picture/1_preview_picture.png'
*/
const Recipe_List = ({ updateIngredientsList }) => {
    const [recipes, setRecipes] = useState([])

    useEffect(() => {
        api.get('/shopping-list/details/')
            .then(response => {
                console.log(response.data)
                console.log(response.data)
                setRecipes(response.data)
            })
    }, [])

    function delete_recipe(recipeID) {
        const requestOptions = {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
            recipeID: recipeID
        };
        api.delete('/shopping-list/remove-recipe/', {data: requestOptions})
            .then(response => {
                const updatedRecipes = [...recipes]
                const index = updatedRecipes.findIndex(recipe => recipe.recipeID === recipeID)
                setRecipes(oldValues => {
                    return oldValues.filter((_, i) => i !== index)
                })
                get_ingredients()
            })
    }

    function get_ingredients() {
        api.get('/shopping-list/ingredients/')
        .then(response => {
            updateIngredientsList(response.data.ingredients)
        })
    }
    function change_serving(recipeID, servingSize) {
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            recipeID: recipeID,
            servingSize: servingSize
        };
        api.patch('/shopping-list/change-serving-size/', requestOptions)
            .then(response => {
                const updatedRecipes = [...recipes]
                const index = updatedRecipes.findIndex(recipe => recipe.recipeID === recipeID)
                updatedRecipes[index].servingSize = servingSize
                setRecipes(updatedRecipes)
                get_ingredients()
            })

    }
    return (
        <>
            {recipes.map(recipe => (
                <div className="col-md-4 col-xl-4 col-lg-4 mb-3">
                    <div className="card h-100 clickable">
                        <img className="card-img-top object-fit-fill mb-n2" src={recipe.recipe_img === '' ? no_image : `http://127.0.0.1:8000/${recipe.recipe_img}`} alt="Image" style={{height: "220px", objectFit: "cover"}}></img>
                        <div className="card-body" style={{textAlign: 'center'}}>
                            <h5 className="card-title">{recipe.recipe_name}</h5>
                            <div className='btn-group gap-2 align-items-center'>
                                <button disabled={recipe.servingSize === 1} onClick={() => {change_serving(recipe.recipeID, recipe.servingSize-1)}} type="button" className="btn btn-primary active waves-effect waves-light">-</button>
                                <div>
                                    <span className="badge bg-primary">
                                        Serving Size: {recipe.servingSize}
                                    </span>
                                </div>
                                <button disabled={recipe.servingSize === 100} onClick={() => {change_serving(recipe.recipeID, recipe.servingSize+1)}} type="button" className="btn btn-primary active waves-effect waves-light">+</button>
                            </div>
                            <button type="button" onClick={() => {delete_recipe(recipe.recipeID)}} className='btn btn-outline-primary waves-effect btn-xs'>
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M4 7l16 0"></path>
                                <path d="M10 11l0 6"></path>
                                <path d="M14 11l0 6"></path>
                                <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
                                <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
                            </svg>
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default Recipe_List