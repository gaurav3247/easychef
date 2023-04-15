import React, {useState, useEffect} from 'react';
import api from "../../core/baseAPI";
import ad1 from '../../assets/img/Carousel_img.png';
import ad2 from '../../assets/img/Carousel_img2.png';
import ad3 from '../../assets/img/Carousel_img3.png';
import Top from './Top';
import RecipePreview from '../Recipe/Components/RecipePreview';
import {Link} from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel';
import AllRecipes from "../Recipe/Pages/AllRecipes";
import {Button, Input} from "reactstrap";


const Home = () => {
    const [topCreators, setTopCreators] = useState([]);
    const [popRecipe, setPopRecipe] = useState([]);
    const [recentRecipe, setRecentRecipe] = useState([]);

    useEffect(() => {
        api.get(`/recipe/top-creators/?take=10`)
            .then((response) => {
                setTopCreators(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        api.get(`/recipe/popular-recipes/?take=3`)
            .then((response) => {
                setPopRecipe(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        api.get(`/recipe/interactions?take=3`)
            .then((response) => {
                setRecentRecipe(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    function onSearchByName() {

    }

    return (

        <div>
            <div className="container-xxl flex-grow-1 container-p-y">
                <div className="row mt-n3 mb-4 me-4">
                    <div className="col-10">
                        <Input type='text' placeholder='Search Recipe By Name'/>
                    </div>
                    <div className="col-2">
                        <Button color='primary' className="w-100" type='button' onClick={() => onSearchByName()}>
                            Search
                        </Button>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-12">
                        <Carousel controls={false}>
                            <Carousel.Item>
                                <img
                                    className="d-block img-fluid"
                                    src={ad1}
                                    alt="burger"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block img-fluid"
                                    src={ad2}
                                    alt="breakfast"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block img-fluid"
                                    src={ad3}
                                    alt="meal"
                                />
                            </Carousel.Item>
                        </Carousel>
                    </div>
                </div>

                <div className="row mt-4">
                    <div className="col-lg-9">
                        <div className="d-flex">
                            <h4>Popular Recipes</h4>
                            <div className="ms-auto mt-1">
                                <Link to="/all-recipes">View all recipes</Link>
                            </div>
                        </div>
                        <div class="row">
                            {popRecipe.map(p => (
                                <div className="col-md-6 col-xl-4 col-lg-4 mb-3">
                                    <RecipePreview recipe={p}></RecipePreview>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <h4>Top Creators</h4>
                        <div class="card-body">
                            <ul class="list-unstyled mb-0">
                                {topCreators.map(t => (
                                    <Top id={t.id} avatar={t.avatar} full_name={t.full_name}
                                         number_of_recipes_created={t.number_of_recipes_created}/>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="row mt-4">
                    <div className="col-lg-9">
                        <div className="d-flex">
                            <h4>Recently Viewed</h4>
                            <div className="ms-auto mt-1">
                                <Link to="/user-profile//isInteractions=true">View all recently viewed</Link>
                            </div>
                        </div>
                        <div class="row">
                            {recentRecipe.map(r => (
                                <div className="col-md-6 col-xl-4 col-lg-4 mb-3">
                                    <RecipePreview recipe={r}></RecipePreview>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <h4>Recipes We're Loving</h4>
                        (//insert recipes loved here)
                    </div>
                </div>
            </div>
            {/*<div className="row mt-4">*/}
            {/*    <AllRecipes isComponent={true}></AllRecipes>*/}
            {/*</div>*/}
        </div>
    )
}

export default Home
