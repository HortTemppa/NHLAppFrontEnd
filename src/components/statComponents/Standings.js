import React, { useEffect, useState } from "react";
import { useNHLService } from "../NHLContext";

import { useWindowSize } from "../../hooks/useWindowSize";

import Metro from "./divisions/Metro";
import Atlantic from "./divisions/Atlantic";
import Central from "./divisions/Central";
import Pacific from "./divisions/Pacific";
import Eastern from "./conferences/Eastern";
import Western from "./conferences/Western";
import League from "./league/League";

import SelectStandings from "./navigation/SelectStandings";

const Standings = () => {
  const windowSize = useWindowSize();

  const nhlService = useNHLService();

  const [data, setData] = useState();
  const [tableType, setTableType] = useState(1);

  useEffect(() => {
    nhlService.getStandings().then((result) => {
      setData(result.data);
    });
  }, [windowSize, nhlService]);

  const chartChangeHandler = (event) => {
    setTableType(parseInt(event.target.value));
  };

  switch (tableType) {
    case 1:
      return (
        <>
          <SelectStandings chartChange={chartChangeHandler} />
          <Metro rawData={data} chartTypeId={tableType} />
        </>
      );
    case 2:
      return (
        <>
          <SelectStandings chartChange={chartChangeHandler} />
          <Atlantic rawData={data} chartTypeId={tableType} />
        </>
      );
    case 3:
      return (
        <>
          <SelectStandings chartChange={chartChangeHandler} />
          <Central rawData={data} chartTypeId={tableType} />
        </>
      );
    case 4:
      return (
        <>
          <SelectStandings chartChange={chartChangeHandler} />
          <Pacific rawData={data} chartTypeId={tableType} />
        </>
      );
    case 5:
      return (
        <>
          <SelectStandings chartChange={chartChangeHandler} />
          <Eastern rawData={data} chartTypeId={tableType} />
        </>
      );
    case 6:
      return (
        <>
          <SelectStandings chartChange={chartChangeHandler} />
          <Western rawData={data} chartTypeId={tableType} />
        </>
      );
    case 7:
      return (
        <>
          <SelectStandings chartChange={chartChangeHandler} />
          <League rawData={data} chartTypeId={tableType} />
        </>
      );
    default:
      return null;
  }
};

export default Standings;
