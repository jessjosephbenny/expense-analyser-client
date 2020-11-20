import React from 'react';
import { Link, } from 'react-router-dom';
import { Card } from '@blueprintjs/core';
import { FilePicker, Button, Combobox } from 'evergreen-ui';
import { connect } from 'react-redux';
import { WATCH_UPLOAD_STATEMENT } from '../reduxflow/watcherActionTypes/expenseWatcherActionTypes';
import CustomTemplate from './pageComponents/customTemplate';

class UploadScreen extends React.Component {
    state = {
        uploadFile: null,
        template: '',
        customModalVisible : false
    }
    onLinkClick = () => {
        if (this.props.location !== "/home/register")
            window.location.href = "/home/register"
    }
    onComboChange = (selected) => {
        if(selected === "Try Your Own Custom Template"){
            this.setState({
                customModalVisible:true,
                template : ""
            })
            return;
        }
        this.setState({
            template:selected
        })
    }
    render() {
        const { loading } = this.props;
        const {customModalVisible,template} = this.state
        return (
            <>
            <div style={{ height: '93vh', width: '100%', WebkitFilter: loading ? 'blur(2px)' : 'none' }}>
                <div className="d-flex justify-content-center h-100 w-100 p-5">
                    <div className="d-flex flex-column justify-content-center w-100">
                        <Card elevation={1} style={{ width: '100%' }}>
                            <h3 className="display-4 text-center">Lets Start!</h3>
                            <h3 className="display-4 text-center">Upload your statement here</h3>
                            <div className="d-flex justify-content-center row">
                                <div className="md-col">
                                <FilePicker
                                    multiple={false}
                                    width={400}
                                    marginTop={16}
                                    onChange={(file) => this.setState({ uploadFile: file[0] })}
                                />
                                </div>
                                <div className="md-col">                                    
                                <Combobox
                                    items={["HDFC Savings", "SBI Savings", "HDFC Credit","Try Your Own Custom Template"]}
                                    onChange={this.onComboChange}
                                    placeholder="Select Template"
                                    autocompleteProps={{
                                        title:'Select Template'
                                    }}
                                    width={240}
                                    marginTop = {16}
                                    marginLeft= {16}
                                    selectedItem =  {template}
                                />
                                </div>
                            </div>
                            <div className="d-flex justify-content-center mb-2">
                                <Button height={32} iconAfter="upload" marginTop={16} onClick={() => this.props.uploadAndAnalyse(this.state.uploadFile)} >Upload</Button>
                            </div>
                            <p class="text-center">
                                <Link onClick={this.onLinkClick}>SignUp</Link> to add your own personal templates
                            </p>
                        </Card>
                    </div>
                </div>
            </div>
            <CustomTemplate isShown = {customModalVisible} closeModal = {()=>this.setState({customModalVisible:false,template:''})} />
            </>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        loading: state.expenseState.loading
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        uploadAndAnalyse: (file) => dispatch({ type: WATCH_UPLOAD_STATEMENT, file })
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(UploadScreen);