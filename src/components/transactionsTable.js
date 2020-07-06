import React from 'react'
import { connect } from 'react-redux';
import { Table, Button, IconButton, TextInput, Text, Combobox, ThDisconnectIcon } from 'evergreen-ui';
import { WATCH_GET_EXPENSE_DATA } from '../reduxflow/watcherActionTypes/expenseWatcherActionTypes';
class Transactions extends React.Component {
    state = {
        currentPage: 1,
        lastPage: 1,
        pageSize: 10
    }
    componentDidMount = () => {
        this.props.getExpenseData();
    }
    componentDidUpdate = () => {
        const {transactionData} = this.props.expenseState;
        const { currentPage, pageSize, lastPage } = this.state;
        const newLastPage = Math.floor(transactionData.length/pageSize)+1;
        if(lastPage !== newLastPage){
            this.setState({
                lastPage:newLastPage
            })
        }
    }
    render() {
        const { currentPage, pageSize, lastPage } = this.state;
        const { transactionData } = this.props.expenseState;
        const rangeStart = (currentPage-1)*pageSize;
        const rangeEnd = currentPage*pageSize<transactionData.length?currentPage*pageSize:transactionData.length;
        const transactionDataView = transactionData.slice(rangeStart,rangeEnd);
        return (
            <>
                <Table>
                    <Table.Head>
                        <Table.TextHeaderCell>
                            Date
                </Table.TextHeaderCell>
                        <Table.TextHeaderCell>
                            Narration
                </Table.TextHeaderCell>
                        <Table.TextHeaderCell>
                            Chq. / Ref No.
                </Table.TextHeaderCell>
                        <Table.TextHeaderCell>
                            Value Date
                </Table.TextHeaderCell>
                        <Table.TextHeaderCell>
                            Withdrawal Amount
                </Table.TextHeaderCell>
                        <Table.TextHeaderCell>
                            Deposit Amount
                </Table.TextHeaderCell>
                        <Table.TextHeaderCell>
                            Closing Balance
                </Table.TextHeaderCell>
                    </Table.Head>
                    <Table.Body height={380}>
                        {transactionDataView.map(transaction => (
                            <Table.Row intent={transaction.withdrawalAmount>0?'danger':'success'}>
                                <Table.TextCell>
                                    {transaction.tDate}
                                </Table.TextCell>
                                <Table.TextCell>
                                    {transaction.narration}
                                </Table.TextCell>
                                <Table.TextCell>
                                    {transaction.refNo}
                                </Table.TextCell>
                                <Table.TextCell>
                                    {transaction.valueDate}
                                </Table.TextCell>
                                <Table.TextCell>
                                    {transaction.withdrawalAmount}
                                </Table.TextCell>
                                <Table.TextCell>
                                    {transaction.depositAmount}
                                </Table.TextCell>
                                <Table.TextCell>
                                    {transaction.ClosingBalance}
                                </Table.TextCell>
                            </Table.Row>
                        )
                        )}
                    </Table.Body>
                </Table>
                <div className="d-flex justify-content-end mt-3">
                    <Combobox
                        openOnFocus
                        height={40}
                        selectedItem={pageSize}
                        items={[5, 8, 10, 15,18]}
                        onChange={selected => this.setState({pageSize:selected})}
                        placeholder="Size"
                        className="mr-2"
                        width={120}
                        height={32}
                    />
                    <IconButton
                        icon="chevron-backward"
                        appearance="minimal"
                        height={32}
                        className="mr-2"
                        disabled={currentPage === 1 ? true : false}
                        onClick={() => { this.setState({ currentPage: 1 }) }}
                    />
                    <IconButton
                        icon="chevron-left"
                        appearance="minimal"
                        height={32}
                        className="mr-2"
                        disabled={currentPage === 1 ? true : false}
                        onClick={() => { this.setState({ currentPage: currentPage - 1 }) }}
                    />

                    <TextInput
                        value={currentPage}
                        width={48}
                        className="mr-2" />
                    <Text value={lastPage} size={700} className="mr-2 mt-1"> / </Text>
                    <TextInput
                        value={lastPage}
                        width={48}
                        className="mr-2" />
                    <IconButton
                        icon="chevron-right"
                        appearance="minimal"
                        height={32}
                        className="mr-2"
                        onClick={() => this.setState({ currentPage: currentPage + 1 })}
                        disabled={currentPage === lastPage ? true : false}
                    />
                    <IconButton
                        icon="chevron-forward"
                        appearance="minimal"
                        height={32}
                        className="mr-2"
                        disabled={currentPage === lastPage ? true : false}
                        onClick={() => this.setState({ currentPage: lastPage })}
                    />
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        expenseState: state.expenseState
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getExpenseData: () => dispatch({ type: WATCH_GET_EXPENSE_DATA })
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Transactions);