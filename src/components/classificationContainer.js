import React from "react";
import HeaderLabel from "./headerLabel";
import { connect } from "react-redux";
import ExpensePie from "./expensePie";
import ClassificationDetails from "./classificationDetails";
import { Button } from "@blueprintjs/core";
import { SearchInput, TabNavigation, Tab, IconButton } from "evergreen-ui";
import MagicList from "./magicList";
import MoneyCard from "./moneyCard";
import D3Bubble from "./d3Bubble";

const ClassificationContext = React.createContext("all");
class ClassificationContainer extends React.Component {
  state = {
    detailScreen: false,
    selectedClassification: "all",
    selectedChart: "pie",
    searchkey: "",
  };
  onPieClick = (e, data) => {
    this.setState({
      detailScreen: true,
      selectedClassification: data.label,
    });
  };
  filterTable = (e) => {
    this.setState({
      searchkey: e.target.value,
    });
  };
  selectChart = (selectedChart) => {
      this.setState({
        selectedChart
      })
  }
  render() {
    const { selectedClassification, selectedChart, searchkey } = this.state;
    const { transactionData, classification } = this.props;
    const {
      totalWithdrawal,
      totalDeposit,
      balance,
      average,
    } = this.props.summary;
    let tableData =
      selectedClassification === "all"
        ? transactionData
        : classification[selectedClassification]["transactions"];
    tableData =
      searchkey === ""
        ? tableData
        : tableData.filter((value) => value["narration"].toLowerCase().includes(searchkey.toLowerCase()));
    return (
      <ClassificationContext.Provider value={selectedClassification}>
        <div className="col-md-8">
          <div className="row">
            <div className="col-md-3 mb-2">
              <MoneyCard header="Spent" value={totalWithdrawal} />
            </div>
            <div className="col-md-3 mb-2">
              <MoneyCard header="Income" value={totalDeposit} />
            </div>
            <div className="col-md-3 mb-2">
              <MoneyCard header="Balance" value={balance} />
            </div>
            <div className="col-md-3 mb-2">
              <MoneyCard header="Average" value={average} />
            </div>
          </div>
          <div className="row mb-2">
            <div className="d-flex flex-column h-100 w-100">
              <div className="d-flex">
                {selectedClassification !== "all" ? (
                  <Button
                    className="mr-2"
                    icon="arrow-left"
                    text="back"
                    onClick={() =>
                      this.setState({ selectedClassification: "all" })
                    }
                  />
                ) : null}
                <HeaderLabel
                  text={
                    selectedClassification === "all"
                      ? "All Transactions"
                      : selectedClassification
                  }
                />
                <div className="d-flex ml-auto justify-content-end">
                  <IconButton className="mr-2" icon="pie-chart" onClick={()=>this.selectChart('pie')} />
                  <IconButton className="mr-2" icon="regression-chart" onClick={()=>this.selectChart('bubble')} />
                </div>
              </div>
              {selectedChart === "pie" ? (
                selectedClassification === "all" ? (
                  <ExpensePie onClick={this.onPieClick} />
                ) : (
                  <ClassificationDetails
                    Classification={selectedClassification}
                  />
                )
              ) : selectedChart === "bubble" ? (
                <D3Bubble />
              ) : null}
            </div>
          </div>
        </div>
        <div className="col-md-4 h-100">
          <div className="d-flex mb-2">
            <SearchInput
              placeholder="Filter Transactions..."
              onChange={this.filterTable.bind(this)}
            />
          </div>
          <MagicList data={new Array(...tableData.reverse())} />
        </div>
      </ClassificationContext.Provider>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    transactionData: state.expenseState.transactionData,
    classification: state.expenseState.classification,
    summary: state.expenseState.summary,
  };
};
export default connect(mapStateToProps, null)(ClassificationContainer);
