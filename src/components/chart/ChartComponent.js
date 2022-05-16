import { createChart } from 'lightweight-charts';
import React, { useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';




const useStyles = makeStyles( theme => {
    return{

    cover: {
        height: "85%",
        width: "85%",
        [theme.breakpoints.down('sm')]:{
            
        }
    },

}

  });






export const ChartComponent = props => {
    const classes = useStyles();
	const chartContainerRef = useRef();

	useEffect(
		() => {
			const handleResize = () => {
				chart.applyOptions({ 
                    width: chartContainerRef.current.clientWidth,
                    height: chartContainerRef.current.clientHeight
                  });
			};


			const { data } = props;


            let chartProperties = {
                width: chartContainerRef.current.clientWidth,
                  height: chartContainerRef.current.clientHeight,
                
                 layout: {
                   backgroundColor: '#000000',
                   textColor: 'rgba(255, 255, 255, 0.9)',
                 },
                 grid: {
                   vertLines: {
                     color: 'rgba(197, 203, 206, 0.5)',
                   },
                   horzLines: {
                     color: 'rgba(197, 203, 206, 0.5)',
                   },
                 },
                 crosshair: {
                    mode: 'LightweightCharts.CrosshairMode.Normal',
                },
                 rightPriceScale: {
                   borderColor: 'rgba(197, 203, 206, 0.8)',
                 },
                 timeScale: {
                   borderColor: 'rgba(197, 203, 206, 0.8)',
                 },
              }
              

			const chart = createChart(chartContainerRef.current, chartProperties);
			chart.timeScale().fitContent();

			const newSeries = chart.addLineSeries({
          priceFormat: {
            type: 'price',
            precision: 6,
            minMove: 0.000001,
          }
      });

      //console.log(data);
			newSeries.setData(data);

			window.addEventListener('resize', handleResize);
			return () => {
				window.removeEventListener('resize', handleResize);

				chart.remove();
			};
		},
		[props.data]);

	return (
        
		<div ref={chartContainerRef} className={classes.cover} />
	);
};


