import React from 'react';
import MoneyCard from './moneyCard';
import Transactions from './transactionsTable';

class Dashboard extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="row mt-3">
                    <div className="col-2">
                        <MoneyCard header="Total Spent" value={1000000} />
                    </div>
                    <div className="col-2">
                        <MoneyCard header="Total Income" value={1400000} />
                    </div>
                    <div className="col-2">
                        <MoneyCard header="Balance" value={400000} />
                    </div>
                    <div className="col-2">
                        <MoneyCard header="Avg Spent" value={50000} />
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

export default Dashboard;