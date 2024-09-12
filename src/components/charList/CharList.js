import './charList.scss';
import { useState, useEffect, useRef } from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from "../spinner/Spinner"
import ErrorMessage from '../errorMessage/ErrorMessage';
import PropTypes from 'prop-types';

const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

    const {loading, error, getAllCharacters} = useMarvelService();

    const offsetRef = useRef(offset);

    const onCharsLoaded = (charArr) => {
        let ended = false;
        if (charArr.length < 9) {
            ended = true;
        }
        setCharList(prev => [...prev, ...charArr])
        setNewItemLoading(false);
        setOffset(prev => {
            offsetRef.current = prev + 9;
            return prev + 9
        })
        setCharEnded(ended)
    }

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true)
        getAllCharacters(offset)
            .then(onCharsLoaded)
    }

    const onLoadByScroll = () => {
        if (offsetRef.current !== 210) {
            if ((window.scrollY + document.documentElement.clientHeight) >= document.documentElement.scrollHeight) {
                onRequest(offsetRef.current, false);
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
        onRequest(offset, true);

        return (() => {
            window.removeEventListener('scroll', throttle(onLoadByScroll, 300))
        })
        // eslint-disable-next-line
    }, [])

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading && !newItemLoading ? <Spinner /> : null;


    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            <View charList={charList} props={props} />
            {loading && !newItemLoading ? null : 
                <button 
                    className="button button__main button__long"
                    disabled={newItemLoading}
                    onClick={() => 
                        onRequest(offset, false)
                    }
                    style={{display: charEnded ? 'none' : 'block'}}>
                    <div className="inner">load more</div>
                </button>
            }
        </div>
    )

}

const View = ({charList, props}) => {
    return (
        <ul className="char__grid">
            {charList.map(({name, thumbnail, id, styleImage}) => {
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
            })}
        </ul>
    )
}



CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired,
}

export default CharList;