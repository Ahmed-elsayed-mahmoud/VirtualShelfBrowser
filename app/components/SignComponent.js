import React, {Component} from 'react';
import {FormControl, HelpBlock, FormGroup, ControlLabel, Button, Modal} from 'react-bootstrap';

class SignInModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
        }
    }

    reset() {
        this.setState({email: "", password: ""});
    }

    signIn() {
        if (this.state.email !== "" && this.state.email != "")
            this.props.signIn(this.state.email, this.state.password);
        // else // handle error
    }

    signUp() {
        this.reset();
        this.props.signUp(true);
    }

    handleShow(show) {
        this.reset();
        this.props.handleShow(show);
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={() => this.handleShow(false)} keyboard>
                <Modal.Header closeButton>
                    Sign in
                </Modal.Header>
                <Modal.Body>
                <form>
                    <FormGroup>
                        <ControlLabel>Email address</ControlLabel>
                        <FormControl
                            type="email"
                            placeholder="Enter email"
                            value={this.state.email}
                            onChange={e => this.setState({email: e.target.value})}
                        />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Password</ControlLabel>
                        <FormControl
                            type="password"
                            placeholder="Enter Password"
                            value={this.state.password}
                            onChange={e => this.setState({password: e.target.value})}
                        />
                    </FormGroup>
                </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={e => this.signIn()} bsStyle="primary">Sign in</Button>
                    <Button onClick={e => this.signUp()}>Sign up</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

class SignUpModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password1: "",
            password2: "",
        }
    }

    reset() {
        this.setState({email: "", password1: "", password2: ""});
    }

    signUp() {
        if (this.state.email !== "" && this.state.password1 != "")
            this.props.signUp(this.state.email, this.state.password1);
        // else // handle error
    }

    signIn() {
        this.reset();
        this.props.signIn(true);
    }

    handleShow(show) {
        this.reset();
        this.props.handleShow(show);
    }

    validatePassword1() {
        const length = this.state.password1.length;
        if (length < 8) return 'error';
        if (length < 10) return 'warning';
        return 'success';
    }

    validatePassword2() {
        if (this.state.password1 != this.state.password2) return 'error';
        if (this.state.password2 == "") return null;
        return 'success';
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={() => this.handleShow(false)} keyboard>
                <Modal.Header closeButton>
                    Sign Up
                </Modal.Header>
                <Modal.Body>
                <form>
                    <FormGroup>
                        <ControlLabel>Email address</ControlLabel>
                        <FormControl
                            type="email"
                            placeholder="Enter email"
                            value={this.state.email}
                            onChange={e => this.setState({email: e.target.value})}
                        />
                    </FormGroup>
                    <FormGroup validationState={this.validatePassword1()}>
                        <ControlLabel>Password</ControlLabel>
                        <FormControl
                            type="password"
                            placeholder="Enter Password"
                            value={this.state.password1}
                            onChange={e => this.setState({password1: e.target.value})}
                        />
                    </FormGroup>
                    <FormGroup validationState={this.validatePassword2()}>
                        <ControlLabel>Confirm Password</ControlLabel>
                        <FormControl
                            type="password"
                            placeholder="Confirm Password"
                            value={this.state.password2}
                            onChange={e => this.setState({password2: e.target.value})}

                        />
                    </FormGroup>
                </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={e => this.signUp()} bsStyle="primary">Sign up</Button>
                    <Button onClick={e => this.signIn()}>Sign in</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}


class SignComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSignUp: false,
            showSignIn: false,
        }
    }

    showSignUp(show) {
        this.setState({showSignIn: false, showSignUp: show});
    }

    showSignIn(show) {
        this.setState({showSignIn: show, showSignUp: false});
    }

    signIn(email, password) {

    }

    signUp(email, password) {

    }

    render() {
        return (
            <div>
                <ul className="nav navbar-nav navbar-right">
                    <li className="link">
                        <a onClick={() => this.showSignIn(true)}>Sign In</a>
                    </li>
                    <li className="link">
                        <a onClick={() => this.showSignUp(true)}>Sign Up</a>
                    </li>
                </ul>
                <SignInModal
                    show={this.state.showSignIn}
                    handleShow={this.showSignIn.bind(this)}
                    signIn={this.signIn.bind(this)}
                    signUp={this.showSignUp.bind(this)}
                />
                <SignUpModal
                    show={this.state.showSignUp}
                    handleShow={this.showSignUp.bind(this)}
                    signIn={this.showSignIn.bind(this)}
                    signUp={this.signUp.bind(this)}
                />
            </div>
        );
    }
}

export {SignComponent, SignInModal, SignUpModal};