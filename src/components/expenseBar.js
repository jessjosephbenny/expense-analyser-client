import React from 'react'
import {ResponsiveBar} from '@nivo/bar';
const data = [
    {
      "country": "Jan",
      "hot dog": 23,
      "hot dogColor": "hsl(325, 70%, 50%)",
    },
    {
      "country": "Feb",
      "hot dog": 88,
      "hot dogColor": "hsl(186, 70%, 50%)",
    },
    {
      "country": "Mar",
      "hot dog": 122,
      "hot dogColor": "hsl(7, 70%, 50%)",
    },
    {
      "country": "Apr",
      "hot dog": 18,
      "hot dogColor": "hsl(124, 70%, 50%)",
    },
    {
      "country": "MAy",
      "hot dog": 106,
      "hot dogColor": "hsl(171, 70%, 50%)",
    },
    {
      "country": "Jun",
      "hot dog": 120,
      "hot dogColor": "hsl(302, 70%, 50%)",
    },
    {
      "country": "Jul",
      "hot dog": 139,
      "hot dogColor": "hsl(266, 70%, 50%)", 
    },
    {
        "country": "Aug",
        "hot dog": 23,
        "hot dogColor": "hsl(325, 70%, 50%)",
      },
      {
        "country": "Sep",
        "hot dog": 88,
        "hot dogColor": "hsl(186, 70%, 50%)",
      },
      {
        "country": "Oct",
        "hot dog": 122,
        "hot dogColor": "hsl(7, 70%, 50%)",
      },
      {
        "country": "Nov",
        "hot dog": 18,
        "hot dogColor": "hsl(124, 70%, 50%)",
      },
      {
        "country": "Dec",
        "hot dog": 106,
        "hot dogColor": "hsl(171, 70%, 50%)",
      },
      {
        "country": "AL",
        "hot dog": 120,
        "hot dogColor": "hsl(302, 70%, 50%)",
      },
      {
        "country": "AM",
        "hot dog": 139,
        "hot dogColor": "hsl(266, 70%, 50%)", 
      }
  ];  
const MyResponsiveBar = ({ data /* see data tab */ }) => (
    <ResponsiveBar
        data={data}
        keys={[ 'hot dog', 'burger', 'sandwich', 'kebab', 'fries', 'donut' ]}
        indexBy="country"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        colors={{ scheme: 'nivo' }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: '#38bcb2',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: '#eed312',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'fries'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'sandwich'
                },
                id: 'lines'
            }
        ]}
        borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'country',
            legendPosition: 'middle',
            legendOffset: 32
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'food',
            legendPosition: 'middle',
            legendOffset: -40
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
        legends={[
            {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
    />
)

class ExpenseBar extends React.Component{
    render(){
        return(
            <MyResponsiveBar data={data}/>
        )
    }
}
export default ExpenseBar;