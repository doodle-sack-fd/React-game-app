import { Component } from "react";
import gotService from "../../../services/got-services";
import ItemDetails, { Field } from "../../item-details";

export default class BooksItem extends Component {
    gotService = new gotService();

    state = {
        selectedBook: null
    }

    render() {
        return (
            <ItemDetails
                itemId={this.state.selectedBook}
                getData={this.gotService.getBook} >
                <Field field='numberOfPages' label='Number of pages' />
                <Field field='publisher' label='Publisher' />
                <Field field='released' label='Released' />
            </ItemDetails>
        )
    }
}