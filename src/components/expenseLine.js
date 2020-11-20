import React from 'react';
import { ResponsiveLine } from '@nivo/line'
import {Slider} from '@blueprintjs/core';
import { SegmentedControl } from 'evergreen-ui';
import { connect } from 'react-redux';

const MyResponsiveLine = ({ data /* see data tab */ }) => (
    <ResponsiveLine
        data={data}
        curve="monotoneX"
        margin={{ top: 50, right: 32, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            orient: 'top',
            tickSize: 5,
            tickPadding: 34,
            tickRotation: 270,
            legend: 'Month',
            legendOffset: 42,
            legendPosition: 'middle'
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Expense',
            legendOffset: -50,
            legendPosition: 'middle'
        }}
        colors={{ scheme: 'nivo' }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabel="y"
        pointLabelYOffset={-12}
        useMesh={true}
    />
)

class ExpenseLine extends React.Component {
    state = {
        segmentedControlOption: 'monthly',
        sliderValue: 1
    }
    labelRenderer = (value) => {
        const {segmentedControlOption} = this.state;
        if (value <= 3)
            return segmentedControlOption==='monthly'?`${value} Months`:segmentedControlOption==='daily'?`${value*10} Days`:null
        else if (value <= 5)
            return segmentedControlOption==='monthly'?`${(value - 2) * 3} Months`:segmentedControlOption==='daily'?`${value*10} Days`:null
        else if (value <= 7)
            return segmentedControlOption==='monthly'?`${(value - 5)} Years`:segmentedControlOption==='daily'?`${value*10} Days`:null
        else
            return segmentedControlOption==='monthly'?'Life Time':segmentedControlOption==='daily'?`${value*10} Days`:null
    }
    render() {
        const { segmentedControlOption, sliderValue } = this.state;
        const {dailyUsage} = this.props;
        let chartData = [];
        if (dailyUsage != null) {
            if(segmentedControlOption === 'monthly'){
                chartData = dailyUsage['monthly'].map(data=>{
                    return{
                        "x":`${data['month'].toDateString().split(' ')[1]}\n${data['month'].toDateString().split(' ')[3].substr(2,2)}`,
                        "y":data['expense']
                    }
                })
            }
            else if(segmentedControlOption === 'yearly'){
                chartData = dailyUsage['yearly'].map(data=>{
                    return{
                        "x":data['year'].toDateString().split(' ')[3],
                        "y":data['expense']
                    }
                })
            }
            else if(segmentedControlOption === 'daily'){
                chartData = dailyUsage['daily'].reverse().slice(0,sliderValue*10).map(data=>{    
                    return{
                        "x":data['date'].toDateString().split(' ').slice(1,3),
                        "y":data['expense']
                    }
                })
            }
        }
        return (
            <div className="d-flex flex-column mt-2 h-100">
                <div className="d-flex justify-content-end">
                    <SegmentedControl
                        width={240}
                        options={[
                            {
                                label: 'Daily',
                                value: 'daily'
                            },
                            {
                                label: 'Monthly',
                                value: 'monthly'
                            },
                            {
                                label: 'Yearly',
                                value: 'yearly'
                            },
                        ]}
                        value={segmentedControlOption}
                        onChange={value => this.setState({ segmentedControlOption: value })}
                    />
                </div>
                <div className="d-flex h-100">
                    <MyResponsiveLine data={[
                        {
                            "id": "japan",
                            "color": "hsl(194, 70%, 50%)",
                            data : chartData
                        }
                    ]

                    } />
                    <div className="d-flex flex-column justify-content-center" style={{ width: 64 }}>
                        <Slider min={1} max={8} stepSize={1} value={sliderValue}
                            onChange={value => this.setState({ sliderValue: value })}
                            labelRenderer={this.labelRenderer}
                            vertical
                            disabled ={segmentedControlOption==='yearly'?true:false}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        dailyUsage: state.expenseState.dailyUsage
    }
}

export default connect(mapStateToProps, null)(ExpenseLine);