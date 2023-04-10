import * as React from 'react';
import {AutoCompleteComponent} from '@syncfusion/ej2-react-dropdowns';
import api from "../../../../core/baseAPI";
import "./index.css"
import {
    Modal,
    ModalHeader,
    ModalBody,
    Label,
    Input,
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
                CloseModal()
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

        function CloseModal() {
            onClose();
            setIsEditMode(false);
            setingredientName('')
            setIngredientQuality('')
        }

        function onSubmit() {
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
                CloseModal();
            } else {
                onIngredientAdded(ingredientName, ingredientQuality)
                CloseModal();
            }
        }

        function modalHeader() {
            if (isEditMode) {
                return (
                    <ModalHeader toggle={CloseModal}>Edit Ingredient</ModalHeader>
                )
            } else {
                return (
                    <ModalHeader toggle={CloseModal}>Add New Ingredient</ModalHeader>
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
                    <Button onClick={onSubmit} color='primary' type='submit'>
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
            <React.Fragment key="add-ingrediet-modal">
                <Modal style={{width: 385}} isOpen={show} centered unmountOnClose={false}>
                    <div>
                        {modalHeader()}
                    </div>
                    <ModalBody>
                        <div className="card-body">
                            <div className='mb-3'>
                                <Label className='form-label' for='email'>
                                    Ingredient Name
                                </Label>
                                <AutoCompleteComponent value={ingredientName} change={onIngredientNameChange}
                                                       fields={localFields} id="suggestions"
                                                       dataSource={suggestions}
                                                       placeholder="Ingredient Name"/>
                                <div>
                                    {ingredientValidationError()}
                                </div>
                            </div>
                            <div className='mb-1'>
                                <Label className='form-label' for='email'>
                                    Quantity/Amount
                                </Label>
                                <Input value={ingredientQuality} onChange={onIngredientQualityChange} type='quantity'
                                       placeholder='Ingredient Quantity'/>
                                <div>
                                    {ingredientQuantityValidationError()}
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <div>
                            {modalButton()}
                        </div>
                        <Button color='outline-secondary' onClick={() => CloseModal()}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        )
    }
)
export default AddIngredient;