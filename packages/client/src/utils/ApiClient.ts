import axios, {AxiosInstance} from "axios";

export interface CameraModel {
  id: string;
  model: string;
  port: string;
}

export interface SummaryItemModel {
  label: string;
  value: string;
  unit: string;
  type: string;
  choices?: string[];
  readonly: boolean;
}

export interface WidgetCommonModel<T = any> {
  readonly path: string;
  readonly type: string;
  readonly readonly: boolean;
  changed: boolean;
  readonly info: string;
  readonly label: string;
  value: T;
  readonly id: string;
}

export interface WidgetSelectModel<T = any> extends WidgetCommonModel<T> {
  readonly type: "enum";
  readonly choices: string[] | undefined;
}

export interface WidgetRangeModel<T = any> extends WidgetCommonModel<T> {
  readonly type: "range";
  readonly range: {
    min: number;
    max: number;
    step: number;
  };
  min: number;
  max: number;
  step: number;
}

export type WidgetModel = WidgetCommonModel | WidgetSelectModel | WidgetRangeModel;
export type Widget = SummaryItemModel & Partial<WidgetModel>;

export class ApiClient {
  private xhr: AxiosInstance;
  cameras = {
    getList: (): Promise<CameraModel[]> => {
      return this.xhr.get("/cameras").then((response) => response.data);
    },

    getSummary: (id: string): Promise<SummaryItemModel[]> => {
      return this.xhr.get(`/cameras/${id}/summary`).then((response) => response.data);
    },

    getWidgets: (id: string): Promise<WidgetModel[]> => {
      return this.xhr.get(`/cameras/${id}/widgets`).then((response) => response.data);
    },

    getSummaryWidgets: async (id: string): Promise<Widget[]> => {
      const [summary, widgets] = await Promise.all([apiClient.cameras.getSummary(id), apiClient.cameras.getWidgets(id)]);

      const format = (f: string) => f.split("(")[0].trim().toLowerCase();

      return summary.map((item: SummaryItemModel) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {value, type, ...widget} = widgets.find((w) => format(item.label) === format(w.label)) || {};

        return {
          ...item,
          ...widget
        } as Widget;
      });
    },

    updateWidget: async (id: string, widget: Widget) => {
      await this.xhr.put(`/cameras/${id}/widgets/${widget.id}/value`, {
        value: widget.value
      });
    },

    startLiveView: (id: string): Promise<void> => {
      return this.xhr.post(`/cameras/${id}/live-view/start`);
    },

    stopLiveView: (id: string): Promise<void> => {
      return this.xhr.post(`/cameras/${id}/live-view/stop`);
    },

    capture: (id: string, options: {fileName: string; autofocus: boolean; flash: boolean; triggerCapture: boolean}) => {
      return this.xhr.post(`/cameras/${id}/capture`, options).then((response) => response.data);
    }
  };
  medias = {
    list: () => {
      return this.xhr.get(`/medias`).then((response) => response.data);
    }
  };

  constructor() {
    this.xhr = axios.create({
      baseURL: "/rest"
    });
  }
}

export const apiClient = new ApiClient();
