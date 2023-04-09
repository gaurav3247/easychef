import BreadCrumbs from "../../../../core/components/breadcrumbs";
import {Row, Col} from 'reactstrap'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {useForm, Controller} from 'react-hook-form'
import {Card, CardHeader, CardTitle, CardBody, Button, Form, Label, Input, FormFeedback} from 'reactstrap'

import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import {useEffect, useRef, useState} from "react";
import api from "../../../../core/baseAPI";
import EditRecipeSteps from "../../Components/EditRecipeSteps";
import EditRecipeIngredients from "../../Components/EditRecipeIngredients";
import AddIngredient from "../../Modals/AddIngredient";
import toast from 'react-hot-toast'
import {useNavigate, useParams} from "react-router-dom";

const EditRecipe = () => {
    const {id} = useParams();
    const [recipeName, setRecipeName] = useState('')
    const [recipeNameError, setRecipeNameError] = useState('')
    const [recipeServing, setRecipeServing] = useState('')
    const [recipeServingError, setRecipeServingError] = useState('')
    const [recipeDiets, setRecipeDiets] = useState([])
    const [recipeCuisine, setRecipeCuisine] = useState()
    const [recipeCookingTime, setRecipeCookingTime] = useState()
    const [recipePrepTime, setRecipePrepTime] = useState()
    const [refreshIngredients, setRefreshIngredients] = useState(false)

    const animatedComponents = makeAnimated({DropdownIndicator: () => null, IndicatorSeparator: () => null})
    const [dietOptions, setdietOptions] = useState([])
    const [userFullName, setuserFullName] = useState('')
    const [previewPicture, setpreviewPicture] = useState('')
    const [previewPictureFile, setPriviewPictureFile] = useState('')
    const editRecipeIngredientsRef = useRef();
    const editRecipeStepsRef = useRef();
    const fileInputRef = useRef(null);
    const addIngredientRef = useRef();
    const navigate = useNavigate();
    const [addIngredientModal, setIngredientModal] = useState(false)
    const [cuisineOptions, setcuisineOptions] = useState([])

    const timeOptions = [
        {"id": 1, "name": "15 minutes"},
        {"id": 2, "name": "30 minutes"},
        {"id": 3, "name": "45 minutes"},
        {"id": 4, "name": "1 hour"},
        {"id": 5, "name": "2 hour"},
        {"id": 6, "name": "3 hour"},
        {"id": 7, "name": "4 hour"},
        {"id": 8, "name": "5+ hour"},
    ]

    const selectThemeColors = theme => ({
        ...theme,
        colors: {
            ...theme.colors,
            primary25: '#f2e5e4', // for option hover bg-color
            primary: '#DA291C', // for selected option bg-color
            neutral10: 'rgba(240, 103, 103, 0.16)', // for tags bg-color
            neutral20: '#dbdade', // for input border-color
            neutral30: '#dbdade' // for input hover border-color
        }
    })

    const customStyles = {
        multiValue: (styles) => ({
            ...styles,
            borderRadius: "10%",
            color: "#DA291C",
        }),
        multiValueLabel: (styles) => ({
            ...styles,
            color: "#DA291C",
        }),
        control: (base, state) => ({
            ...base,
            ...base,
            boxShadow: state.isFocused ? 0 : 0,
            borderColor: state.isFocused
                ? "#DA291C"
                : base.borderColor,
            '&:hover': {
                borderColor: state.isFocused
                    ? "#DA291C"
                    : base.borderColor,
            }
        }),
        placeholder: (defaultStyles) => {
            return {
                ...defaultStyles,
                color: '#bab8c0',
            }
        },
        singleValue: provided => ({
            ...provided,
            color: '#6f6b7d'
        })
    }

    useEffect(() => {
        const requestOptions = {
            method: "GET",
        };
        if (id) {
            api.get(`/recipe/details/${id}/`, requestOptions)
                .then((response) => {
                    let recipe = response.data;
                    setRecipeName(recipe.name);
                    setRecipeServing(recipe.serving)
                    setRecipeDiets(recipe.diets)
                    setRecipeCookingTime(recipe.cooking_time)
                })
        }

        api.get('/accounts/edit-profile/', requestOptions)
            .then((response) => {
                let data = response.data;
                setuserFullName(data.full_name);
            })

        api.get('/recipe/filters/diets/', requestOptions)
            .then((response) => {
                let data = response.data;
                setdietOptions(data);
            })

        api.get('/recipe/filters/cuisines/', requestOptions)
            .then((response) => {
                let data = response.data;
                setcuisineOptions(data);
            })
    }, [])

    const handlePreviewPictureUploadClick = () => {
        fileInputRef?.current?.click();
    };

    const handlePreviewPictureResetClick = () => {
        setpreviewPicture('');
        setPriviewPictureFile('');
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            console.log(event.target);
            setPriviewPictureFile(file);
            setpreviewPicture(reader.result);
        };
        reader.readAsDataURL(file);
    };


    function ingredientAdded(name, quantity) {
        editRecipeIngredientsRef?.current?.addNewIngredient(name, quantity)
        addIngredientRef?.current?.Close()
    }

    function ingredientEdited(name, quantity) {
        editRecipeIngredientsRef?.current?.editIngredient(name, quantity)
        addIngredientRef?.current?.Close()
    }

    function editIngredient(ingredient) {
        setIngredientModal(!addIngredientModal)
        addIngredientRef?.current?.EditIngredient(ingredient)
    }

    function onNameChange(name) {
        setRecipeName(name.target.value);
    }

    function onServingChange(serving) {
        setRecipeServing(serving.target.value);
    }

    function onDietChange(diets) {
        setRecipeDiets(diets)
    }

    function onCuisineChange(cuisine) {
        setRecipeCuisine(cuisine);
    }

    function onCookingTimeChange(cuisine) {
        setRecipeCookingTime(cuisine);
    }

    function onPrepTimeChange(cuisine) {
        setRecipePrepTime(cuisine);
    }

    function Refresh() {
        setRefreshIngredients(!refreshIngredients);
    }

    const onSubmit = data => {
        let ingredients = editRecipeIngredientsRef?.current?.getIngredients();
        let steps = editRecipeStepsRef?.current?.getSteps();
        if (!recipeName) {
            setRecipeNameError("Name is required");
            return;
        }
        if (!recipeServing) {
            setRecipeServingError("Serving is required.")
            return;
        } else if (!Number(recipeServing) || recipeServing <= 0) {
            setRecipeServingError("Serving must be positive number")
            return;
        }

        if (ingredients.length <= 0) {
            toast.error('At least 1 ingredient is required')
            return;
        }
        if (steps.length < 50) {
            toast.error('At least 50 characters for steps is required')
            return;
        }

        createRecipe(steps, ingredients)
    }

    function recipeNameValidationError() {
        if (recipeNameError) {
            return (<div style={{
                "width": "100%",
                "margin-top": "0.25rem",
                "font-size": "0.8125rem",
                "color": "#ca3e00"
            }}>{recipeNameError}</div>)
        } else {
            return (<></>)
        }
    }

    function recipeServingValidationError() {
        if (recipeServingError) {
            return (<div style={{
                "width": "100%",
                "margin-top": "0.25rem",
                "font-size": "0.8125rem",
                "color": "#ca3e00"
            }}>{recipeServingError}</div>)
        } else {
            return (<></>)
        }
    }

    function createRecipe(steps, ingredients) {
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            name: recipeName,
            serving: Number(recipeServing),
            steps: steps,
            ingredients: ingredients
        };

        if (recipeCuisine) {
            requestOptions['cuisine'] = recipeCuisine.id;
        }
        if (recipePrepTime) {
            requestOptions['prep_time'] = recipePrepTime.name;
        }
        if (recipeCookingTime) {
            requestOptions['cooking_time'] = recipeCookingTime.name;
        }
        if (recipeDiets) {
            requestOptions['diets'] = recipeDiets.map(obj => ({"id": obj.id}));
        }

        return api.post(`/recipe/save/`, requestOptions)
            .then((response) => {
                if (response.status === 201) {
                    if (previewPictureFile) {
                        console.log(previewPictureFile);
                        const pictureRequestOptions = {
                            method: "PUT",
                            preview_picture: previewPicture,
                            mode: 'same-origin',
                            headers: {
                                'Accept': 'application/json',
                                'X-Requested-With': 'XMLHttpRequest',
                            },
                        };
                        api.put(`/recipe/upload-preview-pricture/${response.data.id}/`, pictureRequestOptions)
                            .then((response) => {
                                if (response.status !== 200) {
                                    toast.success('Some error occured')
                                }
                            });
                    }
                    toast.success('Recipe Created!')
                    navigate("/view-recipe/");

                } else
                    toast.success('Some error occured')
            });
    }

    return (
        <>
            <BreadCrumbs basePage="My Recipes" currentPage="Create New Recipe"></BreadCrumbs>
            <div className="row">
                <div className="col-8">
                    <div className="card" data-select2-id="18">
                        <div className="card-header border-bottom my-n1">
                            <div className="row my-n2" style={{"marginLeft": "-1.2rem"}}>
                                <div className="col-6">
                                    <div
                                        style={{
                                            "fontWeight": "500",
                                            "fontSize": "1.285rem",
                                            "marginTop": "0.4rem"
                                        }}>
                                        Recipe Details
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="text-end">
                                        <Button color='primary' type='button' onClick={onSubmit}>
                                            Publish Recipe
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <Row className='match-height mt-3'>
                                <Col lg='6' md='12'>
                                    <div className=''>
                                        <Label className='form-label' for='firstName'>Name *</Label>
                                        <Input value={recipeName}
                                               onChange={onNameChange}
                                               placeholder='Recipe Name'
                                        />
                                        {recipeNameValidationError()}
                                    </div>
                                </Col>
                                <Col lg='6' md='12'>
                                    <div className=''>
                                        <Label className='form-label' for='firstName'>Serving *</Label>
                                        <Input value={recipeServing}
                                               placeholder='Serving'
                                               onChange={onServingChange}
                                        />
                                        {recipeServingValidationError()}
                                    </div>
                                </Col>
                                <Col lg='6' md='12'>
                                    <div className='mt-3'>
                                        <Label className='form-label'>Diets</Label>
                                        <Select
                                            theme={selectThemeColors}
                                            getOptionLabel={option => option.name}
                                            getOptionValue={option => option.id}
                                            isClearable={false}
                                            closeMenuOnSelect={true}
                                            blurInputOnSelect={true}
                                            components={animatedComponents}
                                            defaultValue={[]}
                                            value={recipeDiets}
                                            onChange={onDietChange}
                                            isMulti
                                            styles={customStyles}
                                            options={dietOptions}
                                            className='react-select'
                                            classNamePrefix='select'
                                            placeholder='Select Diets...'
                                        />
                                    </div>
                                </Col>
                                <Col lg='6' md='12'>
                                    <div className='mt-3'>
                                        <Label className='form-label'>Cuisine</Label>
                                        <Select
                                            theme={selectThemeColors}
                                            getOptionLabel={option => option.name}
                                            getOptionValue={option => option.id}
                                            components={{
                                                DropdownIndicator: () => null,
                                                IndicatorSeparator: () => null
                                            }}
                                            className='react-select'
                                            classNamePrefix='select'
                                            defaultValue={[]}
                                            value={recipeCuisine}
                                            onChange={onCuisineChange}
                                            styles={customStyles}
                                            name='clear'
                                            options={cuisineOptions}
                                            isClearable
                                            placeholder='Select Cuisine...'
                                        />
                                    </div>
                                </Col>
                                <Col lg='6' md='12'>
                                    <div className='mt-3'>
                                        <Label className='form-label'>Prep Time</Label>
                                        <Select
                                            theme={selectThemeColors}
                                            getOptionLabel={option => option.name}
                                            getOptionValue={option => option.id}
                                            components={{
                                                DropdownIndicator: () => null,
                                                IndicatorSeparator: () => null
                                            }}
                                            className='react-select'
                                            classNamePrefix='select'
                                            defaultValue={[]}
                                            onChange={onPrepTimeChange}
                                            styles={customStyles}
                                            name='clear'
                                            options={timeOptions}
                                            isClearable
                                            placeholder='Select Prep Time...'
                                        />
                                    </div>
                                </Col>
                                <Col lg='6' md='12'>
                                    <div className='mt-3'>
                                        <Label className='form-label'>Cooking Time</Label>
                                        <Select
                                            theme={selectThemeColors}
                                            getOptionLabel={option => option.name}
                                            getOptionValue={option => option.id}
                                            components={{
                                                DropdownIndicator: () => null,
                                                IndicatorSeparator: () => null
                                            }}
                                            className='react-select'
                                            classNamePrefix='select'
                                            defaultValue={[]}
                                            onChange={onCookingTimeChange}
                                            styles={customStyles}
                                            name='clear'
                                            options={timeOptions}
                                            isClearable
                                            placeholder='Select Cooking Time...'
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </div>
                    <EditRecipeIngredients ref={editRecipeIngredientsRef}
                                           onAddIngredient={() => setIngredientModal(!addIngredientModal)}
                                           onEditIngredient={editIngredient}
                                           onRefreshIngredients={Refresh}></EditRecipeIngredients>
                    <EditRecipeSteps ref={editRecipeStepsRef}></EditRecipeSteps>
                </div>
                <div className="col-4">
                    <div style={{"height": "33rem"}} className="card">
                        <img style={{"objectFit": "cover", "maxHeight": "250px"}}
                             className="card-img-top h-50 object-fit-fill"
                             src={previewPicture ? previewPicture : require('../../../../assets/img/no-image.jpg')}
                             alt="Card image cap"/>
                        <span
                            className="badge bg-label-primary">Cooking Time:{recipeCookingTime ? recipeCookingTime.name : "Not Set"}</span>
                        <div className="card-body">
                            <h5 className="card-title text-truncate">{recipeName ? recipeName : "New Recipe Name"} (Preview)</h5>
                            <h6 className="card-subtitle text-muted">Creator:
                                <a className="ms-1" href="javascript:void(0)">{userFullName}</a>
                            </h6>
                            <p className="card-text mt-2 mb-1">
                                <small className="card-text text-uppercase">Details</small>
                            </p>
                            <ul className="list-unstyled mb-4" style={{"marginLeft": "-8px"}}>
                                <li className="d-flex mb-1-3">
                                    <span className="fw-bold mx-2">Serving:</span>
                                    <span className="text-truncate">{recipeServing ? recipeServing : "0"}</span>
                                </li>
                                <li className="d-flex mb-1-3">
                                    <span className="fw-bold mx-2">Cuisine:</span>
                                    <span
                                        className="text-truncate">{recipeCuisine ? recipeCuisine.name : "Selected Cuisine"}</span>
                                </li>
                                <li className="d-flex mb-1-3">
                                    <span className="fw-bold mx-2">Diets:</span>
                                    <span
                                        className="text-truncate">{recipeDiets.length > 0 ? recipeDiets.map((diet) => diet.name).join(", ") : "Selected Diets"}</span>
                                </li>
                                <li className="d-flex mb-1-3">
                                    <span className="fw-bold mx-2">Ingredients:</span>
                                    <span
                                        className="text-truncate">{editRecipeIngredientsRef?.current && editRecipeIngredientsRef?.current?.getIngredients()?.length > 0 ? editRecipeIngredientsRef?.current?.getIngredients()?.map((ingredient) => ingredient.name)?.join(", ") : "Selected Ingredients"}</span>
                                </li>
                            </ul>
                            <hr></hr>
                            <div className="text-center demo-inline-spacing mt-n3">
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    style={{display: "none"}}
                                    onChange={handleFileChange}
                                />
                                <Button onClick={handlePreviewPictureUploadClick} color='primary' type='button'>
                                    Change Preview Picture
                                </Button>
                                <Button onClick={handlePreviewPictureResetClick} outline color='primary'
                                        type='button'>
                                    Reset
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <AddIngredient ref={addIngredientRef} show={addIngredientModal}
                           onClose={() => setIngredientModal(!addIngredientModal)} onIngredientAdded={ingredientAdded}
                           onIngredientEdited={ingredientEdited}></AddIngredient>
        </>
    )
}

export default EditRecipe
