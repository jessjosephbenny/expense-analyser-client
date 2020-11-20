import React, { Component } from 'react';
import { compose } from 'redux';
import { Dialog, FilePicker, Button, TextInputField} from 'evergreen-ui';
import { Field, reduxForm } from 'redux-form';
import { WATCH_PREDICT_COLUMN } from '../../reduxflow/watcherActionTypes/expenseWatcherActionTypes';
import { connect } from 'react-redux';


const validate = values => {
    const errors = {}
    Object.keys(values).map(key => {
        const value = values[key]
        if (isNaN(value) && key!=='dateFormat')
            errors[key] = 'Value must be a number'
    })
    return errors
}

const renderField = ({ input, placeholder, label, type, hint, disabled, className, meta: { touched, error, warning } }) => {
    return (
        <TextInputField
            {...input}
            type={type}
            label={label}
            hint={hint}
            placeholder={placeholder}
            label={label}
            isInvalid={touched && error}
            validationMessage={touched && error}
            disabled={disabled}
            className={className} />
    )
}
class CustomTemplate extends Component {
    state = {
        uploadFile: null
    }

    render() {
        const { isShown, closeModal, predict } = this.props;
        const { uploadFile } = this.state;
        const inputDisabled = uploadFile === null ? true : false;
        return (
            <Dialog isShown={isShown} title="Custom Template Wizard" onCloseComplete={closeModal} width={700}>
                <div className="d-flex flex-column p-3">
                    <div className="d-flex row mb-2">
                        <div className="mr-2">
                            <FilePicker
                                multiple={false}
                                width={400}
                                marginTop={16}
                                onChange={(file) => this.setState({ uploadFile: file[0] })}
                            />
                        </div>
                        <div>
                            <Button intent="warning" height={32} iconAfter="lightbulb" marginTop={16} disabled={inputDisabled} onClick={() => predict(uploadFile)}>Predict</Button>
                        </div>
                    </div>
                    <div className="d-flex row">
                        <Field
                            name="date"
                            label="Date"
                            placeholder="Date"
                            hint="Please give column number of Date Field here"
                            disabled={inputDisabled}
                            component={renderField} />
                    </div>
                    <div className="d-flex row">
                        <Field
                            name="dateFormat"
                            placeholder="Date Format"
                            hint="Plase give format of date in Document"
                            disabled={inputDisabled}
                            component={renderField} />
                    </div>
                    <div className="d-flex row">
                        <Field
                            name="narration"
                            label="Narration"
                            hint="Please give column number of Narration Field here"
                            placeholder="Narration"
                            disabled={inputDisabled}
                            component={renderField}
                        />
                    </div>
                    <div className="d-flex row">
                        <Field
                            name="refNo"
                            label="Ref No"
                            hint="Please give column number of Ref No Field here"
                            placeholder="Ref No"
                            disabled={inputDisabled}
                            component={renderField}
                        />
                    </div>
                    <div className="d-flex row">
                        <Field
                            name="withdrawal"
                            label="Withdrawal Amount"
                            hint="Please give column number of Withdrawal Amount Field here"
                            placeholder="Withdrawal Amount"
                            disabled={inputDisabled}
                            component={renderField}
                        />
                    </div>
                    <div className="d-flex row">
                        <Field
                            name="deposit"
                            label="Deposit Amount"
                            hint="Please give column number of Deposit Amount Field here"
                            placeholder="Deposit Amount"
                            disabled={inputDisabled}
                            component={renderField}
                        />
                    </div>
                    <div className="d-flex row">
                        <Field
                            name="balance"
                            label="Balance"
                            hint="Please give column number of Balance Field here"
                            placeholder="Balance"
                            disabled={inputDisabled}
                            component={renderField}
                        />
                    </div>
                </div>
            </Dialog>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        predict: (file) => { dispatch({ type: WATCH_PREDICT_COLUMN, file }) }
    }
}
const mapStatesToProps = (state) => {
    return {
        initialValues: state.template.data
    }
}
export default compose(
    connect(mapStatesToProps, mapDispatchToProps),
    reduxForm({ form: 'customTemplate', validate })
)(CustomTemplate);