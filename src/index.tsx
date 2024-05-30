import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { store } from '@/app_redux/stores/root_store'
import { Provider } from 'react-redux'
import Router from '@/app/routes/router'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <Router />
        </Provider>
    </React.StrictMode>
)
