import React, { useEffect, useState } from "react";
import { useNHLService } from "../../NHLContext";

import Type from "../navigation/Type";
import SortBy from "../navigation/SortBy";
import Season from "../navigation/Season";
import PointLeaders from "./PointLeaders";

const Leaderboards = ({}) => {
  const NHLService = useNHLService();

  const [data, setData] = useState();
  const [sortBy, setSortBy] = useState("points");
  const [season, setSeason] = useState("20192020");
  const [type, setType] = useState("2");

  useEffect(() => {
    if (!sortBy || !season || !type || !NHLService) {
      return;
    }

    NHLService.getLeaderboards(type, sortBy, season).then((result) => {
      result.data.data.reverse();
      setData(result.data.data);
    });
  }, [NHLService, sortBy, season, type]);

  console.log(data);

  return (
    <>
      <SortBy setSortBy={setSortBy} />
      <Season setSeason={setSeason} />
      <Type setType={setType} />
      <PointLeaders data={data} sortBy={sortBy} />
    </>
  );
};

export default Leaderboards;
