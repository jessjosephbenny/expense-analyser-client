import React from 'react';
import { connect } from 'react-redux';
import { WATCH_GET_EXPENSE_DATA } from '../reduxflow/watcherActionTypes/expenseWatcherActionTypes';
import ClassificationContainer from '../components/classificationContainer';
import ExpenseLine from '../components/expenseLine';
import NoData from './pageComponents/noData';
import { Redirect } from 'react-router-dom';
import { IconButton } from 'evergreen-ui';
import FloatingButton from '../components/floatingButton';
import UploadDialog from './pageComponents/uploadDialog';
import CustomTemplate from './pageComponents/customTemplate';

class Dashboard extends React.Component {
    state = {
        isUploadDialogOpen: false,
        iscustomModalVisible : false
    }
    componentDidMount() {
        const { authenticated, getExpenseData } = this.props;
        if (authenticated)
            getExpenseData();
    }
    render() {
        const { authenticated, transactionData } = this.props;
        const { isUploadDialogOpen,iscustomModalVisible } = this.state;
        if (!transactionData && !authenticated)
            return (<Redirect to="/home" />)
        else if (!transactionData)
            return (<></>)
        else if (transactionData.length === 0)
            return (<div className="container"><NoData /></div>)
        else {
            return (
                <>
                    <div className="btn-float-right-bottom">
                        <FloatingButton>
                            <IconButton iconSize={32}
                                appearance="primary"
                                intent="danger"
                                icon="add-row-bottom"
                                className="btn-float"
                                onClick = {()=>this.setState({iscustomModalVisible:true})}
                                />
                            <IconButton iconSize={32}
                                appearance="primary"
                                intent="danger"
                                icon="upload"
                                className="btn-float" 
                                onClick = {()=>this.setState({isUploadDialogOpen:true})}
                                />
                        </FloatingButton>
                    </div>
                    <div className="container">
                        <div className="row mt-3">
                            <ClassificationContainer />
                        </div>
                        <div className="row mt-3 h-100">

                        </div>
                        <div className="row mt-3">
                            <div className="col" style={{ height: 550 }}>
                                <ExpenseLine />
                            </div>
                        </div>
                    </div>
                    <UploadDialog isShown={isUploadDialogOpen} closeModal={() => this.setState({ isUploadDialogOpen: false })} />
                    <CustomTemplate isShown={iscustomModalVisible} closeModal={()=>this.setState({iscustomModalVisible:false})} />
                </>
            )
        }
    }
}
const mapStateToProps = (state) => {
    return {
        summary: state.expenseState.summary,
        transactionData: state.expenseState.transactionData,
        authenticated: state.auth.authenticated
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getExpenseData: () => dispatch({ type: WATCH_GET_EXPENSE_DATA })
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);