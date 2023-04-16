import * as React from 'react';
import api from "../../../../core/baseAPI";
import {
    Modal,
    ModalHeader,
    ModalBody,
    Label,
    Input,
    Button, ModalFooter
} from 'reactstrap'
import {useEffect, useRef, useState} from "react";
import toast from "react-hot-toast";

const ProfileEdit = ({show, onClose, onSaveChanges}) => {
    const [userEmail, setUserEmail] = useState("")
    const [userEmailError, setUserEmailError] = useState("")
    const [userFullName, setUserFullName] = useState("")
    const [userFullNameError, setUserFullNameError] = useState("")
    const [userPhoneNumber, setUserPhoneNumber] = useState("")
    const [userPhoneNumberError, setUserPhoneNumberError] = useState("")
    const [userAvatar, setUserAvatar] = useState("")
    const [userAvatarFile, setUserAvatarFile] = useState("")
    const fileInputRef = useRef(null);

    useEffect(() => {
        api.get('/accounts/edit-profile/')
            .then(response => {
                setUserEmail(response.data.username)
                setUserFullName(response.data.full_name)
                setUserPhoneNumber(response.data.phone_number)
                setUserAvatar(response.data.avatar)
            }
            )
    }, [])

    function CloseModal() {
        onClose();
        setUserEmailError('');
        setUserFullNameError('');
        setUserPhoneNumberError('');
    }

    function onSubmit() {
        if (!userFullName) {
            setUserFullNameError("Full Name is required");
            return;
        }

        let requestData = {
            full_name: userFullName,
            phone_number: userPhoneNumber
        }

        if(!userAvatar){
            requestData.avatar = null;
        }
        if(userAvatarFile){
            requestData.avatar = userAvatarFile;
        }

        api.patch('/accounts/edit-profile/', requestData)
        .then((response) => {
            if(response.status === 200){
                onSaveChanges();
                toast.success('Changes Saved')
                CloseModal();
            }
            else{

            }
        })
    }

    function emailValidationError() {
        if (userEmailError) {
            return (<div style={{
                "width": "100%",
                "margin-top": "0.25rem",
                "font-size": "0.8125rem",
                "color": "#ca3e00"
            }}>{userEmailError}</div>)
        } else {
            return (<></>)
        }
    }

    function fullNameValidationError() {
        if (userFullNameError) {
            return (<div style={{
                "width": "100%",
                "margin-top": "0.25rem",
                "font-size": "0.8125rem",
                "color": "#ca3e00"
            }}>{userFullNameError}</div>)
        } else {
            return (<></>)
        }
    }

    function phoneNumberValidation() {
        if (userPhoneNumberError) {
            return (<div style={{
                "width": "100%",
                "margin-top": "0.25rem",
                "font-size": "0.8125rem",
                "color": "#ca3e00"
            }}>{userPhoneNumberError}</div>)
        } else {
            return (<></>)
        }
    }

    function onUserEmailChange(email) {
        if (email) {
            setUserEmail(email.target.value);
            setUserEmailError(null);
        } else {
            setUserEmail(null);
        }
    }

    function onUserFullNameChange(quality) {
        if (quality) {
            setUserFullName(quality.target.value);
            setUserFullNameError(null);
        } else {
            setUserFullName(null);
        }
    }

    function onUserPhoneNumberChange(quality) {
        if (quality) {
            setUserPhoneNumber(quality.target.value);
            setUserPhoneNumberError(null);
        } else {
            setUserPhoneNumber(null);
        }
    }

    function handleAvatarReset() {
        setUserAvatar(null);
        setUserAvatarFile(null);
    }

    function onAvatarChange() {
        fileInputRef?.current?.click();
    }

    function onAvatarFileChange(event){
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setUserAvatarFile(reader.result)
        };
        reader.readAsDataURL(file);
    }

    return (
        <React.Fragment key="add-ingrediet-modal">
            <Modal style={{width: 385}} isOpen={show} centered unmountOnClose={false}>
                <ModalHeader toggle={CloseModal}>Profile Edit</ModalHeader>
                <ModalBody>
                    <div className="card-body">
                        {/*<div className='mb-3'>*/}
                        {/*    <Label className='form-label' for='email'>*/}
                        {/*        Email*/}
                        {/*    </Label>*/}
                        {/*    <Input value={userEmail} onChange={onUserEmailChange} type='quantity'*/}
                        {/*        placeholder='example@email.com'/>*/}
                        {/*    <div>*/}
                        {/*        {emailValidationError()}*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        <div className='mb-3'>
                            <Label className='form-label' for='email'>
                                Full Name
                            </Label>
                            <Input value={userFullName} onChange={onUserFullNameChange} type='quantity'
                                placeholder='Full Name'/>
                            <div>
                                {fullNameValidationError()}
                            </div>
                        </div>
                        <div className='mb-3'>
                            <Label className='form-label' for='email'>
                                Phone Number
                            </Label>
                            <Input value={userPhoneNumber} onChange={onUserPhoneNumberChange} type='quantity'
                                placeholder='Phone Number'/>
                            <div>
                                {phoneNumberValidation()}
                            </div>
                        </div>
                        <div className='d-flex mt-4'>
                            <div className='me-25'>
                                <img className='rounded me-50'
                                    style={{"object-fit": "cover"}}
                                    src={userAvatarFile ? userAvatarFile :
                                    userAvatar ? `http://127.0.0.1:8000${userAvatar}` : require('../../../../assets/img/default-avatar.png')}
                                     alt='Generic placeholder image' height='100'
                                     width='100'/>
                            </div>
                            <div className='d-flex align-items-center mt-75 ms-3'>
                                <div>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        style={{display: "none"}}
                                        onChange={onAvatarFileChange}
                                    />
                                    <Button tag={Label} onClick={onAvatarChange} className='mb-75 me-2' color='primary'>
                                        Upload
                                    </Button>
                                    <Button className='mb-75' color='secondary' outline
                                            onClick={handleAvatarReset}>
                                        Reset
                                    </Button>
                                    <p className='mb-0 mt-3'>Upload/Chage Profile Avatar.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={onSubmit} color='primary' type='button'>
                        Save Changes
                    </Button>
                    <Button color='outline-secondary' onClick={() => CloseModal()}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </React.Fragment>
    )
}

export default ProfileEdit;