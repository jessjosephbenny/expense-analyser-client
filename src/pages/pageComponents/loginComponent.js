import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { TextInputField } from 'evergreen-ui';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { WATCH_LOGIN_USER } from '../../reduxflow/watcherActionTypes/expenseWatcherActionTypes';

const validate = values => {
    const errors = {}
    if (!values.username) {
        errors.username = ''
    } else if (values.username.search('@')===-1) {
        errors.username = 'Invalid email address'
    }
    if (!values.password) {
        errors.password = ''
    }
    return errors
}

const renderField = ({ input, placeholder, type, meta: { touched, error, warning } }) => {
    return (
        <>
            <TextInputField  {...input} type={type} placeholder={placeholder} isInvalid={touched && error} validationMessage={touched && error} className="form-control border-0 shadow-sm px-4" />
        </>
    )
}

class LoginComponent extends Component {

    onSubmit = (formProps) => {
        this.props.loginUser(formProps,()=>{
            const {history} = this.props;
            history.push('/dashboard');
        });
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <div class="login d-flex align-items-center py-5">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-10 col-xl-7 mx-auto">
                            <h3 class="display-4">Login</h3>
                            <p class="text-muted mb-4">Login to access your personal expense dashboard</p>
                            <form onSubmit={handleSubmit(this.onSubmit)}>
                                <div class="form-group mb-3">
                                    <Field name="username" type="email" placeholder="email" component={renderField} />
                                    {/* <TextInput type="email" placeholder="Email address" required className="form-control rounded-pill border-0 shadow-sm px-4" /> */}
                                </div>
                                <div class="form-group mb-3">
                                    <Field name="password" type="password" placeholder="password" component={renderField} />
                                    {/* <TextInput type="password" placeholder="Password" required className="form-control rounded-pill border-0 shadow-sm px-4 text-primary" /> */}
                                </div>
                                <div class="custom-control custom-checkbox mb-3">
                                    <input id="customCheck1" type="checkbox" checked class="custom-control-input" />
                                    <label for="customCheck1" class="custom-control-label">Remember password</label>
                                </div>
                                <button type="submit" class="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm">Sign in</button>
                                <Link to="home/register" style={{ textDecoration: 'none' }}>
                                    <button class="btn btn-danger btn-block text-uppercase mb-2 rounded-pill shadow-sm">New User! Sign Up</button>
                                </Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapDispatchtoProps = (dispatch) => {
    return{
        loginUser: (data,callback)=> dispatch({type:WATCH_LOGIN_USER,data,callback})
    }
}
export default compose(
    connect(null,mapDispatchtoProps),
    reduxForm({ form: 'loginForm', validate })
)(LoginComponent)