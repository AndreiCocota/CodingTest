import React from 'react';
import { Group } from '@visx/group';
import { Bar } from '@visx/shape';
import { scaleLinear, scaleBand } from '@visx/scale';
import { max } from "d3-array";
import { ScaleSVG } from '@visx/responsive';


export default function BarGraph(props) {
    const width = 45*12 +20;
    const height = 530;
    const margin = { top: 20, bottom: 20, left: 20, right: 20 };

    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;

    const x = d => d;
    const y = d => d;

    const xScale = scaleBand({
        range: [0, xMax],
        round: true,
        domain: props.data.map(x),
        padding: 0.5,
    })

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    
    const dMax = max(props.data);

    const unit = dMax*10/yMax;
    

    const yScale = scaleLinear({
        range: [0, yMax],
        round: true,
        domain: [0, max(props.data, y)],
    })

    const compose = (scale,accessor) => data => scale(accessor(data))
    const xPoint = compose(xScale, x)
    const yPoint = compose(yScale, y);

    return (
        <div className="graph-bar-container">
            <h1 className="title">Number of posts created in 2019</h1>    
            <ScaleSVG width={560} height={550}>
            <svg width={width} height={height}>
                {props.data.map((d,i) => {
                    
                    return (
                    
                        <Group key={`asd2-${i}`}>
                            <Bar 
                                x = {i*45}
                                y = {Math.abs(yMax- (unit*d*100))}
                                height = {dMax*100}
                                width = {xScale.bandwidth()}
                                fill="rgba(23, 233, 217, .5)"
                                

                            />
                            <text
                                x = {i*45}
                                y = {Math.abs(yMax- (unit*d*100))}
                                fill="black"
                                fontSize = {24}
                                dx={"0.2em"}
                                dy={"-0.4em"}

                               >
                                {`${d}`}
                            </text>
                            <text  
                                x = {i*45}
                                y = {yMax}
                                fill = "black"
                                fontSize = {20}
                                dy={"1.8em"} 
                                >

                                {`${months[i]}`}    
                            </text>
                            
                        </Group>

                    )
                })}

            </svg></ScaleSVG>
            
        </div>
    )
}
