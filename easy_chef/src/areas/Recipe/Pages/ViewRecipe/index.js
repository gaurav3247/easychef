import React, { useState } from 'react'

const ViewRecipe = () => {
    return (
        <div>
          <div className="container-xxl flex-grow-1 container-p-y">
              <h4>View Recipe</h4>
            <div className="row">
              <div className="col-lg-9 card py-3 px-0">
                <div className="border-bottom mb-4">
                  <div className="d-flex">
                    <h5 className="px-4">Chicken Pot Pie</h5>
                    <div className="ms-auto mt-1 me-3">
                      <button type="button" className="btn waves-effect p-0" data-bs-toggle="offcanvas" data-bs-target="#offcanvasEnd" aria-controls="offcanvasEnd">
                          <span className="ti ti-star"></span>
                        </button>
                      <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasEnd" aria-labelledby="offcanvasEndLabel">
                        <div className="offcanvas-header">
                          <h5 id="offcanvasEndLabel" className="offcanvas-title">Rating</h5>
                          <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                          </div>
                        <hr className="m-0"></hr>
                        <div className="offcanvas-body mx-0 flex-grow-0 h-100">
                          <div className="align-items-center justify-content-center d-flex flex-column h-100">
                              <h4>Add a Rating</h4>
                            <div className="mb-4">
                              <div className="basic-ratings jq-ry-container w-192">
                                <div className="jq-ry-group-wrapper">
                                  <div className="jq-ry-normal-group jq-ry-group">
                                      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 12.705 512 486.59" x="0px" y="0px" xmlSpace="preserve" width="32px" height="32px" fill="gray">
                                        <polygon points="256.814,12.705 317.205,198.566 512.631,198.566 354.529,313.435 414.918,499.295 256.814,384.427 98.713,499.295 159.102,313.435 1,198.566 196.426,198.566 "></polygon>
                                      </svg>
                                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 12.705 512 486.59" x="0px" y="0px" xmlSpace="preserve" width="32px" height="32px" fill="gray" className="ml8">
                                        <polygon points="256.814,12.705 317.205,198.566 512.631,198.566 354.529,313.435 414.918,499.295 256.814,384.427 98.713,499.295 159.102,313.435 1,198.566 196.426,198.566 "></polygon>
                                      </svg>
                                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 12.705 512 486.59" x="0px" y="0px" xmlSpace="preserve" width="32px" height="32px" fill="gray" className="ml8">
                                        <polygon points="256.814,12.705 317.205,198.566 512.631,198.566 354.529,313.435 414.918,499.295 256.814,384.427 98.713,499.295 159.102,313.435 1,198.566 196.426,198.566 "></polygon>
                                      </svg>
                                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 12.705 512 486.59" x="0px" y="0px" xmlSpace="preserve" width="32px" height="32px" fill="gray" className="ml8">
                                        <polygon points="256.814,12.705 317.205,198.566 512.631,198.566 354.529,313.435 414.918,499.295 256.814,384.427 98.713,499.295 159.102,313.435 1,198.566 196.426,198.566 "></polygon>
                                      </svg>
                                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 12.705 512 486.59" x="0px" y="0px" xmlSpace="preserve" width="32px" height="32px" fill="gray" className="ml8">
                                        <polygon points="256.814,12.705 317.205,198.566 512.631,198.566 354.529,313.435 414.918,499.295 256.814,384.427 98.713,499.295 159.102,313.435 1,198.566 196.426,198.566 "></polygon>
                                      </svg>
                                    </div>
                                  <div className="jq-ry-rated-group jq-ry-group w-90">
                                      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 12.705 512 486.59" x="0px" y="0px" xmlSpace="preserve" width="32px" height="32px" fill="#f39c12">
                                        <polygon points="256.814,12.705 317.205,198.566 512.631,198.566 354.529,313.435 414.918,499.295 256.814,384.427 98.713,499.295 159.102,313.435 1,198.566 196.426,198.566 "></polygon>
                                      </svg>
                                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 12.705 512 486.59" x="0px" y="0px" xmlSpace="preserve" width="32px" height="32px" fill="#f39c12" className="ml8">
                                        <polygon points="256.814,12.705 317.205,198.566 512.631,198.566 354.529,313.435 414.918,499.295 256.814,384.427 98.713,499.295 159.102,313.435 1,198.566 196.426,198.566 "></polygon>
                                      </svg>
                                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 12.705 512 486.59" x="0px" y="0px" xmlSpace="preserve" width="32px" height="32px" fill="#f39c12" className="ml8">
                                        <polygon points="256.814,12.705 317.205,198.566 512.631,198.566 354.529,313.435 414.918,499.295 256.814,384.427 98.713,499.295 159.102,313.435 1,198.566 196.426,198.566 "></polygon>
                                      </svg>
                                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 12.705 512 486.59" x="0px" y="0px" xmlSpace="preserve" width="32px" height="32px" fill="#f39c12" className="ml8">
                                        <polygon points="256.814,12.705 317.205,198.566 512.631,198.566 354.529,313.435 414.918,499.295 256.814,384.427 98.713,499.295 159.102,313.435 1,198.566 196.426,198.566 "></polygon>
                                      </svg>
                                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 12.705 512 486.59" x="0px" y="0px" xmlSpace="preserve" width="32px" height="32px" fill="#f39c12" className="ml8">
                                        <polygon points="256.814,12.705 317.205,198.566 512.631,198.566 354.529,313.435 414.918,499.295 256.814,384.427 98.713,499.295 159.102,313.435 1,198.566 196.426,198.566 "></polygon>
                                      </svg>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            <div className="w-75 card p-2">
                              <button type="button" className="btn btn-primary waves-effect waves-light m-1">
                                  Apply
                                </button>
                                <button type="button" className="btn btn-secondary waves-effect waves-light m-1">
                                  Clear
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <small>4.8</small>
                      <button type="button" className="btn waves-effect p-0">
                        <span className="ti ti-bookmarks"></span>
                        </button>
                        <small>223</small>
                      </div>
                    </div>
                  </div>
                <div className="px-4">
                  <div className="row mb-3">
                    <div className="col-lg-4">
                        <div><h6>Creator: <a href="javascript:void(0)">Brittney Doe</a></h6></div>
                      </div>
                    <div className="col-lg-4">
                      <div><h6 className="d-inline-block me-1">Cousine:</h6>Chinese</div>
                      </div>
                    <div className="col-lg-4">
                      <div><h6 className="d-inline-block me-1">Prep Time: </h6>15 min</div>
                      </div>
                    <div className="col-lg-4">
                      <div><h6 className="d-inline-block me-1">Diets: </h6>Vegetarian, Gluten Free</div>
                      </div>
                    <div className="col-lg-4">
                      <div><h6 className="d-inline-block me-1">Servings: </h6>4<i className="ti ti-pencil ti-sm align-middle mb-2 ms-1 cursor-pointer"></i></div>
                      </div>
                    <div className="col-lg-4">
                      <div><h6 className="d-inline-block me-1">Cooking Time: </h6>45 min</div>
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
                    </tbody>
                  </table>
                <div className="recipe_card_padding">
                  <h4 className="p-4 text-center mb-0">Steps</h4>
                  <div className="mb-4 px-4">
                        (//steps here)
                    </div>
                  <div className="px-4">
                      (//pictures here)
                    </div>
                  </div>
                </div>
              <div className="col-lg-3">
                <div className="card mb-4 p-2">
                  <a href="edit_recipe.html" className="btn btn-primary btn-md waves-effect waves-light btn_space m-1" type="button">Edit</a>
                  <a href="edit_recipe.html" className="btn btn-primary btn-md waves-effect waves-light btn_space m-1" type="button">Convert to New Recipe</a>
                  <button className="btn btn-primary btn-md waves-effect waves-light btn_space m-1" type="button">Add to Shopping Cart</button>
                  <button className="btn btn-outline-primary btn-md waves-effect waves-light btn_space m-1" type="button">Delete</button>
                  </div>
                <div className="col app-chat-history card overflow-hidden">
                  <div className="chat-history-wrapper mt-3 ms-3"><h4>Comments</h4></div>
                  <div className="chat-history-header border-bottom"></div>
                  <div className="chat-history-body bg-body ps ps--active-y h-400">
                    <ul className="list-unstyled chat-history m-3">
                      </ul>
                    <div className="ps__rail-x lb0"><div className="ps__thumb-x lw0" tabindex="0"></div></div>
                    <div className="ps__rail-y thr0"><div className="ps__thumb-y th0" tabindex="0"></div></div>
                    </div>
                  <div className="chat-history-footer shadow-sm p-2">
                    <form className="form-send-message d-flex justify-content-between align-items-center">
                      <input className="form-control message-input border-0 me-1 shadow-none" placeholder="Type comment here"></input>
                      <div className="message-actions d-flex align-items-center">
                        <label htmlFor="attach-doc" className="form-label mb-0">
                          <i className="ti ti-paperclip ti-sm cursor-pointer mx-1"></i>
                            <input type="file" id="attach-doc" hidden=""></input>
                          </label>
                        <button className="btn btn-primary d-flex send-msg-btn">
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