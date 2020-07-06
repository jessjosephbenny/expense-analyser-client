import React from 'react';
import { Card } from '@blueprintjs/core';
import { FilePicker, Button } from 'evergreen-ui';
import { connect } from 'react-redux';
import { WATCH_UPLOAD_STATEMENT } from '../reduxflow/watcherActionTypes/expenseWatcherActionTypes';

class UploadScreen extends React.Component {
    state = {
        uploadFile : null
    }
    render() {
        const {loading} = this.props;
        return (
            <div style={{ height: '93vh',background:"linear-gradient(45deg, #283c86, #45a247)",WebkitFilter:loading?'blur(2px)':'none'}}>
                <div className="d-flex justify-content-center h-100">
                    <div className="d-flex flex-column justify-content-center">
                        <Card elevation={4}>
                            <h3 className="display-4">Lets Start! Upload your statemet here</h3>
                            <div className="d-flex justify-content-center">
                                <FilePicker multiple={false}  width={400} marginTop={16} onChange={(file)=>this.setState({uploadFile:file[0]})} />
                            </div>
                            <div className="d-flex justify-content-center">
                                <Button height={32} iconAfter="upload" marginTop={16} onClick={()=>this.props.uploadAndAnalyse(this.state.uploadFile)} >Upload</Button>
                            </div>
                        </Card>
                    </div>
                    </div>
                </div>
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
        uploadAndAnalyse: (file) => dispatch({ type: WATCH_UPLOAD_STATEMENT,file })
    }
};
export default connect(mapStateToProps,mapDispatchToProps) (UploadScreen);