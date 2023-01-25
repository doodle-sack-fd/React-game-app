import React, { Component } from 'react';
import { Col, Row, Container } from 'reactstrap';
import Header from '../header';
import RandomChar from '../random-char';
import ErrorMessage from '../error-message';
import CharacterPage from '../character-page';
import ItemList from '../item-list';
import CharDetails from '../char-details';
import gotService from '../../services/got-services';


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
            <>
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
                    <CharacterPage />
                    <Row>
                        <Col md='6'>
                            <ItemList
                                onItemSelected={this.onItemSelected}
                                getData={this.gotService.getAllBooks}
                                renderItem={(item) => item.name} />
                        </Col>
                        <Col md='6'>
                            <CharDetails charId={this.state.selectedChar} />
                        </Col>
                    </Row>
                    <Row>
                        <Col md='6'>
                            <ItemList
                                onItemSelected={this.onItemSelected}
                                getData={this.gotService.getAllHouses}
                                renderItem={(item) => item.name}
                            />
                        </Col>
                        <Col md='6'>
                            <CharDetails charId={this.state.selectedChar} />
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
};

const ViewRandomChar = () => {
    return (
        <RandomChar />
    )
}
