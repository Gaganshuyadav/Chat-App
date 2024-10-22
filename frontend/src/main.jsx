import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

import { CssBaseline} from "@mui/material";
import { HelmetProvider} from "react-helmet-async";
import { BrowserRouter} from "react-router-dom";
import { Provider} from "react-redux";
import store from "./redux/store.jsx";
import { Toaster} from "react-hot-toast";

createRoot(document.getElementById('root')).render(
  <>
  <BrowserRouter>
    <Provider store={store}>
        <HelmetProvider>
          <CssBaseline/>
          <App />
        </HelmetProvider>
    </Provider>
    <Toaster position="bottom-center" toastOptions={{
      success: { duration: 5000},
      error: { duration: 5000},
    }} />
  </BrowserRouter>
  </>,
)
