import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner";
import {lazy, Suspense} from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import {MainPage, ComicsPage, SingleComicOrCharPage} from '../pages' // index можно не указывать, он по умолчанию его ищет

const Page404 = lazy(() => import("../pages/404"));

const App = () => {
    
    return (
        <BrowserRouter>
            <div className="app">
                <AppHeader/>
                <main>
                    <Suspense fallback={<Spinner />}>
                        <Routes>
                            <Route path='/' element={<MainPage />}/>
                            <Route path="characters/:id" element={<SingleComicOrCharPage dataType='char'/>}/> 
                            <Route path="/comics" >   
                                <Route index element={<ComicsPage/>}/>                             
                                <Route path=":id" element={<SingleComicOrCharPage dataType='comic'/>}/>
                            </Route>
                            <Route path='*' element={<Page404 />}></Route>
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </BrowserRouter>
    )

}

export default App;

// Примеры работы с memo

// import {useState, memo} from 'react';

// const Form = memo((props) => {

//     console.log('kkk')

//     return (
//         <div>
//             <form className="w-50 border mt-5 p-3 m-auto">
//                 <div className="mb-3">
//                     <label htmlFor="exampleFormControlInput1" className="form-label mt-3">Email address</label>
//                     <input value={props.mail} type="email" className='form-control' id="exampleFormControlInput1" placeholder="name@example.com"/>
//                     </div>
//                     <div className="mb-3">
//                     <label htmlFor="exampleFormControlTextarea1" className="form-label">Example textarea</label>
//                     <textarea value={props.text} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
//                 </div>
//             </form>
//         </div>
//     )
// })

// function App() {
//     const [data, setData] = useState({
//         mail: "name@example.com",
//         text: 'some text'
//     });

//     return (
//         <>
//             <Form mail={data.mail} text={data.text}/>
//             <button 
//                 onClick={() => setData({
//                     mail: "name@example.com",
//                     text: 'some text'
//                 })}>
//                 Click me
//             </button>
//         </>
//     );
// }

// export default App;
