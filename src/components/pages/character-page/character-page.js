import React, { Component } from 'react'
import ItemList from '../../item-list';
import ItemDetails, { Field } from '../../item-details';
import gotService from '../../../services/got-services';
import ErrorMessage from '../../error-message';
import RowBlock from '../../row-block';


export default class CharacterPage extends Component {

    gotService = new gotService();

    state = {
        selectedChar: null,
        error: false
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    onItemSelected = (id) => {
        this.setState({
            selectedChar: id
        })
    }

    render() {

        if (this.state.error) {
            return <ErrorMessage />
        }

        const itemList = (
            <ItemList
                onItemSelected={this.onItemSelected}
                getData={this.gotService.getAllCharacters}
                renderItem={({ name, gender }) => `${name} (${gender})`}
            />
        )

        const charDetails = (
            <ItemDetails charId={this.state.selectedChar} >
                <Field field='gender' label='Gender' />
                <Field field='born' label='Born' />
                <Field field='died' label='Died' />
                <Field field='culture' label='Culture' />
            </ItemDetails>
        )

        return (
            <RowBlock left={itemList} right={charDetails} />
        )
    }
}
