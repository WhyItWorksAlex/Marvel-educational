import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';

import './singleComicPage.scss';

import useMarvelService from '../../../services/MarvelService';
import Spinner from '../../spinner/Spinner';
import ErrorMessage from '../../errorMessage/ErrorMessage';

const SingleComicOrCharPage = ({dataType}) => {
    const {id} = useParams();
    const [elem, setElem] = useState([]);

    const {loading, error, getComic, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        update()
    }, [id])

    const onLoaded = (value) => {
        setElem(value);
    }

    const update = () => {
        clearError();

        switch (dataType) {
            case 'comic': 
                getComic(id)
                .then(onLoaded)
                break;
            case 'char': 
                getCharacter(id)
                .then(onLoaded)
                break;
            default:
                console.log(`Sorry`);
        }
    }


    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !elem) ? <View elem={elem} dataType={dataType} /> : null;

    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}


const View = ({elem, dataType}) => {
    let result;
    if (dataType === 'comic') {
        const {title, description, pageCount, thumbnail, styleImage, language, price} = elem;
        result = (
                    <div className="single-comic">
                        <Helmet>
                            <meta
                                name="description"
                                content="Single comic page"
                            />
                            <title>Comic {title}</title>
                        </Helmet>
                        <img src={thumbnail} alt={title} className="single-comic__img" style={styleImage}/>
                        <div className="single-comic__info">
                            <h2 className="single-comic__name">{title}</h2>
                            <p className="single-comic__descr">{description}</p>
                            <p className="single-comic__descr">{pageCount}</p>
                            <p className="single-comic__descr">Language: {language}</p>
                            <div className="single-comic__price">{price}</div>
                        </div>
                        <Link to='/comics' className="single-comic__back">Back to all</Link>
                    </div>
        )
    } else {
        const {name, description, thumbnail, styleImage} = elem; 
        result = (
                    <div className="single-comic">
                        <Helmet>
                            <meta
                                name="description"
                                content="Single char page"
                            />
                            <title>{`Character ${name}`}</title>
                        </Helmet>
                        <img src={thumbnail} alt={name} className="single-comic__char-img" style={styleImage}/>
                        <div className="single-comic__info">
                            <h2 className="single-comic__name">{name}</h2>
                            <p className="single-comic__descr">{description}</p>
                        </div>
                    </div>
        )
    }

    return (
        <>{result}</>
    )
}

export default SingleComicOrCharPage;