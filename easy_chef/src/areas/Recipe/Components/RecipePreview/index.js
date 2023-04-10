import {Link, NavLink} from "react-router-dom";

const RecipePreview = ({recipe}) => {
    const recipeLink = `/view-recipe/${recipe.id}`
    return (
        <>
            <div className="card h-100 clickable">
                <img style={{"objectFit": "cover", "maxHeight": "250px"}}
                     className="card-img-top h-50 object-fit-fill"
                     src={recipe.preview_picture ? `${recipe.preview_picture}` :
                         require('../../../../assets/img/no-image.jpg')} alt="Card image cap"/>
                <span
                    className="badge bg-label-primary">Cooking Time: {recipe.cooking_time ? recipe.cooking_time : "Not Set"}</span>
                <div className="card-body">
                    <h5 className="card-title">{recipe.name}</h5>
                    <h6 className="card-subtitle text-muted">Creator: <a
                        href="javascript:void(0)">{recipe.user_full_name.full_name}</a></h6>
                    <p className="card-text mt-2 mb-1">
                        <small className="card-text text-uppercase">Details</small>
                    </p>
                    <ul className="list-unstyled mb-4"
                        style={{"marginLeft": "-8px"}}>
                        <li className="d-flex mb-1-3">
                            <span className="fw-bold mx-2">Serving:</span>
                            <span className="text-truncate">{recipe.serving}</span>
                        </li>
                        <li className="d-flex mb-1-3">
                            <span className="fw-bold mx-2">Cuisine:</span>
                            <span
                                className="text-truncate">{recipe.cuisine ? recipe.cuisine.name : "Cuisine Not Set"}</span>
                        </li>
                        <li className="d-flex mb-1-3">
                            <span className="fw-bold mx-2">Diets:</span>
                            <span
                                className="text-truncate">{recipe.diets.length > 0 ? recipe.diets.map((diet) => diet.name).join(", ") : "Diets Not Set"}</span>
                        </li>
                        <li className="d-flex mb-1-3">
                            <span className="fw-bold mx-2">Ingredients:</span>
                            <span
                                className="text-truncate">{recipe.ingredients.length > 0 ? recipe.ingredients.map((ingredient) => ingredient.name).join(", ") : "Ingredients Not Set"}</span>
                        </li>
                        {/*<li className="d-flex mb-1-3">*/}
                        {/*    <span className="fw-bold mx-2">Steps:</span>*/}
                        {/*    <span>It all depends on the filling – it*/}
                        {/*        can't be soupy! Instead, it should be*/}
                        {/*        thick when it comes off the stove. Too*/}
                        {/*        much broth and you'll run the risk of it*/}
                        {/*        seeping through your crust before it's*/}
                        {/*        baked...</span>*/}
                        {/*</li>*/}
                    </ul>
                    <hr/>
                    <div className="row">
                        <div className="col-12">
                            <i className="ti ti-bookmarks mt-n1"></i>
                            <span className=" mx-1">{recipe.number_of_saves}</span>
                            <i className="ti ti-star mt-n1"></i>
                            <span className=" mx-1">{recipe.rating}</span>
                            <i className="ti ti-message mt-n1"></i>
                            <span className=" mx-1">{recipe.number_of_comments}</span>
                        </div>
                    </div>
                    <Link className="stretched-link" to={recipeLink}></Link>
                </div>
            </div>
        </>
    )
}
export default RecipePreview