import React, { useState, useEffect } from 'react';
import api from "../../core/baseAPI";
import ad1 from '../../assets/img/Carousel_img.png';
import ad2 from '../../assets/img/Carousel_img.png';
import ad3 from '../../assets/img/Carousel_img.png';
import Top from './Top';
import Popular from './Popular';
import Recent from './Recent';

const Home = () => {
  const [topCreators, setTopCreators] = useState([]);

  useEffect(() => {
    api.get(`/recipe/top-creators/?take=10`)
    .then((response) => {
        setTopCreators(response.data);
    })
    .catch(error => {
      console.error(error);
    });
  }, []);

    return (
        <div>
            <div className="container-xxl flex-grow-1 container-p-y">
              <div className="row">
                <div className="col-lg-12">
                  <div id="carouselExample" className="carousel slide"
                    data-bs-ride="carousel h-100">
                    <ol className="carousel-indicators">
                      <li data-bs-target="#carouselExample" data-bs-slide-to="0"
                        className="active" aria-current="true"></li>
                      <li data-bs-target="#carouselExample" data-bs-slide-to="1"
                        className=""></li>
                      <li data-bs-target="#carouselExample" data-bs-slide-to="2"
                        className=""></li>
                    </ol>
                    <div className="carousel-inner">
                      <div className="carousel-item active">
                        <img className="d-block img-fluid"
                          src= {ad1} alt="First slide"
                          width="100%"></img>
                      </div>
                      <div className="carousel-item">
                        <img className="d-block img-fluid"
                          src={ad2} alt="Second
                          slide" width="100%"></img>
                      </div>
                      <div className="carousel-item">
                        <img className="d-block img-fluid"
                          src={ad3} alt="Third slide"
                          width="100%"></img>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mt-4">
                <div className="col-lg-9">
                  <div className="d-flex">
                    <h4>Popular Recipes</h4>
                    <div className="ms-auto mt-1">
                      <a href="all_recipes.html">View all recipes</a>
                    </div>
                  </div>
                  (//insert all recipes here)
                </div>
                <div className="col-lg-3">
                  <h4>Top Creators</h4>
                  <div class="card-body">
                    <ul class="list-unstyled mb-0">
                      {topCreators.map(t => (
                        <Top id={t.id} avatar={t.avatar} full_name={t.full_name} number_of_recipes_created = {t.number_of_recipes_created}/>
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
                      <a href="all_recipes.html">View all recently viewed</a>
                    </div>
                  </div>
                  (//insert recently viewed here)
                </div>
                <div className="col-lg-3">
                  <h4>Recipes We're Loving</h4>
                  (//insert recipes loved here)
                </div>
              </div>
            </div>
        </div>
    )
}

export default Home
