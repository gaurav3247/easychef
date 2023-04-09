import React, { useState } from 'react'
import api from '../../../../core/baseAPI'
import logo from '../../../../assets/img/logo.png'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'

const ChangePasswordModal = ({show, onClose, profileEmail}) => {

    const [apiError, setApiError] = useState('')
    const ChangePasswordSchema = yup.object().shape({
        oldpassword: yup.string().required(),
        newpassword1: yup.string().min(6).required(),
        newpassword2: yup.string().oneOf([yup.ref('newpassword1'), null], 'Passwords must match').required()
    })

    function ChangePassword(oldpassword, newPassword1, newPassword2) {
        const requestOptions = {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            old_password: oldpassword,
            password: newPassword1,
            password2: newPassword2
        };

        return api.put('/accounts/change-password/', requestOptions)
            .then(response => {
                console.log(response)
            })
    }

    function close() {
        setApiError('')
        onClose()
    }

    if (!show) {
        return ('')
    }

    return (
        <>
            <Modal style={{width: 385}} isOpen={show} toggle={close} centered>
                <ModalHeader toggle={close}></ModalHeader>
                <ModalBody>
                <div class="card-body">
                            <div class="app-brand justify-content-center mb-4 mt-2">
                              <a href="index.html" class="app-brand-link gap-2">
                                <span class="app-brand-logo demo">
                                  <img alt='logo' src={logo} style={{ maxHeight: "50px" }}></img>
                                </span>
                                <span class="app-brand-text demo text-body fw-bold ms-1">EasyChef</span>
                              </a>
                            </div>
                            <h4 class="mb-1 pt-2">Change Password 🔒</h4>
                            <p class="mb-4">for <span class="fw-bold">{profileEmail}</span></p>
                            <form>
                              <div class="mb-3 form-password-toggle fv-plugins-icon-container">
                                <label class="form-label" for="old-password">Old Password</label>
                                <div class="input-group input-group-merge has-validation">
                                  <input type="password" id="old-password" class="form-control" name="password" placeholder="············" aria-describedby="password" />
                                </div>
                              </div>
                              <div class="mb-3 form-password-toggle fv-plugins-icon-container">
                                <label class="form-label" for="new-password">New Password</label>
                                <div class="input-group input-group-merge has-validation">
                                  <input type="password" id="new-password" class="form-control" name="password" placeholder="············" aria-describedby="password" />
                                </div>
                              </div>
                              <div class="mb-3 form-password-toggle fv-plugins-icon-container">
                                <label class="form-label" for="confirm-password">Confirm Password</label>
                                <div class="input-group input-group-merge has-validation">
                                  <input type="password" id="confirm-password" class="form-control" name="confirm-password" placeholder="············" aria-describedby="password" />
                                </div>
                              </div>
                              <button class="btn btn-primary d-grid w-100 mb-3 waves-effect waves-light">Set new password</button>
                              <input type="hidden" />
                            </form>
                          </div>
                </ModalBody>
            </Modal>
        </>
    )
}

export default ChangePasswordModal