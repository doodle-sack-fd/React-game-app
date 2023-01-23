import React, { Component } from 'react';
import { Col, Row, Container } from 'reactstrap';
import Header from '../header';
import RandomChar from '../random-char';
import ItemList from '../item-list';
import CharDetails from '../char-details';

export default class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showChar: true
        }

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
                                style={{marginBottom: '30px'}}
                                onClick={this.onShowChar}
                            >Change character</button>
                        </Col>
                    </Row>
                    <Row>
                        <Col md='6'>
                            <ItemList />
                        </Col>
                        <Col md='6'>
                            <CharDetails />
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
