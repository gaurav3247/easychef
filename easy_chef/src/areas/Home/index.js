import React, { useState } from 'react'
import ad1 from '../../assets/img/Carousel_img.png'
import ad2 from '../../assets/img/Carousel_img.png'
import ad3 from '../../assets/img/Carousel_img.png'

const Home = () => {
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
                  (//insert top creators here)
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
            <script src="./assets/libs/jquery/jquery.js"></script>
            <script src="./assets/libs/popper/popper.js"></script>
            <script src="./assets/js/bootstrap.js"></script>
            <script
              src="./assets/libs/perfect-scrollbar/perfect-scrollbar.js"></script>
            <script src="./assets/libs/node-waves/node-waves.js"></script>
            <script src="./assets/libs/hammer/hammer.js"></script>

            <script src="./assets/js/menu.js"></script>
            <script src="./assets/libs/swiper/swiper.js"></script>
            <script src="./assets/js/main.js"></script>
            <script src="./assets/libs/ui-carousel/ui-carousel.js"></script>
        </div>
    )
}

export default Home
