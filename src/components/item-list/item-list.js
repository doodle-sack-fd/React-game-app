import React, { Component } from 'react';
import gotService from '../../services/got-services'; import Spinner from '../spinner';
import './item-list.css';
export default class ItemList extends Component {

    gotService = new gotService()
    state = {
        charList: null
    }

    componentDidMount() {
        this.gotService.getAllCharacters()
            .then((charList) => {
                this.setState({
                    charList: charList
                })
            })
    }
    renderItems(arr) {

        const generateUniqueKey = (pre) => {
            return `${pre}_${new Date().getTime()}`
        }

        return arr.map((item, id) => {

            return (
                <li
                    key={generateUniqueKey(id)}
                    className="list-group-item"
                    onClick={() => this.props.onCharSelected(41 + id)}>
                    {item.name}
                </li>
            )
        })
    }

    render() {

        const { charList } = this.state


        if (!charList) {
            return <Spinner />
        }

        const items = this.renderItems(charList)

        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        );
    }
}