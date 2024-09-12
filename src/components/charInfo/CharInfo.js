import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './charInfo.scss';
import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';

const CharInfo = (props) => {

    const [char, setChar] = useState(null);

    const {getCharacter, process, setProcess} = useMarvelService();

    useEffect(() => {
        updateChar()
    }, [props.charId])

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const updateChar = () => {
        const {charId} = props;
        if (!charId) {
            return;
        };
        getCharacter(charId)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'))
    }

    return (
        <div className="char__info">
            {setContent(process, View, char)}
        </div>
    )
}

const View = ({data}) => {
    const {name, description, thumbnail, homepage, wiki, comics, styleImage} = data
    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={styleImage}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">{description}</div>
            <div className="char__comics">Comics:</div>
            {comics.length === 0 ? 
            (
                <p>There is no comics for this character</p>
            ) : (
                <ul className="char__comics-list">
                    {comics.map((item, i) => {
                        if (i < 10) {
                            return (
                                <li className="char__comics-item" key={i}>
                                    {item.name}
                                </li>
                            )
                        }
                        return null
                    })}
                </ul>
            )}            
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;