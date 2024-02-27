import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react.js";
import { persistStor, store } from "./Store/store.js";

const theme = createTheme({
   typography: {
      fontFamily: "Roboto Slab,serif",
      allVariants: { color: "white" },
   },
});
ReactDOM.createRoot(document.getElementById("root")).render(
   <>
      <Provider store={store}>
         <PersistGate loading={null} persistor={persistStor}>
            <BrowserRouter>
               <ThemeProvider theme={theme}>
                  <Toaster position="top-right" />
                  <App />
               </ThemeProvider>
            </BrowserRouter>
         </PersistGate>
      </Provider>
   </>
);
