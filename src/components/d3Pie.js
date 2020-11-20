import React, { useRef, useEffect } from 'react';
import { select, pie, scaleOrdinal, quantize, interpolateSpectral, arc } from 'd3';

const width = 1400;
const height = Math.min(width, 800);
const radius = Math.min(width, height) / 2 * 0.8;

const Arc = arc()
    .innerRadius(0)
    .outerRadius(Math.min(width, height) / 2 - 1)
const arcLabel = arc()
    .innerRadius(radius)
    .outerRadius(radius)

export default function D3Pie({ data }) {
    const svgRef = useRef();
    useEffect(() => {
        const arcs = pie().sort(null).value(d => d.value)(data);
        const svg = select(svgRef.current).attr("viewBox", [-width / 2, -height / 2, width, height])
        const color = scaleOrdinal()
            .domain(data.map(d => d.name))
            .range(quantize(t => interpolateSpectral(t * 0.8 + 0.1), data.length).reverse())
        svg.append("g")
            .attr("stroke", "white")
            .selectAll("path")
            .data(arcs)
            .join("path")
            .attr("fill", d => color(d.data.name))
            .attr("d", Arc)
            .attr("name",d=> d.data.name)
            .append("title")
            .text(d => `${d.data.name}:${d.data.value.toLocaleString()}`);
        svg.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 12)
            .attr("text-anchor", "middle")
            .selectAll("text")
            .data(arcs)
            .join("text")
            .attr("name", d=> d.data.name)
            .attr("transform", d => `translate(${arcLabel.centroid(d)})`)
            .call(text => text.filter(d => (d.endAngle - d.startAngle) > 0.20).append("tspan")
                .attr("y", "-0.4em")
                .attr("font-weight", "bold")
                .text(d => d.data.name))
            .call(text => text.filter(d => (d.endAngle - d.startAngle) > 0.20).append("tspan")
                .attr("x", 0)
                .attr("y", "0.7em")
                .attr("fill-opacity", 0.7)
                .text(d => d.data.value.toLocaleString()));
        svg.selectAll("mydots")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", 360)
            .attr("cy", (d, i) => 200 + i * 25)
            .attr("r", 7)
            .style("fill", d => color(d.name))
        svg.selectAll("legendLabels")
            .data(data)
            .enter()
            .append("text")
            .attr("x", 376)
            .attr("y", (d, i) => 200 + i * 25)
            .style("fill", d => color(d.name))
            .text(d => d.name)
            .attr("text-anchor", "left")
            .style("alignment-baseline", "middle")
    }, [data])
    return (
        <svg ref={svgRef} onClick={(e) => console.log(e.target.getAttribute('name'))}></svg>
    )
}