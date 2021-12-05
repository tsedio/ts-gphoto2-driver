import {Link} from "react-router-dom";
import {CameraModel} from "../../utils/ApiClient";

export function CameraList({items}: {items: CameraModel[]}) {
  return (
    <ul className="reset-list m-0 p-0 mb-5 center" style={{width: "20vw", minWidth: "200px"}}>
      {items.map((camera) => (
        <li key={camera.id} className={"mb-1 w-full"}>
          <Link
            to={`/cameras/${camera.id}`}
            className={
              "transition ease-in-out delay-300 block py-1 px-2 border-2 border-gray-800 hover:border-blue-500 hover:text-blue-500 rounded-lg w-full text-center"
            }
          >
            <span>{camera.model}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
