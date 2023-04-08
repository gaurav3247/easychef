import api from '../../../../../core/baseAPI';
import React, { useState, useEffect } from 'react';

const Recipe_List = ({ updateIngredientsList }) => {
    const [recipes, setRecipes] = useState([])

    useEffect(() => {
        api.get('/shopping-list/details/')
            .then(response => {
                setRecipes(response.data)
            })
    }, [])

    function change_serving(recipeID, servingSize) {
        const requestOptions = {
            recipeID: recipeID,
            servingSize: servingSize
        };
        api.patch('/shopping-list/change-serving-size/', requestOptions)
            .then(response => {
                const updatedRecipes = [...recipes];
                const index = updatedRecipes.findIndex(recipe => recipe.recipeID === recipeID);
                updatedRecipes[index].servingSize = servingSize;
                setRecipes(updatedRecipes);

                api.get('/shopping-list/ingredients/')
                    .then(response => {
                        updateIngredientsList(response.data.ingredients)
                    })
            })

    }
    return (
        <>
            {recipes.map(recipe => (
                <div className="col-lg-4 mb-2">
                    <div className="card h-80 clickable">
                        <img className="card-img-top object-fit-fill mb-n2" src={recipe.recipe_img} alt="Card image cap"style={{height: '164px'}}></img>
                        <div className="card-body" style={{textAlign: 'center'}}>
                            <h5 className="card-title">{recipe.recipe_name}</h5>
                            <div className='btn-group gap-2 align-items-center'>
                                <button onClick={() => {change_serving(recipe.recipeID, recipe.servingSize-1)}} type="button" className="btn btn-sm btn-label-danger waves-effect">-</button>
                                <div>
                                    <span className="badge bg-label-primary mb-n5">
                                        Serving Size: {recipe.servingSize}
                                    </span>
                                </div>
                                <button onClick={() => {change_serving(recipe.recipeID, recipe.servingSize+1)}} type="button" className="btn btn-sm btn-label-success waves-effect">+</button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default Recipe_List