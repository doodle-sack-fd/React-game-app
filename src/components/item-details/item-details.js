import React, { Component } from 'react';
import gotService from '../../services/got-services';
import './item-details.css';

const Field = ({ itemDetails, field, label }) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{label}</span>
            <span>{itemDetails[field]}</span>
        </li>
        )
}

export {
    Field
}

export default class ItemDetails extends Component {

    gotService = new gotService();

    state = {
        itemDetails: null
    }

    componentDidMount() {
        this.updateChar()
    }

    componentDidUpdate(prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateChar()
        }
    }

    updateChar() {
        const { charId } = this.props
        if (!charId) {
            return;
        }

        this.gotService.getCharacter(charId)
            .then((itemDetails) => {
                this.setState({ itemDetails: itemDetails })
            })
    }


    render() {

        if (!this.state.itemDetails) {
            return <span className='select-error'>Please select a character</span>
        }
        const { itemDetails } = this.state
        const { name } = itemDetails

        return (
            <div className="char-details rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    {
                        React.Children.map(this.props.children, (child) => {
                            return React.cloneElement(child, { itemDetails })
                        })
                    }
                </ul>
            </div>
        );
    }
}