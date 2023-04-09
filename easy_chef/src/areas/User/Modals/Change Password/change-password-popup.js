import React, { useState } from 'react'
import api from '../../../../core/baseAPI'
import logo from '../../../../assets/img/logo.png'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Form, FormFeedback, Input, Label, Modal, ModalBody, ModalHeader } from 'reactstrap'
import { Controller, useForm } from 'react-hook-form'

const ChangePasswordModal = ({show, onClose, profileEmail}) => {
    const [apiError, setApiError] = useState('')

    const ChangePasswordSchema = yup.object().shape({
        old_password: yup.string().required("This field is required"),
        password: yup.string().min(6, "Password must be at least 6 characters").required(),
        password2: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required("This is a required field")
    })

    function changePassword(oldpassword, newPassword1, newPassword2) {
        const requestOptions = {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            old_password: oldpassword,
            password: newPassword1,
            password2: newPassword2
        };

        return api.put('/accounts/change-password/', requestOptions)
            .then((response) => {
                return response
            })
            .catch(function (error) {
                setApiError("Change password failed")
            })
    }

    const {
        control,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm({mode: 'onChange', resolver: yupResolver(ChangePasswordSchema)})

    function close() {
        setApiError("")
        onClose()
        reset()
    }

    const onSubmit = data => {
        changePassword(data.old_password, data.password, data.password2)
            .then((token_data) => {
                if (token_data.status === 200) {
                    close()
                }
            })
    }

    if (!show) {
        return ('')
    }

    return (
        <>
            <Modal style={{width: 385}} isOpen={show} toggle={close} centered>
                <ModalHeader toggle={close}></ModalHeader>
                <ModalBody>
                    <div className="card-body">
                        <div className="app-brand justify-content-center mb-2 mt-n4">
                            <a href="index.html" className="app-brand-link gap-2">
                                <span className="app-brand-logo demo">
                                <img alt='logo' src={logo} style={{ maxHeight: "50px" }}></img>
                            </span>
                                <span className="app-brand-text demo text-body fw-bold ms-1">EasyChef</span>
                            </a>
                        </div>
                        <h4 className="mb-1 pt-2">Change Password 🔒</h4>
                        <p className="mb-4">for <span className="fw-bold">{profileEmail}</span></p>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <div className='mb-1'>
                                <Label className='form-label' for='old_password'>
                                    Current Password
                                </Label>
                                <Controller
                                    id='old_password'
                                    name='old_password'
                                    defaultValue=''
                                    control={control}
                                    render={({field}) => (
                                        <Input {...field} type='password' placeholder="············"
                                                invalid={errors.old_password && true}/>
                                    )}
                                />
                                {errors.old_password && <FormFeedback>{errors.old_password.message}</FormFeedback>}
                            </div>
                            <div className='mb-1'>
                                <Label className='form-label' for='password'>
                                    New Password
                                </Label>
                                <Controller
                                    id='password'
                                    name='password'
                                    defaultValue=''
                                    control={control}
                                    render={({field}) => (
                                        <Input {...field} type='password' placeholder="············"
                                                invalid={errors.password && true}/>
                                    )}
                                />
                                {errors.password && <FormFeedback>{errors.password.message}</FormFeedback>}
                            </div>
                            <div className='mb-1'>
                                <Label className='form-label' for='password2'>
                                    Confirm Password
                                </Label>
                                <Controller
                                    id='password2'
                                    name='password2'
                                    defaultValue=''
                                    control={control}
                                    render={({field}) => (
                                        <Input {...field} type='password' placeholder="············"
                                                invalid={errors.password2 && true}/>
                                    )}
                                />
                                {errors.password2 && <FormFeedback>{errors.password2.message}</FormFeedback>}
                            </div>
                            <div className='d-flex text-danger mt-1 mt-2 mb-2 justify-content-center'>
                                {apiError}
                            </div>
                            <div className='d-flex'>
                                <Button className="btn btn-primary d-grid w-100 mb-2 waves-effect waves-light" color='primary'
                                        type='submit'>
                                    Save Password
                                </Button>
                            </div>
                        </Form>
                    </div>
                </ModalBody>
            </Modal>
        </>
    )
}

export default ChangePasswordModal