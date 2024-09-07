import AppHeader from "../appHeader/AppHeader";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import {MainPage, ComicsPage, Page404, SingleComicPage} from '../pages' // index можно не указывать, он по умолчанию его ищет

const App = () => {
    
    return (
        <BrowserRouter>
            <div className="app">
                <AppHeader/>
                <main>
                    <Routes>
                        <Route path='/' element={<MainPage />}></Route>
                        <Route path="/comics" >   
                            <Route index element={<ComicsPage/>}/>                             
                            <Route path=":comicId" element={<SingleComicPage/>}/>
                        </Route>
                        <Route path='*' element={<Page404 />}></Route>
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    )

}

export default App;