import {useEffect, useState} from "react";
import api from "../../../../core/baseAPI";
import QueryBuilder from "../../../../core/queryBuilder";
import ReactPaginate from "react-paginate";
import BreadCrumbs from "../../../../core/components/breadcrumbs";
import RecipeFilters from "../../Components/RecipeFilters";
import RecipePreview from "../../Components/RecipePreview";

const MyRecipes = ({isComponent, userID}) => {
    const [recipes, setRecipes] = useState([])
    const [totalItems, setTotalItems] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [skip, setSkip] = useState(0)
    const [userId, setUserId] = useState(0)
    const [take, setTake] = useState(6)
    const [query, setQuery] = useState('')

    useEffect(() => {
        if (userID){
            setUserId(userID);
            getMyDetails(userID)
        }
    }, [skip])

    useEffect(() => {
        if(userID) return;
        api.get('/accounts/edit-profile/')
            .then((response) => {
                setUserId(response.data.id);
                getMyDetails(response.data.id);
            })
    }, [])

    function getMyDetails(userId) {
        api.get(`/recipe/list?skip=${skip}&take=${take}&creator=${userId}&${query}`)
            .then((response) => {
                setRecipes(response.data);
            })

        api.get(`/recipe/list-count?&${query}&creator=${userId}`)
            .then((response) => {
                let total = response.data.count;
                setTotalItems(total)
                let numberOfPages = Math.ceil(Number(total) / Number(take))
                setTotalPages(numberOfPages)
            })
    }

    function onApplyFilters(filterByCreators, filterByIngredients, filterByCuisines, filterByDiets, filterByCookingTime, filterByName) {
        const builder = new QueryBuilder();
        if (filterByName)
            builder.addParam("name", [filterByName]);
        if (filterByCreators && filterByCreators.length > 0)
            builder.addParam("creator", filterByCreators.map(i => i.id));
        if (filterByIngredients && filterByIngredients.length > 0)
            builder.addParam("ingredient", filterByIngredients.map(i => i.name));
        if (filterByCuisines && filterByCuisines.length > 0)
            builder.addParam("cuisine", filterByCuisines.map(i => i.id));
        if (filterByDiets && filterByDiets.length > 0)
            builder.addParam("diet", filterByDiets.map(i => i.id));
        if (filterByCookingTime && filterByCookingTime.length > 0)
            builder.addParam("cookTime", filterByCookingTime.map(i => i.name));

        const queryString = builder.build();

        setQuery(queryString);
        api.get(`/recipe/list?skip=${skip}&take=${take}&creator=${userId}&${queryString}`)
            .then((response) => {
                setRecipes(response.data);
            })

        api.get(`/recipe/list-count?creator=${userId}&${queryString}`)
            .then((response) => {
                let total = response.data.count;
                setTotalItems(total)
                let numberOfPages = Math.ceil(Number(total) / Number(take))
                setTotalPages(numberOfPages)
            })
        setSkip(0)
    }

    function pageChanged(page) {
        let new_skip = Number(take) * Number(page.selected)
        setSkip(new_skip)
    }

    const Previous = () => {
        return <span className='align-middle d-none d-md-inline-block'> <i
            className="ti ti-chevron-left ti-xs  mt-n1"></i> Prev</span>
    }

    const Next = () => {
        return <span className='align-middle d-none d-md-inline-block'>Next  <i
            className="ti ti-chevron-right ti-xs  mt-n1"></i></span>
    }

    const PaginationBar = () => {
        if (totalItems > 0) {
            return (
                <>
                    <div>
                        <div className={isComponent ? "card me-4" : "card"}>
                            <div className="row">
                                <div className="col-6">
                                    <div className="ms-3 mb-n2" style={{"marginTop": "0.6rem"}}>
                                        <ReactPaginate
                                            onPageChange={pageChanged}
                                            pageCount={totalPages}
                                            breakLabel='...'
                                            nextLabel={<Next/>}
                                            pageRangeDisplayed={5}
                                            marginPagesDisplayed={2}
                                            activeClassName='active'
                                            pageClassName='page-item'
                                            breakClassName='page-item'
                                            previousLabel={<Previous/>}
                                            nextLinkClassName='page-link'
                                            pageLinkClassName='page-link'
                                            nextClassName='page-item next'
                                            breakLinkClassName='page-link'
                                            previousClassName='page-item prev'
                                            previousLinkClassName='page-link'
                                            containerClassName='pagination react-paginate'
                                        />
                                    </div>
                                </div>
                                <div className="col-6 text-end">
                                    <p style={{"marginTop": "1rem", "marginRight": "1rem"}}>1 of {totalPages} pages
                                        ({totalItems} items)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )
        } else {
            return (
                <div className="text-center mt-2"><h3>No results found</h3></div>
            )
        }
    }

    function breadCrumbs() {
        if (!isComponent) {
            return (
                <>
                    <BreadCrumbs basePage="Home" currentPage="My Recipes"></BreadCrumbs>
                    <RecipeFilters isComponent={isComponent} applyFilters={onApplyFilters}
                                   filterByCreatorHidden={true}></RecipeFilters>
                </>
            )
        }
    }

    return (
        <>
            <div>
                {breadCrumbs()}
            </div>
            <div className="row mb-1">
                {recipes.map(recipe => (
                    <div className="col-md-6 col-xl-4 col-lg-4 mb-3">
                        <RecipePreview recipe={recipe}></RecipePreview>
                    </div>
                ))}
            </div>
            {PaginationBar()}
        </>
    )
}

export default MyRecipes
