import {MouseEventHandler} from "react";
import {BxIcon} from "../components/icons/bx-icon.component";

export function LiveViewButton({isActive, onClick}: {isActive: boolean; onClick: MouseEventHandler}) {
  return (
    <button
      name={"live-view"}
      onClick={onClick}
      style={{
        width: "30px",
        height: "30px"
      }}
      className={
        "reset-button -mb-5 mx-1 block border-2 border-gray-700 bg-white hover:bg-blue-600 hover:text-white hover:fill-white transition-all  rounded-full flex justify-center items-center p-2"
      }
    >
      <BxIcon name={!isActive ? "play" : "stop"} />
    </button>
  );
}
