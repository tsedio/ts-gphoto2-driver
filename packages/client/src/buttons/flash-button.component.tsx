import {MouseEventHandler} from "react";
import {ReactComponent as FlashOn} from "../svg/flash_on.svg";
import {ReactComponent as FlashOff} from "../svg/flash_off.svg";

export function FlashButton({isActive, onClick}: {isActive: boolean; onClick: MouseEventHandler}) {
  return (
    <button
      name={"live-view"}
      onClick={onClick}
      style={{
        width: "30px",
        height: "30px"
      }}
      className={
        "reset-button -mb-5 mx-1 block border-2 border-gray-700 bg-white hover:bg-blue-600 hover:text-white hover:fill-white transition-all rounded-full flex justify-center items-center p-2"
      }
    >
      {isActive ? <FlashOn /> : <FlashOff />}
    </button>
  );
}
