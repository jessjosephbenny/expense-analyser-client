import React, { Component } from 'react';
import {compose} from 'redux';
import { TextInput, TextInputField } from 'evergreen-ui';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';


const validate = values => {
    const errors = {}
    if (!values.username) 
        errors.username = ''
    else if (values.username.search('@')===-1) 
        errors.username = 'Invalid email address'
    if (!values.password) 
        errors.password = ''
    if(values.password && values.password.length<8)
        errors.password = "Password should contain minimum of 8 characters"
    if(!values.password && values.c_password)
        errors.password = 'Password should be filled'
    if(values.password !== values.c_password)
        errors.c_password = 'Passwords does not match'
    return errors
}

const renderField = ({ input, placeholder, type, meta: { touched, error, warning } }) => {
    return (
        <>
            <TextInputField  {...input} type={type} placeholder={placeholder} isInvalid={touched && error} validationMessage={touched && error} className="form-control border-0 shadow-sm px-4" />
        </>
    )
}

class RegisterComponent extends Component {
    onSubmit = (formProps) => {
        console.log(formProps)
    }
    render() {
        const { handleSubmit } = this.props;
        return (
            <div class="login d-flex align-items-center py-5">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-10 col-xl-7 mx-auto">
                            <h3 class="display-4">Register</h3>
                            <p class="text-muted mb-4">Register now and create your personal expense dashboard</p>
                            <form onSubmit={handleSubmit(this.onSubmit)}>
                                <div class="form-group mb-3">
                                    {/* <TextInput type="email" placeholder="Email address" required className="form-control rounded-pill border-0 shadow-sm px-4" /> */}
                                    <Field name="username" type="email" placeholder="Email" component={renderField} />
                                </div>
                                <div class="form-group mb-3">
                                    {/* <TextInput type="input" placeholder="Name" required className="form-control rounded-pill border-0 shadow-sm px-4" /> */}
                                    <Field name="name" type="input" placeholder="Full Name" component={renderField} />
                                </div>
                                <div class="form-group mb-3">
                                    <Field name="password" type="password" placeholder="Password" component={renderField} />
                                    {/* <TextInput type="password" placeholder="Password" required className="form-control rounded-pill border-0 shadow-sm px-4 text-primary" /> */}
                                </div>
                                <div class="form-group mb-3">
                                    <Field name="c_password" type="password" placeholder="Confirm Password" component={renderField}/>
                                    {/* <TextInput type="password" placeholder="Confirm Password" required className="form-control rounded-pill border-0 shadow-sm px-4 text-primary" /> */}
                                </div>
                                <div class="custom-control custom-checkbox mb-3">
                                    <input id="customCheck1" type="checkbox" checked class="custom-control-input" />
                                    <label for="customCheck1" class="custom-control-label">Remember password</label>
                                </div>
                                <button type="submit" class="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm">Sign Up</button>
                                <Link to="/home" style={{textDecoration:'none'}}>
                                    <button class="btn btn-danger btn-block text-uppercase mb-2 rounded-pill shadow-sm">Already a User! Sign In</button>
                                </Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default compose(
    reduxForm({
        form:'registerForm',
        validate
    })
) (RegisterComponent);