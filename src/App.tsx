import React from 'react'
import UIContainer from './components/ui/UIContainer'
import { Outlet } from 'react-router-dom'
function App() {
    return (
        <div>
            <UIContainer>
                <Outlet />
            </UIContainer>
        </div>
    )
}

export default App
