import React, { useRef, useEffect, useState } from "react";
import { useNHLService } from "../NHLContext";
import { select, axisBottom, axisLeft, scaleLinear, scaleBand } from "d3";

import { useWindowSize } from "../../hooks/useWindowSize";
import Metro from "./divisions/Metro";

const Standings = () => {
  const svgRef = useRef();

  const windowSize = useWindowSize();

  const nhlService = useNHLService();

  const [data, setData] = useState();

  useEffect(() => {
    nhlService.getStandings().then((result) => {
      setData(result.data);
    });
  }, [windowSize]);

  return (
    <>
      <Metro rawData={data} />
    </>
  );
};

export default Standings;
