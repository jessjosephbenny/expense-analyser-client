import React from 'react';
import MoneyCard from './moneyCard';
import Transactions from './transactionsTable';
import { connect } from 'react-redux';

class Dashboard extends React.Component {
    render() {
        const{totalWithdrawal,totalDeposit,balance,average} = this.props.summary;
        return (
            <div className="container">
                <div className="row mt-3">
                    <div className="col-md-3">
                        <MoneyCard header="Total Spent" value={totalWithdrawal} />
                    </div>
                    <div className="col-md-3">
                        <MoneyCard header="Total Income" value={totalDeposit} />
                    </div>
                    <div className="col-md-3">
                        <MoneyCard header="Balance" value={balance} />
                    </div>
                    <div className="col-md-3">
                        <MoneyCard header="Avg Spent" value={average} />
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col">
                        <Transactions/>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        summary: state.expenseState.summary
    }
}
// const mapDispatchToProps = (dispatch) => {
//     return {
//         getExpenseData: () => dispatch({ type: WATCH_GET_EXPENSE_DATA })
//     }
// };
export default connect(mapStateToProps,null)(Dashboard);