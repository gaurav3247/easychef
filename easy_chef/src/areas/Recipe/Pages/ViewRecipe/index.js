import React, {useEffect, useState} from 'react';
import api from "../../../../core/baseAPI";
import Comments from "./Comments";
import Ingredients from './Ingredients';
import {useParams} from 'react-router-dom';
import {Link} from "react-router-dom"
import parse from 'html-react-parser'
import { Offcanvas, OffcanvasBody, OffcanvasHeader } from 'reactstrap';
import { FaStar } from "react-icons/fa";
import { Container, Radio, Rating } from "./RatingStyles.js";

const ViewRecipe = () => {
    const [recipeName, setRecipe] = useState("");
    const [creatorName, setCreatorName] = useState("");
    const [cuisineName, setCuisine] = useState("");
    const [preptime, setPrepTime] = useState("");
    const [diet, setDiet] = useState([]);
    const [serving, setServing] = useState(1);
    const [cookingTime, setCookingTime] = useState("");
    const [allcomment, setallcomment] = useState([]);
    const [step, setStep] = useState("");
    const [ingredientList, setIngredientList] = useState([]);
    const [isFavorite, setFavorite] = useState(false);
    const {id} = useParams();
    const rec_id = id;
    const [currentuserid, setcurrentuserid] = useState('');
    const [recipeuserid, setrecipeuserid] = useState('');
    const [rating, setRating] = useState(0);
    const [numfavs, setnumfavs] = useState(0);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [comment, setComment] = useState('');

    const handleCommentChange = event => {
        setComment(event.target.value);
    };

    const handleFileSelect = (event) => {
        const files = event.target.files;
        const selectedFilesArray = Array.from(files);
        setSelectedFiles(selectedFilesArray);
    };
    
    const [canvasOpen, setCanvasOpen] = useState(false)
    const toggleCanvas = () => {
        setCanvasOpen(!canvasOpen)
    }

    const [rate, setRate] = useState(0);


    useEffect(() => {
        api.get(`/accounts/edit-profile/`)
            .then((response) => {
                setcurrentuserid(response.data.id);
            });
        api.get(`/recipe/details/${id}/`)
            .then((response) => {
                setRecipe(response.data.name);
                setCreatorName(response.data.user_full_name.full_name);
                setCuisine(response.data.cuisine_name);
                setPrepTime(response.data.prep_time);
                setDiet(response.data.diets);
                setServing(response.data.serving);
                setCookingTime(response.data.cooking_time);
                setStep(response.data.steps);
                setIngredientList(response.data.ingredients);
                setrecipeuserid(response.data.user);
                setRating(response.data.rating);
                setnumfavs(response.data.number_of_saves);
            });
        api.get(`/recipe/all-comments/${id}/`)
            .then((response) => {
                setallcomment(response.data);
            });
    }, [id]);

    function getPersonalButtons() {
        if (currentuserid === recipeuserid) {
            return (
                <>
                    <Link to={`../edit-recipe/${id}`}
                          className="btn btn-primary btn-md waves-effect waves-light btn_space m-1"
                          type="button">Edit</Link>
                    <button onClick={deleteClick}
                            className="btn btn-outline-primary btn-md waves-effect waves-light btn_space m-1"
                            type="button">Delete
                    </button>
                </>
            )
        }
    }

    function getloggedinButtons() {
        if (Number.isInteger(currentuserid)) {
            return (
                <>
                    <button onClick={addClick} className="btn btn-primary btn-md waves-effect waves-light btn_space m-1"
                            type="button">Add to Shopping Cart
                    </button>
                    <Link to={`../new-recipe/${id}`}
                          className="btn btn-primary btn-md waves-effect waves-light btn_space m-1" type="button">
                        Convert to New Recipe
                    </Link>
                </>
            )
        }
    }

    function getloggedindiv() {
        if (Number.isInteger(currentuserid)) {
            return (
                <>
                    <div className="card mb-4 p-2">
                        {getloggedinButtons()}
                        {getPersonalButtons()}
                    </div>
                </>
            )
        }
    }

    function deleteClick() {
        api.delete(`/recipe/delete/${id}`)
            .then(response => {
                console.log('Recipe deleted successfully');
            })
            .catch(error => {
                console.error('Error deleting recipe', error);
            });
    }

    function addClick() {
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            servingSize: String(serving),
            recipeID: String(rec_id)
        };

        api.post(`/shopping-list/add-recipe/`, requestOptions)
            .then(response => {
                console.log('Recipe added to shopping list');
            })
            .catch(error => {
                console.error('Error adding recipe to shopping cart', error);
            });
    }

    function FavoriteButtonClick() {
        if (isFavorite) {
            api.delete(`/recipe/remove-from-favorite/${id}/`)
                .then(() => setFavorite(false))
        } else {
            api.post(`/recipe/add-to-favorite/${id}/`)
                .then(() => setFavorite(true));
        }
    }

    const handleServingChange = (event) => {
        setServing(event.target.value);
    };

    function SaveRating() {
        api.post(`/recipe/rate/${id}/`, {rating: String(rate)})
            .then(response => {
                console.log('Rating saved');
            })
            .catch(error => {
                console.error('Error adding rating', error);
            });
    }

    const handleSubmit = event => {
        event.preventDefault();
        api.post(`/recipe/comment/${id}/`, {
                text: comment, 
                attachments: selectedFiles,
            headers: {
            'Content-Type': "application/json"
            }
        })
      };

    return (
        <div>
            <div className="container-xxl flex-grow-1 container-p-y">
                <h4>View Recipe</h4>
                <div className="row">
                    <div className="col-lg-9 card py-3 px-0">
                        <div className="border-bottom mb-4">
                            <div className="d-flex">
                                <h5 className="px-4">{recipeName}</h5>
                                <div className="ms-auto mt-1 me-3">
                                    <button type="button" className="btn waves-effect p-0" data-bs-toggle="offcanvas"
                                            data-bs-target="#offcanvasEnd" aria-controls="offcanvasEnd" onClick={toggleCanvas}>
                                        <span className="ti ti-star"></span>
                                    </button>
                                    <small>{rating}</small>
                                    <button type="button" className="btn waves-effect p-0"
                                            onClick={FavoriteButtonClick}>
                                        <span className={`ti ${isFavorite ? 'ti-bookmark' : 'ti-bookmark-off'}`}></span>
                                    </button>
                                    <small>{numfavs}</small>
                                </div>
                                <Offcanvas direction="end" isOpen={canvasOpen} toggle={toggleCanvas}>
                                    <OffcanvasHeader toggle={toggleCanvas}>Rating</OffcanvasHeader>
                                    <OffcanvasBody>
                                        <div className="mx-0 flex-grow-0 h-100">
                                            <div className="align-items-center justify-content-center d-flex flex-column h-100">
                                                <h4>Add a Rating</h4>
                                                <div className="mb-4">
                                                    <Container>
                                                        {[...Array(5)].map((item, index) => {
                                                            const givenRating = index + 1;
                                                            return (
                                                            <label>
                                                                <Radio
                                                                type="radio"
                                                                value={givenRating}
                                                                onClick={() => {
                                                                    setRate(givenRating);
                                                                }}
                                                                />
                                                                <Rating>
                                                                <FaStar
                                                                    color={
                                                                    givenRating < rate || givenRating === rate
                                                                        ? "rgb(255, 165, 0)"
                                                                        : "rgb(192,192,192)"
                                                                    }
                                                                />
                                                                </Rating>
                                                            </label>
                                                            );
                                                        })}
                                                        </Container>
                                                </div>
                                                <div className="w-75 card p-2">
                                                    <button type="button"
                                                            className="btn btn-primary waves-effect waves-light m-1" onClick={SaveRating}>
                                                        Apply
                                                    </button>
                                                    <button type="button"
                                                            className="btn btn-secondary waves-effect waves-light m-1">
                                                        Clear
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </OffcanvasBody>
                                </Offcanvas>
                            </div>
                        </div>
                        <div className="px-4">
                            <div className="row mb-3">
                                <div className="col-lg-4">
                                    <div><h6>Creator: {creatorName}</h6></div>
                                </div>
                                <div className="col-lg-4">
                                    <div><h6 className="d-inline-block me-1">Cuisine:</h6>{cuisineName}</div>
                                </div>
                                <div className="col-lg-4">
                                    <div><h6 className="d-inline-block me-1">Prep Time: </h6>{preptime}</div>
                                </div>
                                <div className="col-lg-4">
                                    <div>
                                        <h6 className="d-inline-block me-1">Diets:</h6>
                                            {diet.length > 0 ? diet.map((diet) => diet.name).join(", ") : "No diets selected"}
                                            {/*{diet.map((item, index) => (*/}
                                            {/*    <React.Fragment key={index}>*/}
                                            {/*        {item}*/}
                                            {/*        {index !== diet.length - 1 && ', '}*/}
                                            {/*    </React.Fragment>*/}
                                            {/*))}*/}
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className='d-flex'>
                                        <h6 className="me-2">Serving:</h6> <input type="number"
                                                                                  className="form-control form-control-sm w-px-75 h-px-20"
                                                                                  value={serving}
                                                                                  onChange={handleServingChange}
                                                                                  min="1"/>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div><h6 className="d-inline-block me-1">Cooking Time: </h6>{cookingTime}</div>
                                </div>
                            </div>
                        </div>
                        <table className="table table-striped mb-2">
                            <thead className="table-light">
                            <tr>
                                <th>Ingredient Name</th>
                                <th>Quantity/Amount</th>
                            </tr>
                            </thead>
                            <tbody className="table-border-bottom-0">
                            {ingredientList.map(i => (
                                <Ingredients name={i.name} quantity={i.quantity}/>
                            ))}
                            </tbody>
                        </table>
                        <div className="recipe_card_padding">
                            <h4 className="p-4 text-center mb-0">Steps</h4>
                            <div className="mb-4 px-4">
                                {parse(step)}
                            </div>
                            <div className="px-4">
                                (//pictures here)
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        {getloggedindiv()}
                        <div className="col app-chat-history card overflow-hidden">
                            <div className="chat-history-wrapper mt-3 ms-3"><h4>Comments</h4></div>
                            <div className="chat-history-header border-bottom"></div>
                            <div className="chat-history-body bg-body ps ps--active-y h-400">
                                <ul className="list-unstyled chat-history m-3">
                                    {allcomment.map(c => (
                                        <Comments date_created={c.date_created} avatar={c.avatar} text={c.text}
                                                  full_name={c.full_name} attachments = {c.attachments}/>
                                    ))}
                                </ul>
                                <div className="ps__rail-x lb0">
                                    <div className="ps__thumb-x lw0" tabIndex="0"></div>
                                </div>
                                <div className="ps__rail-y thr0">
                                    <div className="ps__thumb-y th0" tabIndex="0"></div>
                                </div>
                            </div>
                            <div className="chat-history-footer shadow-sm p-2">
                                <form className="form-send-message d-flex justify-content-between align-items-center" onSubmit={handleSubmit}>
                                    <input className="form-control message-input border-0 me-1 shadow-none" 
                                            value={comment} onChange={handleCommentChange}
                                            placeholder="Type comment here"></input>
                                    <div className="message-actions d-flex align-items-center">
                                        <label htmlFor="attach-doc" className="form-label mb-0">
                                            <i className="ti ti-paperclip ti-sm cursor-pointer mx-1"></i>
                                            <input
                                                id="attach-doc"
                                                hidden
                                                type="file"
                                                multiple
                                                onChange={handleFileSelect}
                                            />
                                        </label>
                                        <button className="btn btn-primary d-flex send-msg-btn" type="submit">
                                            <i className="ti ti-send me-md-1 me-0"></i>
                                            <span className="align-middle d-md-inline-block d-none"></span>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewRecipe