import { useState } from "react";
import { Helmet } from "react-helmet";
import RandomChar from "../../randomChar/RandomChar";
import CharList from "../../charList/CharList";
import CharInfo from "../../charInfo/CharInfo";
import ErrorBoundary from "../../ErrorBoundary/ErrorBoundary";
import decoration from '../../../resources/img/vision.png';
import CharSearchForm from '../../charSearchForm/CharSearchForm'


const MainPage = () => {
    
    const [selectedChar, setSelectedChar] = useState(null);

    const onCharSelected = (id) => {
        setSelectedChar(id)
    }

    return (
      <>
        <Helmet>
            <meta
                name="description"
                content="Marvel information portal"
            />
            <title>Marvel main page</title>
        </Helmet>
        <ErrorBoundary>
            <RandomChar/>  
        </ErrorBoundary>             
        <div className="char__content">
            <ErrorBoundary>
                <CharList onCharSelected={onCharSelected} charId={selectedChar}/>
            </ErrorBoundary>
            <div style={{'position': 'sticky', 'top': '10px'}}>
                <ErrorBoundary>
                    <CharInfo charId={selectedChar}/>
                </ErrorBoundary>
                <ErrorBoundary>
                    <CharSearchForm/>
                </ErrorBoundary>
            </div>
        </div>
        <img className="bg-decoration" src={decoration} alt="vision"/>
      </>

    )

}

export default MainPage;