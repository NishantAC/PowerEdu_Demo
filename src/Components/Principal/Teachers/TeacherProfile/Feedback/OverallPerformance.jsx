import React from 'react';
import './OverallPerformance.css'
import {
    Chart,
    PieSeries,
    Title
  } from '@devexpress/dx-react-chart-material-ui';

function OverallPerformance() {
    const data = [
        { argument:'Present', value:3 },
        { argument:'Absent', value:1 }
      ];
    return (
        <div className='overallperformance'>
            <div>
            <h4 style={{margin:'6px 12px',textAlign:'left',color:'#4B4B4B'}}>Overall Performance</h4>
            </div>
            <Chart
                data={data}
                height={200}
                style={{marginBottom:'10px'}}
                >
                <PieSeries valueField="value" 
                    argumentField="argument" 
                    innerRadius={0.6} />
            </Chart>
        </div>
    )
}

export default OverallPerformance
