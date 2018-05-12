import React, {Component} from 'react';
import {FormControl, HelpBlock, FormGroup, ControlLabel, Button, Modal} from 'react-bootstrap';
import Controller from '../controller/Controller';
import User from '../model/User';
// npm install sweetalert --save
import * as SweetAlert from 'sweetalert/dist/sweetalert.min';

class SignInModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            isLoading: false
        };
        this.signIn = this.signIn.bind(this);
    }

    reset() {
        this.setState({email: "", password: ""});
    }

    signIn() {
        if (this.state.email !== "" && this.state.password !== "") {
            this.setState({isLoading: true});
            this.props.signIn(this.state.email, this.state.password).then(() => {
                this.setState({isLoading: false});
            });
        }
        // else // handle error
        else {
            swal("Invalid Input", "Email and Password are required!", "error");
        }
    }

    signUp() {
        this.reset();
        this.props.signUp(true);
    }

    handleShow(show) {
        this.reset();
        this.props.handleShow(show);
    }

    enterKeyHandler(event) {
        if (event.key === 'Enter') {
            this.signIn();
        }
    }

    render() {
        const {isLoading} = this.state;
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
                                onKeyPress={e => this.enterKeyHandler(e)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <ControlLabel>Password</ControlLabel>
                            <FormControl
                                type="password"
                                placeholder="Enter Password"
                                value={this.state.password}
                                onChange={e => this.setState({password: e.target.value})}
                                onKeyPress={e => this.enterKeyHandler(e)}
                            />
                        </FormGroup>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={!isLoading ? this.signIn : null}
                            disabled={isLoading}
                            bsStyle="primary">
                        {isLoading ? 'Loading...' : 'Sign in'}
                    </Button>
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
            isLoading: false
        };
        this.signUp = this.signUp.bind(this);
    }

    reset() {
        this.setState({email: "", password1: "", password2: ""});
    }

    signUp() {
        if (this.state.email !== "" && this.state.password1 !== "") {
            if (this.state.password1 === this.state.password2) {
                this.setState({isLoading: true});
                this.props.signUp(this.state.email, this.state.password1).then(() => {
                    this.setState({isLoading: false});
                });
            }
            else {
                swal("Invalid Input", "Password Mismatch!", "error");
            }
        }
        // else // handle error
        else {
            swal("Invalid Input", "Email and Password are required!", "error");
        }
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
        if (length < 4) return 'error';
        if (length < 6) return 'warning';
        return 'success';
    }

    validatePassword2() {
        if (this.state.password1 !== this.state.password2) return 'error';
        if (this.state.password2 === "") return null;
        return 'success';
    }

    enterKeyHandler(event) {
        if (event.key === 'Enter') {
            this.signUp();
        }
    }

    render() {
        const {isLoading} = this.state;
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
                                onKeyPress={e => this.enterKeyHandler(e)}
                            />
                        </FormGroup>
                        <FormGroup validationState={this.validatePassword1()}>
                            <ControlLabel>Password</ControlLabel>
                            <FormControl
                                type="password"
                                placeholder="Enter Password"
                                value={this.state.password1}
                                onChange={e => this.setState({password1: e.target.value})}
                                onKeyPress={e => this.enterKeyHandler(e)}
                            />
                        </FormGroup>
                        <FormGroup validationState={this.validatePassword2()}>
                            <ControlLabel>Confirm Password</ControlLabel>
                            <FormControl
                                type="password"
                                placeholder="Confirm Password"
                                value={this.state.password2}
                                onChange={e => this.setState({password2: e.target.value})}
                                onKeyPress={e => this.enterKeyHandler(e)}
                            />
                        </FormGroup>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={!isLoading ? this.signUp : null}
                            disabled={isLoading}
                            bsStyle="primary">
                        {isLoading ? 'Loading...' : 'Sign up'}
                    </Button>
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
        };
        this.controller = Controller.getInstance();
    }

    showSignUp(show) {
        this.setState({showSignIn: false, showSignUp: show});
    }

    showSignIn(show) {
        this.setState({showSignIn: show, showSignUp: false});
    }

    signIn(email, password) {
        let user = new User();
        user.email = email;
        user.password = password;
        return this.controller.signIn(user).then((status) => {
            if (typeof status === "string") {
                swal("Authentication Failed!", status, "error");
            }
            else {
                swal("Successful", "Logged in Successfully!", "success");
                let newUser = this.controller.getCurrentSignedUser();
                this.props.setUser(newUser);
            }
        });
    }

    signUp(email, password) {
        let user = new User();
        user.email = email;
        user.password = password;
        return this.controller.signUp(user).then((status) => {
            if (typeof status === "string") {
                swal("Sign Up Failed!", status, "error");
            }
            else {
                swal("Successful", "Account Created Successfully!", "success");
                let newUser = this.controller.getCurrentSignedUser();
                this.props.setUser(newUser);
            }
        });
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