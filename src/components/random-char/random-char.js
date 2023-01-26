import React, { Component } from 'react';
import gotService from '../../services/got-services';
import './random-char.css';
import Spinner from '../spinner';
import ErrorMessage from '../error-message';
import PropTypes from 'prop-types'

export default class RandomChar extends Component {

    gotService = new gotService()

    state = {
        char: {},
        loading: true,
        error: false

    }

    componentDidMount() {
        this.updateCharacter()
        this.timerID = setInterval(this.updateCharacter, this.props.interval)
    }

    componentWillUnmount() {
        clearInterval(this.timerID)
    }

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false
        })
    }

    updateCharacter = () => {
        const id = Math.floor(Math.random() * 120 + 25); // 0 - 120
        this.gotService.getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    onError = (err) => {
        this.setState({
            error: true,
            loading: false
        })
    }

    render() {
        console.log('render')
        const { char, loading, error } = this.state;

        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error) ? <View char={char} /> : null


        return (
            <div className="random-block rounded">
                {errorMessage}
                {spinner}
                {content}
            </div>
        );
    }
}

RandomChar.defaultProps = {
    interval: 5000
}

RandomChar.propTypes = {
    interval: PropTypes.number
}

const View = ({ char }) => {
    const { url, name, gender, born, died, culture } = char
    return (
        <>
            <h4>Random Character: {name}</h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Gender </span>
                    <span>{gender}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Born </span>
                    <span>{born}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Died </span>
                    <span>{died}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Culture </span>
                    <span>{culture}</span>
                </li>
            </ul>
        </>
    )
}

