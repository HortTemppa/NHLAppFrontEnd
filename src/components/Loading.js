import { Rotate90DegreesCcw } from "@material-ui/icons";
import React from "react";
import { useSpring, animated } from "react-spring";

import DonutLarge from "@material-ui/icons/DonutLarge";

const Loading = ({}) => {
  const props = useSpring({
    transform: "rotate(360deg)",
    from: { transform: "rotate(0deg)" },
    marginTop: "15px",
  });

  return (
    <animated.div style={props} className="Loading">
      <DonutLarge fontSize="large" />
    </animated.div>
  );
};

export default Loading;
