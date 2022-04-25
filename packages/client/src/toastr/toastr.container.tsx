import {PropsWithChildren} from "react";
import {toast, ToastContainer as TC, ToastContent, ToastOptions} from "react-toastify";
import "./toastr.css";

function ToastrBody({title, children, color = "gray"}: PropsWithChildren<any>) {
  return (
    <div className={"flex"}>
      {/*<div className={"pr-3"}></div>*/}
      <div className={"text-sm"}>
        <div className={`text-${color} font-bold pb-1`}>{title}</div>
        <div>{children}</div>
      </div>
    </div>
  );
}

export function ToastContainer() {
  return (
    <TC
      autoClose={5000}
      containerId="toastr"
      draggablePercent={60}
      position={"top-right"}
      closeButton={() => <span className={"hover:text-blue-active text-md pr-2"}>x</span>}
    />
  );
}

export interface ToastrOptions extends ToastOptions {
  icon?: string;
}

export const toastr = {
  success(title: string, children: ToastContent, options: ToastrOptions = {}) {
    toast(
      <ToastrBody title={title} color={"green-600"} icon={options.icon} iconClass={"text-emerald"}>
        {children}
      </ToastrBody>,
      {...options, className: "success"}
    );
  },
  info(title: string, children: ToastContent, options: ToastrOptions = {}) {
    toast(
      <ToastrBody title={title} color={"blue-600"} icon={options.icon} iconClass={"text-blue"}>
        {children}
      </ToastrBody>,
      {...options, className: "info"}
    );
  },
  warning(title: string, children: ToastContent, options: ToastrOptions = {}) {
    toast(
      <ToastrBody title={title} color={"orange-600"} icon={options.icon} iconClass={"text-orange"}>
        {children}
      </ToastrBody>,
      {...options, className: "warning"}
    );
  },
  error(title: string, children: ToastContent, options: ToastrOptions = {}) {
    toast(
      <ToastrBody title={title} color={"red-600"} icon={options.icon} iconClass={"text-red"}>
        {children}
      </ToastrBody>,
      {...options, className: "danger"}
    );
  }
};
