import React, { Component } from 'react'
import ItemList from '../../item-list';
import ItemDetails, { Field } from '../../item-details'
import gotService from '../../../services/got-services';
import ErrorMessage from '../../error-message';
import RowBlock from '../../row-block';


export default class HousePage extends Component {

    gotService = new gotService();

    state = {
        selectedHouse: null,
        error: false
    }

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    onItemSelected = (id) => {
        this.setState({
            selectedHouse: id
        })
    }

    render() {

        if (this.state.error) {
            return <ErrorMessage />
        }

        const itemList = (
            <ItemList
                onItemSelected={this.onItemSelected}
                getData={this.gotService.getAllBooks}
                renderItem={({ name }) => name}
            />
        )

        const itemDetails = (
            <ItemDetails charId={this.state.selectedHouse} >
                <Field field='name' label='Name' />
                <Field field='authors' label='Authors' />
                <Field field='publisher' label='Publisher' />
                <Field field='released' label='Released' />
            </ItemDetails>
        )

        return (
            <RowBlock left={itemList} right={itemDetails} />
        )
    }
}
