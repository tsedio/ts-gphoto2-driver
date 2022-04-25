import {useEffect, useState} from "react";
import moment from "moment";
import {LiveView} from "../components/live-view/live-view.component";
import {useParams} from "react-router";
import {apiClient, Widget} from "../utils/ApiClient";
import {toastr} from "../toastr/toastr.container";
import {AxiosError} from "axios";
import {useInterval} from "../utils/useInterval";
import {BatteryLevel} from "../components/battery-level/battery-level.component";
import {Widgets} from "../components/widgets/widgets.component";
import {BxIcon} from "../components/icons/bx-icon.component";
import classnames from "classnames";
import {Countdown} from "../components/countdown/countdown.component";
import {CaptureButton} from "../buttons/capture-button.component";
import {LiveViewButton} from "../buttons/liveview-button.component";
import {FlashButton} from "../buttons/flash-button.component";
import {MediasViewer} from "../components/medias/medias-viewer.component";

function useMedias() {
  const [medias, setMedias] = useState<string[]>([]);

  async function fetchMedias() {
    const medias = await apiClient.medias.list();
    setMedias(medias);
  }

  return {medias, fetchMedias};
}

function useCameraConfig(initial: Record<string, any> = {}) {
  const [flash, setFlash] = useState<boolean>(initial.flash || false);
  const [triggerCapture, setTrigger] = useState<boolean>(initial.triggerCapture || false);
  const [autofocus, setAutofocus] = useState<boolean>(initial.autofocus || true);

  return {
    config: {
      flash,
      triggerCapture,
      autofocus
    },
    setConfig(name: string, value: boolean) {
      switch (name) {
        case "flash":
          setFlash(value);
          break;
        case "autofocus":
          setAutofocus(value);
          break;
        case "triggerCapture":
          setTrigger(value);
          break;
      }
    }
  };
}

function useCameraWidget(id?: string) {
  const [widgets, setWidgets] = useState<Widget[]>([]);

  async function fetchWidgets() {
    if (id) {
      const widgets = await apiClient.cameras.getSummaryWidgets(id);
      setWidgets(widgets);
    }
  }

  useInterval(async () => {
    try {
      await fetchWidgets();
    } catch (er: any) {
      toastr.error("Fail to fetch camera summary information", (er as AxiosError).message);
    }
  }, 30000);

  return {widgets, fetchWidgets};
}

function useCameraView() {
  const {id} = useParams<{id: string}>();
  const [isActiveLiveView, setIsActiveLiveView] = useState<boolean>(false);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [isActiveCountDown, setIsActiveCountDown] = useState<boolean>(false);
  const {widgets, fetchWidgets} = useCameraWidget(id);
  const {config, setConfig} = useCameraConfig();
  const {medias, fetchMedias} = useMedias();
  const batteryLevel = widgets.find(({label}) => label === "Battery Level");

  function takePicture() {
    if (id && !isActiveCountDown) {
      setIsActiveCountDown(true);
      setTimeout(async () => {
        setIsActiveCountDown(false);

        await apiClient.cameras.capture(id, {
          fileName: `capture-${moment().format("YYYY-MM-DD-HH-mm-ss")}.jpg`,
          flash: config.flash,
          triggerCapture: config.triggerCapture,
          autofocus: config.autofocus
        });

        fetchMedias();

        if (isActiveLiveView) {
          setIsStarted(false);
          setTimeout(() => setIsStarted(true), 200);
        }
      }, 3600);
    }
  }

  async function stopLiveView() {
    if (id) {
      setIsActiveCountDown(false);
      setIsActiveLiveView(false);
      await apiClient.cameras.stopLiveView(id);
    }
  }

  function startLiveView() {
    if (id) {
      apiClient.cameras.stopLiveView(id).finally(() => {
        return apiClient.cameras
          .startLiveView(id)
          .then(() => {
            setIsActiveLiveView(true);
            setIsStarted(true);
          })
          .catch((er) => {
            toastr.error("Fail to start camera live view", (er as AxiosError).message);
          });
      });
    }
  }

  function onChangeWidget(widget: Widget) {
    if (id) {
      apiClient.cameras.updateWidget(id, widget).then(() => fetchWidgets());
    }
  }

  useEffect(() => {
    startLiveView();
    fetchMedias();

    return () => {
      stopLiveView();
    };
  }, [id]);

  return {
    id,
    medias,
    fetchMedias,
    config,
    setConfig,
    isActiveLiveView,
    isStarted,
    isActiveCountDown,
    widgets: widgets,
    batteryLevel,
    startLiveView,
    stopLiveView,
    takePicture,
    onChangeWidget
  };
}

export function CameraView() {
  const {
    id,
    isActiveLiveView,
    isStarted,
    config,
    widgets,
    medias,
    batteryLevel,
    isActiveCountDown,
    stopLiveView,
    startLiveView,
    takePicture,
    setConfig,
    onChangeWidget
  } = useCameraView();

  return (
    <div>
      <div className="container-photo-booth flex">
        <section className="col-right flex flex-col h-full justify-start content-start grow pr-1">
          <div className="col-head flex items-center">
            <div className="flex-1" />
            <div className="col-left camera-statuses">{batteryLevel && <BatteryLevel {...batteryLevel} />}</div>
          </div>
          <div
            className={classnames("relative col-body flex flex-1 items-center justify-center overflow-hidden text-blue-600 rounded-t-lg", {
              "bg-gray-700": isStarted
            })}
          >
            {id && isStarted ? (
              <LiveView id={id} isActive={isActiveLiveView} />
            ) : (
              <BxIcon name={"loader-alt"} animate={"spin"} className={"text-5xl"} />
            )}
            <div className={"absolute z-10 flex flex-1 items-center justify-center top-0 left-0 bottom-0 right-0"}>
              {isActiveCountDown && <Countdown />}
            </div>
          </div>
          <div className={"flex items-center justify-center bg-gray-700 rounded-b-lg p-2"}>
            <div className={"flex items-center justify-center -mt-6 z-10 "}>
              <LiveViewButton isActive={isActiveLiveView} onClick={() => (isActiveLiveView ? stopLiveView() : startLiveView())} />
              <CaptureButton onClick={takePicture} />
              <FlashButton isActive={config.flash} onClick={() => setConfig("flash", !config.flash)} />
            </div>
          </div>
        </section>
        <section className="col-left flex flex-col h-full justify-start content-start">
          <div className="col-head" />

          <div className="col-body flex flex-1 overflow-auto p-1 rounded-lg">
            <Widgets items={widgets} onChange={onChangeWidget} />
          </div>
        </section>
      </div>
      {medias.length ? <MediasViewer medias={medias} /> : null}
    </div>
  );
}

export default CameraView;
