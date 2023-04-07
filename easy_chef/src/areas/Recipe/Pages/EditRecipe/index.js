import BreadCrumbs from "../../../../core/components/breadcrumbs";

const EditRecipe = () => {
    return (
        <>
            <BreadCrumbs basePage="My Recipes" currentPage="Create New Recipe"></BreadCrumbs>
            <div className="row">
                <div className="col-8">
                    <div className="card" data-select2-id="18">
                        <div className="card-header border-bottom my-n1">
                            <div className="row my-n2" style={{"margin-left": "-1.2rem"}}>
                                <div className="col-6">
                                    <div
                                        style={{"font-weight": "500", "font-size": "1.285rem", "margin-top": "0.4rem"}}>
                                        Recipe Details
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="text-end">
                                        <a href="view_recipe.html" type="button"
                                           className="btn btn-primary waves-effect waves-light">Publish Recipe</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">

                        </div>
                    </div>

                    <div className="card mt-3" data-select2-id="18">
                        <div className="card-header border-bottom my-n1">
                            <div className="row my-n2" style={{"margin-left": "-1.2rem"}}>
                                <div className="col-6">
                                    <div
                                        style={{"font-weight": "500", "font-size": "1.285rem", "margin-top": "0.4rem"}}>
                                        Ingredients
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="text-end">
                                        <a href="view_recipe.html" type="button"
                                            className="btn btn-primary waves-effect waves-light">Add Ingredient</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-body" style={{"padding": "0"}}>
                            <div className="text-center">
                                <p className="text-muted my-5">No Ingredients Added</p>
                            </div>
                        </div>
                    </div>

                    <div className="card mt-3" data-select2-id="18">
                        <div className="card-header border-bottom my-n1">
                            <div className="row my-n2" style={{"margin-left": "-1.2rem"}}>
                                <div className="col-6">
                                    <div
                                        style={{"font-weight": "500", "font-size": "1.285rem", "margin-top": "0.4rem"}}>
                                        Steps
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">

                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <div style={{"height": "38rem"}} className="card">
                        <img style={{"object-fit": "cover", "max-height": "250px"}}
                             className="card-img-top h-50 object-fit-fill"
                             src={require('../../../../assets/img/no-image.jpg')}
                             alt="Card image cap"/>
                        <div className="card-body">
                            <h5 className="card-title text-truncate">New Recipe Name (Preview)</h5>
                            <h6 className="card-subtitle text-muted">Creator: <a href="javascript:void(0)">Brittney
                                Doe</a>
                            </h6>
                            <p className="card-text mt-2 mb-1">
                                <small className="card-text text-uppercase">Details</small>
                            </p>
                            <ul className="list-unstyled mb-4" style={{"margin-left": "-8px"}}>
                                <li className="d-flex mb-1-3">
                                    <span className="fw-bold mx-2">Serving:</span>
                                    <span className="text-truncate">0</span>
                                </li>
                                <li className="d-flex mb-1-3">
                                    <span className="fw-bold mx-2">Cuisine:</span>
                                    <span className="text-truncate">Selected Cuisine</span>
                                </li>
                                <li className="d-flex mb-1-3">
                                    <span className="fw-bold mx-2">Diets:</span>
                                    <span className="text-truncate">Selected Diets</span>
                                </li>
                                <li className="d-flex mb-1-3">
                                    <span className="fw-bold mx-2">Ingredients:</span>
                                    <span className="text-truncate">Selected Ingredients</span>
                                </li>
                                <li className="d-flex mb-1-3">
                                    <span className="fw-bold mx-2">Steps:</span>
                                    <span>Partial steps detalis will display here after you add them</span>
                                </li>
                            </ul>
                            <hr></hr>
                            <div className="text-center demo-inline-spacing mt-n3">
                                <a href="javascript:void(0)" className="btn btn-primary waves-effect">Change Preview
                                    Picture</a>
                                <a href="javascript:void(0)" className="btn btn-outline-primary waves-effect">Delete</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditRecipe
