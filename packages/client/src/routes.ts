import React from "react";

export const routes: {path: string; exact: boolean; component: any}[] = [
  {
    path: "/cameras/:id",
    exact: true,
    component: React.lazy(() => import("./cameras/camera.view"))
  },
  {
    path: "/",
    exact: true,
    component: React.lazy(() => import("./cameras/cameras.view"))
  }
];
