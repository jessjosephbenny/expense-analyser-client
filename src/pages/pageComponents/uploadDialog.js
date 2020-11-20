import React, { Component } from 'react';
import { Dialog, FilePicker, Combobox } from 'evergreen-ui';
import { WATCH_UPLOAD_STATEMENT } from '../../reduxflow/watcherActionTypes/expenseWatcherActionTypes';
import { connect } from 'react-redux';

class UploadDialog extends Component {
    state = {
        file: null,
        template: ''
    }

    onConfirm = () => {
        const {uploadStatement} = this.props;
        const {file,template} = this.state;
        if (file === null || template === '')
            return
        uploadStatement(file,template)
    }

    render() {
        const { isShown, closeModal } = this.props;
        const { file, template} = this.state;
        const items = [
            {
                key: 'hdfc_savings_1',
                name: 'HDFC SAVINGS 1'
            },
            {
                key: 'hdfc_savings)2',
                name: 'HDFC SAVINGS 2'
            },
            {
                key: 'sbi_savings',
                name: 'SBI SAVINGS'
            }
        ]
        return (
            <Dialog isShown={isShown} onCloseComplete={closeModal} onConfirm={this.onConfirm} isConfirmDisabled={template === '' || file === null}>
                <div className="row d-flex justify-content-center">
                    <div className="md-col">
                        <FilePicker
                            multiple={false}
                            width={400}
                            marginTop={16}
                            onChange={(file) => this.setState({ file: file[0] })}
                        />
                    </div>
                    <div className="md-col">
                        <Combobox
                            items={items}
                            itemToString={item => item ? item.name : ""}
                            onChange={ ({key}) => this.setState({template:key}) }
                            placeholder="Select Template"
                            autocompleteProps={{
                                title: 'Select Template'
                            }}
                            width={240}
                            marginTop={16}
                            marginLeft={16}
                        />
                    </div>
                </div>
            </Dialog>
        )
    }
}
const mapDispatchtoProps = (dispath) => {
    return {
        uploadStatement: (file, template) => dispath({ type: WATCH_UPLOAD_STATEMENT, file, template })
    }
}
export default connect(null, mapDispatchtoProps)(UploadDialog);