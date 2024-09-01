import './charList.scss';
import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from "../spinner/Spinner"
import ErrorMessage from '../errorMessage/ErrorMessage';
import PropTypes from 'prop-types';


class CharList extends Component {

    state = {
        charList: [],
        loading: true,
        error: false, 
        newItemLoading: false,
        offset: 210,
        charEnded: false,
    }

    marvelService = new MarvelService();

    onError = () => {
        this.setState({
            loading: false,
            error: true,
            newItemLoading: false,
        })
    }

    onCharsLoaded = (charArr) => {
        let ended = false;
        if (charArr.length < 9) {
            ended = true;
        }

        this.setState(state => ({
            charList: [...state.charList, ...charArr], 
            loading: false,
            error: false,
            newItemLoading: false,
            offset: state.offset + 9,
            charEnded: ended,
        }))
    }

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true,
        })
    }

    onRequest = (offset) => {
        this.onCharListLoading()
        this.marvelService.getAllCharacters(offset)
            .then(this.onCharsLoaded)
            .catch(this.onError)
    }

    updateChars = () => {
        this.onRequest()
    }

    onLoadByScroll = () => {
        if (this.state.offset !== 210) {
            if ((window.scrollY + document.documentElement.clientHeight) >= document.documentElement.scrollHeight) {
                this.onRequest(this.state.offset);
            }
        }
    }

    
    throttle(callee, timeout) {

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

    componentDidMount() {
        window.addEventListener('scroll', this.throttle(this.onLoadByScroll, 300))
        this.updateChars()
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.throttle(this.onLoadByScroll, 300))
    }

    itemRefs = [];

    setRef = (ref) => {
        this.itemRefs.push(ref);
    };

    focusOnItem = (index) => {
        this.itemRefs.forEach(item => item.classList.remove('char__item_selected'));
        this.itemRefs[index].classList.add('char__item_selected');
        this.itemRefs[index].focus();
    }




    render() {
        const {charList, loading, error, newItemLoading, offset, charEnded} = this.state

        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error) ? <View charList={charList} props={this.props} /> : null;


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
                        this.onRequest(offset)
                    }
                    style={{display: charEnded ? 'none' : 'block'}}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }

}

const View = ({charList, props}) => {
    console.log(props)
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