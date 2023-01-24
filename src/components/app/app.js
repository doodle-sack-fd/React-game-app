import React, { Component } from 'react';
import { Col, Row, Container } from 'reactstrap';
import Header from '../header';
import RandomChar from '../random-char';
import ErrorMessage from '../error-message';
import CharacterPage from '../character-page';

export default class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showChar: true,
            error: false
        }

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
