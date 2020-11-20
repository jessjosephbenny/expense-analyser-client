import React, { useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { select, pack, hierarchy, scaleOrdinal, schemeCategory10 } from "d3";

const height = 565;
const width = height;

const Pack = (data) =>
  pack()
    .size([width - 2, height - 2])
    .padding(3)(hierarchy({ children: data }).sum((d) => d.value));

function D3Bubble({ data }) {
  const svgRef = useRef();
  useEffect(() => {
    const root = Pack(data);
    let mData = data.map(d=>d.category)
    mData = mData.filter((a,b)=> mData.indexOf(a)===b)
    const color = scaleOrdinal(
      data.map((d) => d.group),
      schemeCategory10
    );
    const svg = select(svgRef.current)
      .attr("viewbox", [0, 0, width, height])
      .attr("font-size", 10)
      .attr("font-family", "sans-serif")
      .attr("text-anchor", "middle");
    const leaf = svg
      .selectAll("g")
      .data(root.leaves())
      .join("g")
      .attr("transform", (d) => `translate(${d.x + 1},${d.y + 1})`);
    leaf
      .append("circle")
      .attr("r", (d) => d.r)
      .attr("fill-opacity", 0.7)
      .attr("fill", (d) => color(d.data.category));
    leaf.append("clipPath").append("use");
    leaf
      .append("text")
      .attr("clip-path", (d) => d.clipUid)
      .attr("w", (d) => d.r)
      .selectAll("tspan")
      .data((d) => d.data.key.split(/(?=[A-Z][a-z])|\s+/g))
      .join("tspan")
      .attr("x", 0)
      .attr("lengthAdjust", "spacingAndGlyphs")
      .attr("y", (d, i, nodes) => `${i - nodes.length / 2 + 0.8}em`)
      .text((d) => d)
      .attr(
        "textLength",
        (d, i, nodes) =>
          `${Math.min(
            nodes[0].parentElement.getAttribute("w") * 2,
            nodes[0].getComputedTextLength()
          )}px`
      )
      .style("word-break", "break-all");
    svg
      .selectAll("mydots")
      .data(mData)
      .enter()
      .append("circle")
      .attr("cx", 525)
      .attr("cy", (d, i) => 400 + i * 25)
      .attr("r", 7)
      .style("fill", (d) => color(d));
    svg
      .selectAll("legendLabels")
      .data(mData)
      .enter()
      .append("text")
      .attr("x", 560)
      .attr("y", (d, i) => 400 + i * 25)
      .style("fill", (d) => color(d))
      .text((d) => d)
      .attr("text-anchor", "left")
      .style("alignment-baseline", "left");
  }, [data]);
  return (
    <div className="d-flex w-100 justify-content-center">
      <svg ref={svgRef} style={{ height: 565, width: 575 }}></svg>
    </div>
  );
}

const mapStatestoProps = (state) => {
  return {
    data: state.expenseState.topKeywords,
  };
};

export default connect(mapStatestoProps)(D3Bubble);
