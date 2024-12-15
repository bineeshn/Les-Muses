import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from '../src/store/index.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)