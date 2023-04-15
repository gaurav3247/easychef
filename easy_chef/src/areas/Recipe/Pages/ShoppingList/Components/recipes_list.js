import api from '../../../../../core/baseAPI';
import React, { useState, useEffect } from 'react';
import no_image from '../../../../../assets/img/no-image.jpg'

const Recipe_List = ({ updateIngredientsList }) => {
    const [recipes, setRecipes] = useState([])

    useEffect(() => {
        api.get('/shopping-list/details/')
            .then(response => {
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
                console.log(response)
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
        console.log(requestOptions)
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
                    <button type="button" onClick={() => {delete_recipe(recipe.recipeID)}} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        <img className="card-img-top object-fit-fill mb-n2" src={no_image} alt={no_image}></img>
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
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default Recipe_List