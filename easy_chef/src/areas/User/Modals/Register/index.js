import {NavLink} from "react-router-dom";
import {Modal, ModalHeader, ModalBody, CardTitle, CardText, Form, Label, Input, FormFeedback, Button} from 'reactstrap'
import * as yup from 'yup'
import toast from 'react-hot-toast'
import {useForm, Controller} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import {useState} from "react";
import api from "../../../../core/baseAPI";


function registerUser(email, password, confirmPassword) {
    const requestOptions = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        email: email,
        password: password,
        password2: confirmPassword
    };

    return api.post(`/accounts/signup/`, requestOptions)
        .then((response) => {
            localStorage.setItem("user", JSON.stringify(response.data));
            return response;
        });
}

function loginUser(email, password) {
    const requestOptions = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        username: email,
        password: password
    };

    return api.post(`/accounts/login/`, requestOptions)
        .then((response) => {
            localStorage.setItem("user_tokens", JSON.stringify(response.data));
            return response;
        });
}

const UserRegisterModal = ({show, onClose, onOpenLogin}) => {
    const SignupSchema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().min(6).required(),
        confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required(),
        terms: yup.bool().required()
    })

    // ** Hooks
    const {
        control,
        handleSubmit,
        formState: {errors}
    } = useForm({mode: 'onChange', resolver: yupResolver(SignupSchema)})

    const onSubmit = data => {
        registerUser(data.email, data.password, data.confirmPassword)
            .then((response) => {
                if (response.status === 201) {
                    loginUser(data.email, data.password)
                        .then((token_data) => {
                            if (token_data.status === 200) {
                                onClose()
                            }
                        })
                        .catch((error) => {
                            console.error(error);
                            //todo: handle the error
                        });
                }
            })
            .catch((error) => {
                console.error(error);
                //todo: handle the error
            });
    }

    return (
        <div>
            <Modal style={{width: 385}} isOpen={show} toggle={onClose} centered>
                <ModalHeader toggle={onClose}></ModalHeader>
                <ModalBody>
                    <div className="card-body">
                        <div className="app-brand justify-content-center mb-4
                              mt-n3">
                            <NavLink to="/" className={"app-brand-link gap-2"}>
                                <span className="app-brand-logo demo">
                                    <img src={require('../../../../assets/img/logo.png')} alt=""
                                         style={{"height": "59px"}}/>
                                    </span>
                                <span className="app-brand-text demo text-body
                                  fw-bold ms-1">EasyChef</span>
                            </NavLink>
                        </div>
                        <CardTitle tag='h4' className='fw-bold mb-1'>
                            Adventure starts here 🚀
                        </CardTitle>
                        <CardText className='mb-3'>Make your food easy and fun!</CardText>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <div className='mb-1'>
                                <Label className='form-label' for='email'>
                                    Email
                                </Label>
                                <Controller
                                    id='email'
                                    name='email'
                                    defaultValue=''
                                    control={control}
                                    render={({field}) => (
                                        <Input {...field} type='email' placeholder='bruce.wayne@email.com'
                                               invalid={errors.email && true}/>
                                    )}
                                />
                                {errors.email && <FormFeedback>{errors.email.message}</FormFeedback>}
                            </div>
                            <div className='mb-1'>
                                <Label className='form-label' for='password'>
                                    Password
                                </Label>
                                <Controller
                                    id='password'
                                    name='password'
                                    defaultValue=''
                                    control={control}
                                    render={({field}) => (
                                        <Input {...field} type='password' placeholder='Password'
                                               invalid={errors.password && true}/>
                                    )}
                                />
                                {errors.password && <FormFeedback>{errors.password.message}</FormFeedback>}
                            </div>
                            <div className='mb-1'>
                                <Label className='form-label' for='password'>
                                    Confirm Password
                                </Label>
                                <Controller
                                    id='confirmPassword'
                                    name='confirmPassword'
                                    defaultValue=''
                                    control={control}
                                    render={({field}) => (
                                        <Input {...field} type='password' placeholder='Confirm Password'
                                               invalid={errors.confirmPassword && true}/>
                                    )}
                                />
                                {errors.confirmPassword &&
                                    <FormFeedback>{errors.confirmPassword.message}</FormFeedback>}
                            </div>
                            <div className='form-check mb-n1 mt-2'>
                                <Controller
                                    name='terms'
                                    control={control}
                                    render={({field}) => (
                                        <Input {...field} id='terms' type='checkbox' checked={field.value}
                                               invalid={errors.terms && true}/>
                                    )}
                                />
                                <Label className='form-check-label' for='terms'>
                                    I agree to
                                    <a className='ms-1' href='/' onClick={e => e.preventDefault()}>
                                        privacy policy & terms
                                    </a>
                                </Label>
                            </div>
                            <div className='d-flex'>
                                <Button className='mt-4 me-1 btn btn-primary d-grid w-100' color='primary'
                                        type='submit'>
                                    Sign up
                                </Button>
                            </div>
                            <p className='text-center mt-2'>
                                <span className='me-25'>Already have an account?</span>
                                <a onClick={onOpenLogin} data-bs-toggle="modal" data-bs-target="#basicModal"
                                   href="javascript:void(0)" className="ms-1">
                                    <span>Sign in instead</span>
                                </a>
                            </p>
                        </Form>
                    </div>
                </ModalBody>
            </Modal>
        </div>
    )
}
export default UserRegisterModal;