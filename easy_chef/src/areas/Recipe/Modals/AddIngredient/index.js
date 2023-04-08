import {NavLink} from "react-router-dom";
import {useForm, Controller} from 'react-hook-form'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import api from "../../../../core/baseAPI";
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
import {forwardRef, useImperativeHandle, useState} from "react";

const AddIngredient = forwardRef(({show, onClose, onIngredientAdded, onIngredientEdited}, ref) => {
        const [isEditMode, setIsEditMode] = useState(false)
        const AddIngredientSchema = yup.object().shape({
            ingredientName: yup.string().required(),
            quantity: yup.number().typeError('Serving must be a number').required('The number is required').test(
                'Is positive?',
                'The number must be greater than 0',
                (value) => value > 0
            ),
        })

        useImperativeHandle(ref, () => ({
            Close() {
                Close()
            },
            EditIngredient(ingredient) {
                setValue("ingredientName", ingredient.name)
                setValue("quantity", ingredient.quantity)
                setIsEditMode(true);
            }
        }));

        function Close() {
            reset();
            onClose();
            setIsEditMode(false);
            setValue("ingredientName", '')
            setValue("quantity", '')
        }

        const {
            control,
            handleSubmit,
            reset,
            setValue,
            formState: {errors}
        } = useForm({mode: 'onChange', resolver: yupResolver(AddIngredientSchema)})

        const onSubmit = data => {
            if (isEditMode) {
                onIngredientEdited(data.ingredientName, data.quantity)
            } else {
                onIngredientAdded(data.ingredientName, data.quantity)
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
                    <Button color='primary' type='submit'>
                        Save Changes
                    </Button>
                )
            } else {
                return (
                    <Button color='primary' type='submit'>
                        Add Ingredient
                    </Button>
                )
            }
        }

        return (
            <div>
                <Modal style={{width: 385}} isOpen={show} toggle={Close} centered>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        {modalHeader()}
                        <ModalBody>
                            <div className="card-body">
                                <div className='mb-3'>
                                    <Label className='form-label' for='email'>
                                        Ingredient Name
                                    </Label>
                                    <Controller
                                        id='ingredientName'
                                        name='ingredientName'
                                        defaultValue=''
                                        control={control}
                                        render={({field}) => (
                                            <Input {...field}
                                                   type='ingredientName'
                                                   placeholder='Ingredient Name'
                                                   invalid={errors.ingredientName && true}/>
                                        )}
                                    />
                                    {errors.ingredientName && <FormFeedback>{errors.ingredientName.message}</FormFeedback>}
                                </div>
                                <div className='mb-1'>
                                    <Label className='form-label' for='email'>
                                        Quantity/Amount
                                    </Label>
                                    <Controller
                                        id='quantity'
                                        name='quantity'
                                        defaultValue=''
                                        control={control}
                                        render={({field}) => (
                                            <Input {...field} type='quantity'
                                                   placeholder='Ingredient Quantity'
                                                   invalid={errors.quantity && true}/>
                                        )}
                                    />
                                    {errors.quantity && <FormFeedback>{errors.quantity.message}</FormFeedback>}
                                </div>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            {modalButton()}
                            <Button color='outline-secondary' onClick={() => Close()}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </Form>
                </Modal>
            </div>
        )
    }
)
export default AddIngredient;