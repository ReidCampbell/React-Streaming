import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends Component {
    state = { isSignedIn: null };

    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '506275875592-l2o56qpc7vi0iq8sse96v8dnqu8ba1v7.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.setState({ isSignedIn: this.auth.isSignedIn.get() });
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    onAuthChange = () => {
        this.setState({ isSignedIn: this.auth.isSignedIn.get() });
    };

    onSignInClick = () => {
        this.auth.signIn();
    };

    onSignOutClick = () => {
        this.auth.signOut();
    };

    renderAuthButton() {
        if (this.stateisSignedIn === null) {
            return null;
        } else if (this.state.isSignedIn) {
            return (
                <button onClick={this.onSignOutClick} className="ui red google button">
                    <i className="google icon" />
                    Sign Out
                </button>
            )
        } else {
            return (
                <button onClick={this.onSignInClick} className="ui green google button">
                    <i className="google icon" />
                    Sign In
                </button>
            )
        }
    }

    render() {
        return (
            <div className="item">
               {this.renderAuthButton()}
            </div>
        );
    }
}

export default connect(null, { signIn, signOut })(GoogleAuth);