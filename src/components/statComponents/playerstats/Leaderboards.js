import React, { useEffect, useState } from "react";
import { useNHLService } from "../../NHLContext";

import Type from "../navigation/Type";
import SortBy from "../navigation/SortBy";
import Season from "../navigation/Season";
import PointLeaders from "./PointLeaders";

const Leaderboards = () => {
  const NHLService = useNHLService();

  const [data, setData] = useState();
  const [dataLength, setDataLength] = useState(10);
  const [sortBy, setSortBy] = useState("points");
  const [season, setSeason] = useState("20192020");
  const [type, setType] = useState("2");

  useEffect(() => {
    if (!sortBy || !season || !type || !NHLService) {
      return;
    }

    NHLService.getLeaderboards(type, sortBy, season).then((result) => {
      const slicedData = result.data.data.slice(0, dataLength);
      slicedData.reverse();

      setData(slicedData);
    });
  }, [NHLService, sortBy, season, type, dataLength]);

  return (
    <>
      <div className="Dropdowns">
        <SortBy setSortBy={setSortBy} />
        <Season setSeason={setSeason} />
        <Type setType={setType} />
      </div>
      <PointLeaders
        data={data}
        sortBy={sortBy}
        setDataLength={setDataLength}
        dataLength={dataLength}
      />
    </>
  );
};

export default Leaderboards;
