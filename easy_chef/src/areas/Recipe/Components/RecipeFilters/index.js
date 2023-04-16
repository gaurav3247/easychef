import {forwardRef, useEffect, useImperativeHandle, useState} from "react";
import {Button, Label, Offcanvas, OffcanvasBody, OffcanvasHeader} from "reactstrap";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import api from "../../../../core/baseAPI";

const RecipeFilters = forwardRef(({applyFilters, filterByCreatorHidden, isComponent}, ref) => {
    const [filters, setFilters] = useState([])
    const [canvasOpen, setCanvasOpen] = useState(false)

    const [creatorsOptions, setCreatorsOptions] = useState([])
    const [ingredientsOptions, setIngredientsOptions] = useState([])
    const [cuisinesOptions, setCuisinesOptions] = useState([])
    const [dietsOptions, setDietsOptions] = useState([])
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

    const [filterByName, setFilterByName] = useState('')
    const [filterByCreators, setFilterByCreators] = useState([])
    const [filterByIngredients, setFilterByIngredients] = useState([])
    const [filterByCuisines, setFilterByCuisines] = useState([])
    const [filterByDiets, setfilterByDiets] = useState([])
    const [filterByCookingTime, setfilterByCookingTime] = useState([])

    const animatedComponents = makeAnimated({DropdownIndicator: () => null, IndicatorSeparator: () => null})
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

    useEffect(() => {
        api.get(`/recipe/filters/creator/`)
            .then((response) => {
                setCreatorsOptions(response.data);
            })

        api.get(`/recipe/filters/ingredients/`)
            .then((response) => {
                setIngredientsOptions(response.data);
            })

        api.get(`/recipe/filters/cuisines/`)
            .then((response) => {
                setCuisinesOptions(response.data);
            })

        api.get(`/recipe/filters/diets/`)
            .then((response) => {
                setDietsOptions(response.data);
            })
    }, [])

    useImperativeHandle(ref, () => ({
        getFilters() {
            return filters;
        },
        setFilters(filter) {
            setFilters(filter)
        }
    }));

    function countNumberOfFilters() {
        let totalFilters = filterByCreators.length + filterByIngredients.length + filterByCuisines.length + filterByDiets.length + filterByCookingTime.length;
        if (totalFilters > 0) {
            return (<span style={{"zIndex": "1"}}
                          className="badge rounded-pill bg-danger text-white badge-notifications">{totalFilters}</span>);
        }
    }

    const toggleCanvas = () => {
        setCanvasOpen(!canvasOpen)
    }

    function onApplyFilters() {
        applyFilters(filterByCreators, filterByIngredients, filterByCuisines, filterByDiets, filterByCookingTime, filterByName)
        setCanvasOpen(false);
    }

    function onClearFilters() {
        setFilterByName('');
        setFilterByCreators([]);
        setFilterByIngredients([]);
        setFilterByCuisines([]);
        setfilterByDiets([]);
        setfilterByCookingTime([])
        applyFilters([], [], [], [], [])
        toggleCanvas();
    }

    async function onFilterNameChange(name) {
        await setFilterByName(name.target.value);
        applyFilters(filterByCreators, filterByIngredients, filterByCuisines, filterByDiets, filterByCookingTime, name.target.value)
    }

    function onFilterCreatorsChange(creators) {
        setFilterByCreators(creators)
    }

    function onFilterIngredientsChange(ingredients) {
        setFilterByIngredients(ingredients)
    }

    function onFilterCuisinesChange(cuisines) {
        setFilterByCuisines(cuisines);
    }

    function onFilterDietsChange(diets) {
        setfilterByDiets(diets);
    }

    function onFilterCookingTimeChange(cookingTimes) {
        setfilterByCookingTime(cookingTimes)
    }

    function CreatorFilter() {
        if (!filterByCreatorHidden) {
            return (<>
                <div className='mb-3'>
                    <Label className='form-label'>Creators</Label>
                    <Select
                        theme={selectThemeColors}
                        getOptionLabel={option => option.full_name}
                        getOptionValue={option => option.id}
                        isClearable={false}
                        closeMenuOnSelect={true}
                        blurInputOnSelect={true}
                        components={animatedComponents}
                        defaultValue={[]}
                        value={filterByCreators}
                        onChange={onFilterCreatorsChange}
                        isMulti
                        styles={customStyles}
                        options={creatorsOptions}
                        className='react-select'
                        classNamePrefix='select'
                        placeholder='Select Creators...'
                    />
                </div>
            </>)
        } else {
            return (<></>)
        }
    }

    return (
        <>
        <div className={isComponent ? "mt-n3 mb-3 me-4" :"mt-n3 mb-3"}>
                <div className="row text-end">
                    <div className="col-9">
                        <div className="mx-n2">
                            {countNumberOfFilters()}
                            <Button onClick={toggleCanvas} type="button"
                                    className="btn btn-icon btn-outline-primary waves-effect"
                                    data-bs-toggle="offcanvas" data-bs-target="#offcanvasEnd"
                                    aria-controls="offcanvasEnd">
                                <span className="ti ti-adjustments"></span>
                            </Button>
                        </div>
                    </div>
                    <div className="col-3 d-flex flex-row-reverse bd-highlight">
                        <input onChange={onFilterNameChange} type="text" className="form-control w-100"
                               id="defaultFormControlInput"
                               placeholder="Search by Name" aria-describedby="defaultFormControlHelp"/>
                    </div>
                    <Offcanvas direction="end" isOpen={canvasOpen} toggle={toggleCanvas}>
                        <OffcanvasHeader toggle={toggleCanvas}>Advanced Filters</OffcanvasHeader>
                        <OffcanvasBody
                            className={''}>
                            <div className={'mb-5 mt-n3'}>
                                {CreatorFilter()}
                                <div className='mb-3'>
                                    <Label className='form-label'>Ingredients</Label>
                                    <Select
                                        theme={selectThemeColors}
                                        getOptionLabel={option => option.name}
                                        getOptionValue={option => option.name}
                                        isClearable={false}
                                        closeMenuOnSelect={true}
                                        blurInputOnSelect={true}
                                        components={animatedComponents}
                                        defaultValue={[]}
                                        value={filterByIngredients}
                                        onChange={onFilterIngredientsChange}
                                        isMulti
                                        styles={customStyles}
                                        options={ingredientsOptions}
                                        className='react-select'
                                        classNamePrefix='select'
                                        placeholder='Select Ingredients...'
                                    />
                                </div>
                                <div className='mb-3'>
                                    <Label className='form-label'>Cuisines</Label>
                                    <Select
                                        theme={selectThemeColors}
                                        getOptionLabel={option => option.name}
                                        getOptionValue={option => option.id}
                                        isClearable={false}
                                        closeMenuOnSelect={true}
                                        blurInputOnSelect={true}
                                        components={animatedComponents}
                                        defaultValue={[]}
                                        value={filterByCuisines}
                                        onChange={onFilterCuisinesChange}
                                        isMulti
                                        styles={customStyles}
                                        options={cuisinesOptions}
                                        className='react-select'
                                        classNamePrefix='select'
                                        placeholder='Select Cuisines...'
                                    />
                                </div>
                                <div className='mb-3'>
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
                                        value={filterByDiets}
                                        onChange={onFilterDietsChange}
                                        isMulti
                                        styles={customStyles}
                                        options={dietsOptions}
                                        className='react-select'
                                        classNamePrefix='select'
                                        placeholder='Select Diets...'
                                    />
                                </div>
                                <div className='mb-3'>
                                    <Label className='form-label'>Cooking Times</Label>
                                    <Select
                                        theme={selectThemeColors}
                                        getOptionLabel={option => option.name}
                                        getOptionValue={option => option.id}
                                        isClearable={false}
                                        closeMenuOnSelect={true}
                                        blurInputOnSelect={true}
                                        components={animatedComponents}
                                        defaultValue={[]}
                                        value={filterByCookingTime}
                                        onChange={onFilterCookingTimeChange}
                                        isMulti
                                        styles={customStyles}
                                        options={timeOptions}
                                        className='react-select'
                                        classNamePrefix='select'
                                        placeholder='Select Cooking Times...'
                                    />
                                </div>
                            </div>
                            <Button onClick={onApplyFilters} type="button"
                                    className="btn btn-primary mb-2 d-grid w-100 waves-effect waves-light"
                                    data-bs-dismiss="offcanvas">Apply</Button>
                            <Button onClick={onClearFilters} type="button"
                                    className="btn btn-label-secondary d-grid w-100 waves-effect"
                                    data-bs-dismiss="offcanvas">
                                Clear
                            </Button>
                        </OffcanvasBody>
                    </Offcanvas>
                </div>
            </div>
        </>
    )
})

export default RecipeFilters