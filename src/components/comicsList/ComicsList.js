import './comicsList.scss';

import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from "../spinner/Spinner"
import ErrorMessage from '../errorMessage/ErrorMessage';
import { Link } from 'react-router-dom';

const ComicsList = (props) => {
    const storageOffset = Number(sessionStorage.getItem('storageOffset'));
    const storageComicsList = JSON.parse(sessionStorage.getItem('storageComicsList'));

    const [comicsList, setComicsList] = useState(!storageComicsList ? [] : storageComicsList);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [charEnded, setCharEnded] = useState(false);
    const [offset, setOffset] = useState(!storageOffset ? 0 : storageOffset);

    const {loading, error, getAllComics} = useMarvelService();

    const onCharsLoaded = (comicsArr) => {
        let ended = false;
        if (comicsArr.length < 8) {
            ended = true;
        }
        setComicsList(prev => {
            sessionStorage.setItem('storageComicsList', JSON.stringify([...prev, ...comicsArr]));
            return [...prev, ...comicsArr]
        });
        setOffset(prev => {
            sessionStorage.setItem('storageOffset', prev + 8);
            return prev + 8
        })
        setNewItemLoading(false);
        setCharEnded(ended)
    }


    const onRequest = (offset, initial) => {
        if (initial && comicsList.length > 0) {
            setNewItemLoading(true)
            console.log('улосвие 1')
        } else if (initial && comicsList.length === 0) {
            setNewItemLoading(false)
            console.log('улосвие 2')
        } else {
            setNewItemLoading(true) 
            console.log('улосвие 3')
        }
        getAllComics(offset)
            .then(onCharsLoaded)      
    }

    useEffect(() => {
        if(comicsList.length === 0) {
            onRequest(offset, true);
        }
        // eslint-disable-next-line
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
    return comicsList.map((comics) => (
        <li className="comics__item" key={comics.id}>
            <Link to={`/comics/${comics.id}`}>
                <img src={comics.thumbnail} alt={comics.title} style={comics.styleImage} className="comics__item-img"/>
                <div className="comics__item-name">{comics.title}</div>
                <div className="comics__item-price">{comics.price}</div>
            </Link>
        </li>
    ))
}

export default ComicsList;