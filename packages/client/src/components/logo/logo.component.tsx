import React from "react";
import classnames from "classnames";

export function Logo({className, style}: any) {
  return (
    <div className={classnames("fixed top-2 left-5 flex items-center justify-center", className)} style={style}>
      <img src="https://tsed.io/tsed-og.png" alt="Ts.ED" className={"rounded-full mr-3"} style={{maxWidth: "50px"}} /> PhotoBooth
    </div>
  );
}
