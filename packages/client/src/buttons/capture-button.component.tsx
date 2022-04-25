import {MouseEventHandler} from "react";

export function CaptureButton({onClick}: {onClick: MouseEventHandler}) {
  return (
    <button
      name={"capture-picture"}
      onClick={onClick}
      style={{
        width: "60px",
        height: "60px"
      }}
      className={
        "reset-button mx-1 block border-2 border-gray-700 bg-white hover:bg-blue-600 hover:text-white hover:fill-white transition-all  rounded-full flex justify-center items-center p-2"
      }
    >
      <svg
        style={{width: "40px", height: "40px"}}
        id="Layer_1"
        version="1.1"
        viewBox="0 0 24 24"
        xmlSpace="preserve"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <path d="M19.599,6h-2.323l-0.714-2.015C16.34,3.319,15.719,3,15.017,3H8.983C8.281,3,7.66,3.319,7.438,3.985L6.724,6H4.401  C2.905,6,2,7.247,2,8.743v9.77C2,20.009,2.905,21,4.401,21h15.197C21.095,21,22,20.009,22,18.513v-9.77C22,7.247,21.095,6,19.599,6z   M21,18.513C21,19.411,20.497,20,19.599,20H4.401C3.503,20,3,19.411,3,18.513v-9.77C3,7.846,3.503,7,4.401,7h2.714  C7.349,7,7.556,6.908,7.63,6.687l0.838-2.415C8.542,4.05,8.749,4,8.983,4h6.034c0.234,0,0.441,0.078,0.515,0.301l0.838,2.421  C16.444,6.943,16.651,7,16.885,7h2.714C20.497,7,21,7.846,21,8.743V18.513z" />
        <path d="M12,7.658c-2.993,0-5.428,2.435-5.428,5.428S9.007,18.513,12,18.513s5.428-2.435,5.428-5.428S14.993,7.658,12,7.658z   M12,17.428c-2.394,0-4.342-1.948-4.342-4.342S9.606,8.743,12,8.743s4.342,1.948,4.342,4.342S14.394,17.428,12,17.428z" />
      </svg>
    </button>
  );
}
