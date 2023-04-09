import {NavLink} from "react-router-dom";
import {useForm, Controller} from 'react-hook-form'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {AutoCompleteComponent} from '@syncfusion/ej2-react-dropdowns';
import api from "../../../../core/baseAPI";
import "./index.css"
import {
    Modal,
    ModalHeader,
    ModalBody,
    CardTitle,
    CardText,
    Form,
    Label,
    Input,
    FormFeedback,
    Button, ModalFooter
} from 'reactstrap'
import {forwardRef, useEffect, useImperativeHandle, useState} from "react";

const AddIngredient = forwardRef(({show, onClose, onIngredientAdded, onIngredientEdited}, ref) => {
        const [isEditMode, setIsEditMode] = useState(false)
        const [suggestions, setSuggestions] = useState([])
        const [ingredientName, setingredientName] = useState("")
        const [ingredientNameError, setIngredientNameError] = useState("")
        const [ingredientQuality, setIngredientQuality] = useState("")
        const [ingredientQuantityError, setIngredientQuantityError] = useState("")

        useImperativeHandle(ref, () => ({
            Close() {
                Close()
            },
            EditIngredient(ingredient) {
                setingredientName(ingredient.name)
                setIngredientQuality(ingredient.quantity)
                setIsEditMode(true);
            }
        }));

        useEffect(() => {
            api.get('/recipe/filters/ingredients/').then(response => setSuggestions(response.data))
        }, [])

        function Close() {
            onClose();
            setIsEditMode(false);
            setingredientName('')
            setIngredientQuality('')
        }


        function onSubmit () {
            if (!ingredientName) {
                setIngredientNameError("Ingredient name is required");
                return;
            }
            if (!ingredientQuality) {
                setIngredientQuantityError("Quantity is required.")
                return;
            } else if (!Number(ingredientQuality) || ingredientQuality <= 0) {
                setIngredientQuantityError("Quantity must be positive number")
                return;
            }

            if (isEditMode) {
                onIngredientEdited(ingredientName, ingredientQuality)
            } else {
                onIngredientAdded(ingredientName,ingredientQuality)
            }
        }

        function modalHeader() {
            if (isEditMode) {
                return (
                    <ModalHeader toggle={Close}>Edit Ingredient</ModalHeader>
                )
            } else {
                return (
                    <ModalHeader toggle={Close}>Add New Ingredient</ModalHeader>
                )
            }
        }

        function modalButton() {
            if (isEditMode) {
                return (
                    <Button onClick={onSubmit} color='primary' type='button'>
                        Save Changes
                    </Button>
                )
            } else {
                return (
                    <Button onClick={onSubmit}  color='primary' type='submit'>
                        Add Ingredient
                    </Button>
                )
            }
        }

        const localFields = {value: 'name'};

        function noRecordsTemplate() {
            return (<span className='norecord'></span>);
        }

        function ingredientValidationError() {
            if (ingredientNameError) {
                return (<div style={{
                    "width": "100%",
                    "margin-top": "0.25rem",
                    "font-size": "0.8125rem",
                    "color": "#ca3e00"
                }}>{ingredientNameError}</div>)
            } else {
                return (<></>)
            }
        }

        function ingredientQuantityValidationError() {
            if (ingredientQuantityError) {
                return (<div style={{
                    "width": "100%",
                    "margin-top": "0.25rem",
                    "font-size": "0.8125rem",
                    "color": "#ca3e00"
                }}>{ingredientQuantityError}</div>)
            } else {
                return (<></>)
            }
        }

        function onIngredientNameChange(name) {
            if (name) {
                console.log(name.value)
                setingredientName(name.value);
                setIngredientNameError('');
            } else {
                setingredientName('');
            }
        }

        function onIngredientQualityChange(quality) {
            if (quality) {
                setIngredientQuality(quality.target.value);
                setIngredientQuantityError(null);
            } else {
                setIngredientQuality(null);
            }
        }

        return (
            <div>
                <Modal style={{width: 385}} isOpen={show} toggle={Close} centered>

                    {modalHeader()}
                    <ModalBody>
                        <div className="card-body">
                            <div className='mb-3'>
                                <Label className='form-label' for='email'>
                                    Ingredient Name
                                </Label>
                                <AutoCompleteComponent value={ingredientName} change={onIngredientNameChange}
                                                       fields={localFields} id="suggestions"
                                                       dataSource={suggestions}
                                                       noRecordsTemplate={noRecordsTemplate = noRecordsTemplate.bind(this)}
                                                       placeholder="Ingredient Name"/>

                                {ingredientValidationError()}
                            </div>
                            <div className='mb-1'>
                                <Label className='form-label' for='email'>
                                    Quantity/Amount
                                </Label>
                                <Input value={ingredientQuality} onChange={onIngredientQualityChange} type='quantity'
                                       placeholder='Ingredient Quantity'/>
                                {ingredientQuantityValidationError()}
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        {modalButton()}
                        <Button color='outline-secondary' onClick={() => Close()}>
                            Cancel
                        </Button>
                    </ModalFooter>

                </Modal>
            </div>
        )
    }
)
export default AddIngredient;