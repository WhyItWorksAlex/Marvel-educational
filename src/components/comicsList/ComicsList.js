import './comicsList.scss';

import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from "../spinner/Spinner"
import ErrorMessage from '../errorMessage/ErrorMessage';

const ComicsList = (props) => {

    const [comicsList, setComicsList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [charEnded, setCharEnded] = useState(false);
    const [offset, setOffset] = useState(0);

    const {loading, error, getAllComics} = useMarvelService();

    const onCharsLoaded = (comicsArr) => {
        let ended = false;
        if (comicsArr.length < 8) {
            ended = true;
        }
        setComicsList(prev => [...prev, ...comicsArr])
        setOffset(prev => prev + 8)
        setNewItemLoading(false);
        setCharEnded(ended)
    }

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true)
        getAllComics(offset)
            .then(onCharsLoaded)
    }

    useEffect(() => {
        onRequest(offset, true);
    }, [])

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading && !newItemLoading ? <Spinner /> : null;
    const content = !(loading && newItemLoading && error) ? <View comicsList={comicsList} /> : null;

    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            <ul className="comics__grid">
                {content}
            </ul>
            {loading && !newItemLoading ? null :             
                <button 
                    className="button button__main button__long"
                    style={{display: charEnded ? 'none' : 'block'}}
                    disabled={newItemLoading}
                    onClick={() => 
                        onRequest(offset, false)
                    }
                    >
                    <div className="inner">load more</div>
                </button>
            }
        </div>
    )
}

const View = ({comicsList}) => {
    return comicsList.map((comics, index) => (
        <li className="comics__item" key={index}>
            <a href="#">
                <img src={comics.thumbnail} alt={comics.title} style={comics.styleImage} className="comics__item-img"/>
                <div className="comics__item-name">{comics.title}</div>
                <div className="comics__item-price">{comics.price}</div>
            </a>
        </li>
    ))
}

export default ComicsList;