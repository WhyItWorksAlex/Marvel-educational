import './charList.scss';
import { useState, useEffect, useRef } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from "../spinner/Spinner"
import ErrorMessage from '../errorMessage/ErrorMessage';
import PropTypes from 'prop-types';


const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

    const marvelService = new MarvelService();

    const onError = () => {
        setLoading(false);
        setError(true);
        setNewItemLoading(false);
    }

    const onCharsLoaded = (charArr) => {
        let ended = false;
        if (charArr.length < 9) {
            ended = true;
        }
        setCharList(prev => [...prev, ...charArr])
        setLoading(false);
        setError(false);
        setNewItemLoading(false);
        setOffset(prev => prev + 9)
        setCharEnded(ended)
    }

    const onCharListLoading = () => {
        setNewItemLoading(true);
    }

    const onRequest = (offset) => {
        onCharListLoading()
        marvelService.getAllCharacters(offset)
            .then(onCharsLoaded)
            .catch(onError)
    }

    const onLoadByScroll = () => {
        if (offset !== 210) {
            if ((window.scrollY + document.documentElement.clientHeight) >= document.documentElement.scrollHeight) {
                onRequest(offset);
            }
        }
    }

    
    function throttle(callee, timeout) {

        let timer = null
    
        return function perform(...args) {
        if (timer) return
    
        timer = setTimeout(() => {
            callee(...args)
    
            clearTimeout(timer)
            timer = null
        }, timeout)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', throttle(onLoadByScroll, 300));
        onRequest();

        return (() => {
            window.removeEventListener('scroll', throttle(onLoadByScroll, 300))
        })
    }, [])

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? <View charList={charList} props={props} /> : null;


    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            <ul className="char__grid">
                {content}
            </ul>
            <button 
                className="button button__main button__long"
                disabled={newItemLoading}
                onClick={() => 
                    onRequest(offset)
                }
                style={{display: charEnded ? 'none' : 'block'}}>
                <div className="inner">load more</div>
            </button>
        </div>
    )

}

const View = ({charList, props}) => {
    return charList.map(({name, thumbnail, id, styleImage}) => {
        const active = props.charId === id;
        const clazz = active ? 'char__item char__item_selected' : 'char__item';
        return (               
            <li 
                tabIndex={0}
                key={id} 
                className={clazz}                    
                onClick={() => {
                    props.onCharSelected(id)
                }}>
                    <img src={thumbnail} alt={name} style={styleImage}/>
                    <div className="char__name">{name}</div>
            </li>

        )
    })
}



CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired,
}

export default CharList;