import AppHeader from "../appHeader/AppHeader";

import { BrowserRouter, Routes, Route, Switch } from "react-router-dom";

import MainPage from '../pages/main-page/main-page'
import ComicsPage from "../pages/comics-page/comics-page";

const App = () => {
    
    return (
        <BrowserRouter>
            <div className="app">
                <AppHeader/>
                <main>
                    <Routes>
                        <Route exact path='/' element={<MainPage />}></Route>
                        <Route exact path='/comics' element={<ComicsPage />}></Route>
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    )

}

export default App;