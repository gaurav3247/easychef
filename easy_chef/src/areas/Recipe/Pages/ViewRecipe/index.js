import React, { useState, useEffect } from 'react';
import api from "../../../../core/baseAPI";
import Comments from "./Comments";
import RecipeButtons from './RecipeButtons';
import Ingredients from './Ingredients';
import { useParams } from 'react-router-dom';

const ViewRecipe = () => {
  const [recipeName, setRecipe] = useState("");
  const [creatorName, setCreatorName] = useState("");
  const [cuisineName, setCuisine] = useState("");
  const [preptime, setPrepTime] = useState("");
  const [diet, setDiet] = useState("");
  const [serving, setServing] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [allcomment, setallcomment] = useState([]);
  const [step, setStep] = useState("");
  const [ingredientList, setIngredientList] = useState([]);
  const [isFavorite, setFavorite] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    api.get(`/recipe/details/${id}/`)
    .then((response) => {
        setRecipe(response.data.name);
        setCreatorName(response.data.full_name);
        setCuisine(response.data.cuisine);
        setPrepTime(response.data.prep_time);
        setDiet(response.data.diets);
        setServing(response.data.serving);
        setCookingTime(response.data.cooking_time);
        setStep(response.data.steps);
        setIngredientList(response.data.ingredients);
    });
    api.get(`/recipe/all-comments/${id}/`)
    .then((response) => {
        setallcomment(response.data);
    });
  }, [id]);

  function FavoriteButtonClick() {
    setFavorite(!isFavorite);
    if (isFavorite) {
      api.post(`/recipe/add-to-favorite/${id}/`)
        .then((response) => {
          setFavorite(response.data);
        });
    } else {
      api.delete(`/recipe/remove-from-favorite/${id}/`)
        .then((response) => {
          setFavorite(response.data);
        });
    }
  }

    return (
        <div>
          <div class="container-xxl flex-grow-1 container-p-y">
            <h4>View Recipe</h4>
            <div class="row">
              <div class="col-lg-9 card py-3 px-0">
                <div class="border-bottom mb-4">
                  <div class="d-flex">
                    <h5 class="px-4">{recipeName}</h5>
                    <div class="ms-auto mt-1 me-3">
                      <button type="button" class="btn waves-effect p-0" data-bs-toggle="offcanvas" data-bs-target="#offcanvasEnd" aria-controls="offcanvasEnd">
                        <span class="ti ti-star"></span>
                      </button>
                      <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasEnd" aria-labelledby="offcanvasEndLabel">
                        <div class="offcanvas-header">
                          <h5 id="offcanvasEndLabel" class="offcanvas-title">Rating</h5>
                          <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <hr class="m-0"></hr>
                        <div class="offcanvas-body mx-0 flex-grow-0 h-100">
                          <div class="align-items-center justify-content-center d-flex flex-column h-100">
                            <h4>Add a Rating</h4>
                            <div class="mb-4">
                              <div class="basic-ratings jq-ry-container w-192">
                                <div class="jq-ry-group-wrapper">
                                  <div class="jq-ry-normal-group jq-ry-group">
                                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 12.705 512 486.59" x="0px" y="0px" xmlSpace="preserve" width="32px" height="32px" fill="gray">
                                      <polygon points="256.814,12.705 317.205,198.566 512.631,198.566 354.529,313.435 414.918,499.295 256.814,384.427 98.713,499.295 159.102,313.435 1,198.566 196.426,198.566 "></polygon>
                                    </svg>
                                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 12.705 512 486.59" x="0px" y="0px" xmlSpace="preserve" width="32px" height="32px" fill="gray" class="ml8">
                                      <polygon points="256.814,12.705 317.205,198.566 512.631,198.566 354.529,313.435 414.918,499.295 256.814,384.427 98.713,499.295 159.102,313.435 1,198.566 196.426,198.566 "></polygon>
                                    </svg>
                                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 12.705 512 486.59" x="0px" y="0px" xmlSpace="preserve" width="32px" height="32px" fill="gray" class="ml8">
                                      <polygon points="256.814,12.705 317.205,198.566 512.631,198.566 354.529,313.435 414.918,499.295 256.814,384.427 98.713,499.295 159.102,313.435 1,198.566 196.426,198.566 "></polygon>
                                    </svg>
                                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 12.705 512 486.59" x="0px" y="0px" xmlSpace="preserve" width="32px" height="32px" fill="gray" class="ml8">
                                      <polygon points="256.814,12.705 317.205,198.566 512.631,198.566 354.529,313.435 414.918,499.295 256.814,384.427 98.713,499.295 159.102,313.435 1,198.566 196.426,198.566 "></polygon>
                                    </svg>
                                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 12.705 512 486.59" x="0px" y="0px" xmlSpace="preserve" width="32px" height="32px" fill="gray" class="ml8">
                                      <polygon points="256.814,12.705 317.205,198.566 512.631,198.566 354.529,313.435 414.918,499.295 256.814,384.427 98.713,499.295 159.102,313.435 1,198.566 196.426,198.566 "></polygon>
                                    </svg>
                                  </div>
                                  <div class="jq-ry-rated-group jq-ry-group w-90">
                                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 12.705 512 486.59" x="0px" y="0px" xmlSpace="preserve" width="32px" height="32px" fill="#f39c12">
                                      <polygon points="256.814,12.705 317.205,198.566 512.631,198.566 354.529,313.435 414.918,499.295 256.814,384.427 98.713,499.295 159.102,313.435 1,198.566 196.426,198.566 "></polygon>
                                    </svg>
                                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 12.705 512 486.59" x="0px" y="0px" xmlSpace="preserve" width="32px" height="32px" fill="#f39c12" class="ml8">
                                      <polygon points="256.814,12.705 317.205,198.566 512.631,198.566 354.529,313.435 414.918,499.295 256.814,384.427 98.713,499.295 159.102,313.435 1,198.566 196.426,198.566 "></polygon>
                                    </svg>
                                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 12.705 512 486.59" x="0px" y="0px" xmlSpace="preserve" width="32px" height="32px" fill="#f39c12" class="ml8">
                                      <polygon points="256.814,12.705 317.205,198.566 512.631,198.566 354.529,313.435 414.918,499.295 256.814,384.427 98.713,499.295 159.102,313.435 1,198.566 196.426,198.566 "></polygon>
                                    </svg>
                                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 12.705 512 486.59" x="0px" y="0px" xmlSpace="preserve" width="32px" height="32px" fill="#f39c12" class="ml8">
                                      <polygon points="256.814,12.705 317.205,198.566 512.631,198.566 354.529,313.435 414.918,499.295 256.814,384.427 98.713,499.295 159.102,313.435 1,198.566 196.426,198.566 "></polygon>
                                    </svg>
                                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 12.705 512 486.59" x="0px" y="0px" xmlSpace="preserve" width="32px" height="32px" fill="#f39c12" class="ml8">
                                      <polygon points="256.814,12.705 317.205,198.566 512.631,198.566 354.529,313.435 414.918,499.295 256.814,384.427 98.713,499.295 159.102,313.435 1,198.566 196.426,198.566 "></polygon>
                                    </svg>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="w-75 card p-2">
                              <button type="button" class="btn btn-primary waves-effect waves-light m-1">
                                Apply
                              </button>
                              <button type="button" class="btn btn-secondary waves-effect waves-light m-1">
                                Clear
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <small>4.8</small>
                      <button type="button" class="btn waves-effect p-0" onClick={FavoriteButtonClick}>
                        <span class="ti ti-bookmarks"></span>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="px-4">
                  <div class="row mb-3">
                    <div class="col-lg-4">
                      <div><h6>Creator: {creatorName}</h6></div>
                    </div>
                    <div class="col-lg-4">
                      <div><h6 class="d-inline-block me-1">Cuisine:</h6>{cuisineName}</div>
                    </div>
                    <div class="col-lg-4">
                      <div><h6 class="d-inline-block me-1">Prep Time: </h6>{preptime}</div>
                    </div>
                    <div class="col-lg-4">
                      <div><h6 class="d-inline-block me-1">Diets: </h6>{diet}</div>
                    </div>
                    <div class="col-lg-4">
                      <div><h6 class="d-inline-block me-1">Servings: </h6>{serving}<i class="ti ti-pencil ti-sm align-middle mb-2 ms-1 cursor-pointer"></i></div>
                    </div>
                    <div class="col-lg-4">
                      <div><h6 class="d-inline-block me-1">Cooking Time: </h6>{cookingTime}</div>
                    </div>
                  </div>
                </div>
                <table class="table table-striped mb-2">
                  <thead class="table-light">
                    <tr>
                      <th>Ingredient Name</th>
                      <th>Quantity/Amount</th>
                    </tr>
                  </thead>
                  <tbody class="table-border-bottom-0">
                    {ingredientList.map(i => (
                      <Ingredients name={i.name} quantity={i.quantity}/>
                    ))}
                  </tbody>
                </table>
                <div class="recipe_card_padding">
                  <h4 class="p-4 text-center mb-0">Steps</h4>
                  <div class="mb-4 px-4">
                    {step}
                  </div>
                  <div class="px-4">
                    (//pictures here)
                  </div>
                </div>
              </div>
              <div class="col-lg-3">
                <RecipeButtons />
                <div class="col app-chat-history card overflow-hidden">
                  <div class="chat-history-wrapper mt-3 ms-3"><h4>Comments</h4></div>
                  <div class="chat-history-header border-bottom"></div>
                  <div class="chat-history-body bg-body ps ps--active-y h-400">
                  <ul class="list-unstyled chat-history m-3">
                    {allcomment.map(c => (
                      <Comments date_created={c.date_created} avatar={c.avatar} text={c.text} full_name = {c.full_name}/>
                    ))}
                  </ul>
                  <div class="ps__rail-x lb0"><div class="ps__thumb-x lw0" tabindex="0"></div></div>
                  <div class="ps__rail-y thr0"><div class="ps__thumb-y th0" tabindex="0"></div></div>
                  </div>
                  <div class="chat-history-footer shadow-sm p-2">
                    <form class="form-send-message d-flex justify-content-between align-items-center">
                        <input class="form-control message-input border-0 me-1 shadow-none" placeholder="Type comment here"></input>
                        <div class="message-actions d-flex align-items-center">
                          <label for="attach-doc" class="form-label mb-0">
                              <i class="ti ti-paperclip ti-sm cursor-pointer mx-1"></i>
                              <input type="file" id="attach-doc" hidden=""></input>
                          </label>
                          <button class="btn btn-primary d-flex send-msg-btn">
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