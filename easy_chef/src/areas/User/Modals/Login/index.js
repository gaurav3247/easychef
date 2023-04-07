import {NavLink} from "react-router-dom";
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
    Button,
    Alert
} from 'reactstrap'
import {useForm, Controller} from 'react-hook-form'
import toast from 'react-hot-toast'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import api from "../../../../core/baseAPI";

const UserLoginModal = ({show, onClose, onOpenRegister}) => {
    const LoginSchema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().required(),
    })

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

    const {
        control,
        handleSubmit,
        formState: {errors}
    } = useForm({mode: 'onChange', resolver: yupResolver(LoginSchema)})

    const onSubmit = data => {
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
    return (
        <div>
            <Modal style={{width: 385}} isOpen={show} toggle={onClose} centered>
                <ModalHeader toggle={onClose}></ModalHeader>
                <ModalBody>
                    <div className="card-body">
                        <div className="app-brand justify-content-center mb-4 mt-n3">
                            <NavLink to="/" className={"app-brand-link gap-2"}>
                                <span className="app-brand-logo demo">
                                    <span className="app-brand-logo">
                                        <img src={require('../../../../assets/img/logo.png')} alt=""
                                             style={{"height": "59px"}}/>
                                        </span>
                                    </span>
                                <span className="app-brand-text demo text-body
                                  fw-bold ms-1">EasyChef</span>
                            </NavLink>
                        </div>
                        <CardTitle tag='h4' className='fw-bold mb-1'>
                            Welcome to EasyChef! 👋
                        </CardTitle>
                        <CardText className='mb-3'>Please sign-in and start the adventure</CardText>
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
                                    Remember Me
                                </Label>
                            </div>
                            <div className='d-flex'>
                                <Button className='mt-4 me-1 btn btn-primary d-grid w-100' color='primary'
                                        type='submit'>
                                    Sign in
                                </Button>
                            </div>
                            <p className="text-center mt-2">
                                <span>New on our platform?</span>
                                <a onClick={onOpenRegister} data-bs-toggle="modal" data-bs-target="#basicModal"
                                   href="javascript:void(0)" className="ms-1">
                                    <span>Create an account</span>
                                </a>
                            </p>
                        </Form>
                    </div>
                </ModalBody>
            </Modal>
        </div>
    )
}
export default UserLoginModal;