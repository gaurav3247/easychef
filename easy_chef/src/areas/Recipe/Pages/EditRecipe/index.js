import BreadCrumbs from "../../../../core/components/breadcrumbs";
import {Row, Col} from 'reactstrap'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {useForm, Controller} from 'react-hook-form'
import {Card, CardHeader, CardTitle, CardBody, Button, Form, Label, Input, FormFeedback} from 'reactstrap'

import Select, {components} from 'react-select'
import makeAnimated from 'react-select/animated'
import {useEffect, useRef, useState} from "react";
import api from "../../../../core/baseAPI";
import EditRecipeSteps from "../../Components/EditRecipeSteps";
import EditRecipeIngredients from "../../Components/EditRecipeIngredients";
import AddIngredient from "../../Modals/AddIngredient";

const EditRecipe = () => {
    const animatedComponents = makeAnimated({DropdownIndicator: () => null, IndicatorSeparator: () => null})
    const [dietOptions, setdietOptions] = useState([])
    const [previewPicture, setpreviewPicture] = useState('')
    const editRecipeIngredientsRef = useRef();
    const fileInputRef = useRef(null);
    const addIngredientRef = useRef();
    const [addIngredientModal, setIngredientModal] = useState(false)
    const [cuisineOptions, setcuisineOptions] = useState([])
    const [timeOptions, setTimeOptions] = useState([
        {"id": 1, "name": "15 minutes"},
        {"id": 2, "name": "30 minutes"},
        {"id": 3, "name": "45 minutes"},
        {"id": 4, "name": "1 hour"},
        {"id": 4, "name": "2 hour"},
        {"id": 4, "name": "3 hour"},
        {"id": 4, "name": "4 hour"},
        {"id": 4, "name": "5+ hour"},
    ])

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

    const RecipeSchema = yup.object().shape({
        name: yup.string().required('The name is required'),
        serving: yup.number().typeError('Serving must be a number').required('The number is required').test(
            'Is positive?',
            'The number must be greater than 0',
            (value) => value > 0
        ),
    })

    useEffect(() => {
        const requestOptions = {
            method: "GET",
        };

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

    const {
        reset,
        control,
        handleSubmit,
        formState: {errors}
    } = useForm({mode: 'onChange', resolver: yupResolver(RecipeSchema)})

    const handlePreviewPictureUploadClick = () => {
        fileInputRef.current.click();
    };

    const handlePreviewPictureResetClick = () => {
        setpreviewPicture('');
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setpreviewPicture(reader.result);
        };
        reader.readAsDataURL(file);
    };


    function ingredientAdded(name, quantity){
        editRecipeIngredientsRef.current.addNewIngredient(name, quantity)
        addIngredientRef.current.Close()
    }

    function ingredientEdited(name, quantity){
        editRecipeIngredientsRef.current.editIngredient(name, quantity)
        addIngredientRef.current.Close()
    }

    function editIngredient(ingredient){
        setIngredientModal(!addIngredientModal)
        addIngredientRef.current.EditIngredient(ingredient)
    }

    const onSubmit = data => {

    }

    return (
        <>
            <BreadCrumbs basePage="My Recipes" currentPage="Create New Recipe"></BreadCrumbs>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="col-8">
                        <div className="card" data-select2-id="18">
                            <div className="card-header border-bottom my-n1">
                                <div className="row my-n2" style={{"margin-left": "-1.2rem"}}>
                                    <div className="col-6">
                                        <div
                                            style={{
                                                "font-weight": "500",
                                                "font-size": "1.285rem",
                                                "margin-top": "0.4rem"
                                            }}>
                                            Recipe Details
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="text-end">
                                            <Button color='primary' type='submit'>
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
                                            <Controller
                                                id='name'
                                                name='name'
                                                defaultValue=''
                                                control={control}
                                                render={({field}) => <Input {...field} placeholder='Recipe Name'
                                                                            invalid={errors.name && true}/>}
                                            />
                                            {errors.name &&
                                                <FormFeedback>{errors.name.message}</FormFeedback>}
                                        </div>
                                    </Col>
                                    <Col lg='6' md='12'>
                                        <div className=''>
                                            <Label className='form-label' for='firstName'>Serving *</Label>
                                            <Controller
                                                id='serving'
                                                name='serving'
                                                defaultValue=''
                                                control={control}
                                                render={({field}) => <Input {...field} placeholder='Serving'
                                                                            invalid={errors.serving && true}/>}
                                            />
                                            {errors.serving &&
                                                <FormFeedback>{errors.serving.message}</FormFeedback>}
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
                                                closeMenuOnSelect={false}
                                                components={animatedComponents}
                                                defaultValue={[]}
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
                        <EditRecipeIngredients ref={editRecipeIngredientsRef} onAddIngredient={()=> setIngredientModal(!addIngredientModal)} onEditIngredient={editIngredient}></EditRecipeIngredients>
                        <EditRecipeSteps></EditRecipeSteps>
                    </div>
                    <div className="col-4">
                        <div style={{"height": "38rem"}} className="card">
                            <img style={{"object-fit": "cover", "max-height": "250px"}}
                                 className="card-img-top h-50 object-fit-fill"
                                src={previewPicture ? previewPicture : require('../../../../assets/img/no-image.jpg')}
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
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        style={{ display: "none" }}
                                        onChange={handleFileChange}
                                    />
                                    <Button onClick={handlePreviewPictureUploadClick} color='primary' type='button'>
                                        Change Preview Picture
                                    </Button>
                                    <Button onClick={handlePreviewPictureResetClick} outline color='primary' type='button'>
                                        Reset
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
        <AddIngredient ref={addIngredientRef} show={addIngredientModal} onClose={()=>setIngredientModal(!addIngredientModal)} onIngredientAdded={ingredientAdded} onIngredientEdited={ingredientEdited}></AddIngredient>
        </>
    )
}

export default EditRecipe
