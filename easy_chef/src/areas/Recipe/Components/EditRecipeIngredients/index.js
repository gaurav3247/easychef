import {Button} from 'reactstrap'
import * as React from 'react';
import {forwardRef, useImperativeHandle, useState} from "react";
import {Table} from 'reactstrap'

const EditRecipeIngredients = forwardRef(({onAddIngredient, onEditIngredient, onRefreshIngredients}, ref) => {
    const [ingredients, setIngredients] = useState([])
    const [editedIngredients, setEditedIngredients] = useState({})

    useImperativeHandle(ref, () => ({
        async addNewIngredient(name, quantity) {
            const newIngredient = {"name": name, "quantity": quantity}
            const updatedIngredients = ingredients.concat(newIngredient);
            await setIngredients(updatedIngredients);
            onRefreshIngredients();
        },
        async editIngredient(name, quantity) {
            const updatedIngredients = ingredients.map((ingredient) => {
                if (ingredient === editedIngredients) {
                    return {...ingredient, name, quantity};
                }
                return ingredient;
            });
            await setIngredients(updatedIngredients);
            onRefreshIngredients();
        },
        getIngredients() {
            return ingredients;
        }
    }));

    function removeIngredient(ingredient) {
        const updatedIngredients = ingredients.filter((item) => item !== ingredient);
        setIngredients(updatedIngredients);
        setTimeout(function () {
            onRefreshIngredients();
        }, 100);
    }

    function editIngredient(ingredient) {
        onEditIngredient(ingredient);
        setEditedIngredients(ingredient);
    }

    function ingredientsTable() {
        if (ingredients.length > 0) {
            return (
                <React.Fragment key="table">
                    <Table hover responsive>
                        <thead>
                        <tr>
                            <th>Ingredient Name</th>
                            <th>Quantity/Amount</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {ingredients.map(function (ingredient) {
                            return (
                                <tr>
                                    <td>
                                        <b>{ingredient.name}</b>
                                    </td>
                                    <td>{ingredient.quantity}</td>
                                    <td>
                                        <Button color='secondary'
                                                className="btn btn-icon btn-outline-secondary waves-effect"
                                                onClick={e => editIngredient(ingredient)}
                                                style={{border: 'none', 'backgroundColor': '#fef3f300 !important'}}>
                                            <i className="ti ti-pencil me-1"></i>
                                        </Button>
                                        <Button color='danger' className="btn btn-icon btn-outline-primary waves-effect"
                                                onClick={e => removeIngredient(ingredient)}
                                                style={{border: 'none', 'backgroundColor': '#fef3f300 !important'}}>
                                            <i className="ti ti-trash me-1"></i>
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </Table>
                </React.Fragment>
            );
        } else {
            return (
                <div className="text-center">
                    <p className="text-muted my-5">No Ingredients Added</p>
                </div>
            );
        }
    }

    try {
        return (
            <React.Fragment key="ingredients">
                <div className="card mt-3" data-select2-id="18">
                    <div className="card-header border-bottom my-n1">
                        <div className="row my-n2" style={{"marginLeft": "-1.2rem"}}>
                            <div className="col-6">
                                <div
                                    style={{
                                        "fontWeight": "500",
                                        "fontSize": "1.285rem",
                                        "marginTop": "0.4rem"
                                    }}>
                                    Ingredients
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="text-end">
                                    <Button outline color='primary' type='button' onClick={() => onAddIngredient()}>
                                        Add Ingredient
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-body" style={{"padding": "0"}}>
                        {ingredientsTable()}
                    </div>
                </div>
            </React.Fragment>
        );
    } catch (error) {
        console.log(error)
    }

})

export default EditRecipeIngredients