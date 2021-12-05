import React, {Suspense} from "react";
import {Route, Routes} from "react-router-dom";
import {routes} from "./routes";
import {Logo} from "./components/logo/logo.component";
import {ToastContainer} from "./toastr/toastr.container";

function App() {
  return (
    <div className="flex fixed top-0 left-0 w-full h-full z-10 justify-center items-center">
      <div>
        <Logo className={"mb-10"} />
        <main>
          <Routes>
            {routes.map(({component: View, ...route}) => (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <Suspense fallback={"Loading..."}>
                    <View {...route} basePath={route.path} />
                  </Suspense>
                }
              />
            ))}
          </Routes>
          <ToastContainer />
        </main>
      </div>
    </div>
  );
}

export default App;
