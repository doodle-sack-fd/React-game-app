import React, { Component } from 'react';
import { Col, Row, Container } from 'reactstrap';
import Header from '../header';
import RandomChar from '../random-char';
import ErrorMessage from '../error-message';
import CharacterPage from '../pages/character-page';
import BookPage from '../pages/book-page';
import HousePage from '../pages/house-page';
import BooksItem from '../pages/books-item';
import gotService from '../../services/got-services';
import { BrowserRouter, Route, Routes} from "react-router-dom"



export default class App extends Component {
    gotService = new gotService();
    
    state = {
        showChar: true,
        error: false
    }



    componentDidCatch() {
        console.log('error')
        this.setState({
            error: true
        })
    }

    onShowChar = () => {
        this.setState((state) => {
            return {
                showChar: !state.showChar
            }
        })
    }


    render() {
        const { showChar } = this.state
        const charView = showChar ? <ViewRandomChar /> : null

        if (this.state.error) {
            return <ErrorMessage />
        }
        return (

            <BrowserRouter>
                <div className='app'>
                    <Container>
                        <Header />
                    </Container>
                    <Container>
                        <Row>
                            <Col lg={{ size: 5, offset: 0 }}>
                                {charView}
                                <button
                                    className='btn btn-primary'
                                    style={{ marginBottom: '30px' }}
                                    onClick={this.onShowChar}
                                >Change character</button>
                            </Col>
                        </Row>
                        <Routes>
                            <Route path='/characters' element={<CharacterPage />} />
                            <Route path='/houses' element={<HousePage />} />
                            <Route path='/books' exact element={<BookPage />}>
                                <Route path=':id' element={<BooksItem />} />
                            </Route>
                            
                        </Routes>
                    </Container>
                </div>
            </BrowserRouter>

        );
    }
};

const ViewRandomChar = () => {
    return (
        <RandomChar />
    )
}
