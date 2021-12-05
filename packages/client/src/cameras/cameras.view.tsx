import {AxiosError} from "axios";
import {apiClient, CameraModel} from "../utils/ApiClient";
import {useState} from "react";
import {toastr} from "../toastr/toastr.container";
import {CameraList} from "../components/cameras/camera-list.component";
import {useInterval} from "../utils/useInterval";

function useCameraList() {
  const [cameras, setCameras] = useState<CameraModel[]>([]);

  async function fetch() {
    try {
      const cameras = await apiClient.cameras.getList();

      setCameras(cameras);
    } catch (er: any) {
      toastr.error("Fail to fetch camera list", (er as AxiosError).message);
    }
  }

  useInterval(fetch);

  return {cameras};
}

export function CamerasView() {
  const {cameras} = useCameraList();
  return (
    <div>
      {cameras.length ? (
        <>
          <p className={"mb-4"}>Select a camera:</p>
          <CameraList items={cameras} />
        </>
      ) : (
        <p>No camera available. Please connect a camera.</p>
      )}
    </div>
  );
}

export default CamerasView;
