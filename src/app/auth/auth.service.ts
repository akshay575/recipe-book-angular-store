import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducers';
import * as AuthActions from './store/auth.actions';

@Injectable()
export class AuthService {
    token: string;

    constructor(private router: Router,
                private store: Store<fromApp.AppState>) {}

    signupUser(username: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(username, password)
            .then(
                response => {
                    this.store.dispatch(new AuthActions.Signup());

                    firebase.auth().currentUser.getIdToken()
                        .then(
                            (token: string) => {
                                this.store.dispatch(new AuthActions.SetToken(token));
                            }
                        )
                }
            )
            .catch(
                error => console.log(error)
            )
    }

    signinUser(username: string, password: string) {
        firebase.auth().signInWithEmailAndPassword(username, password)
            .then(
                response => {
                    this.store.dispatch(new AuthActions.Signin());
                    this.router.navigate(['/']);
                    firebase.auth().currentUser.getIdToken()
                        .then(
                            (token: string) => {
                                this.store.dispatch(new AuthActions.SetToken(token));
                            }
                        )
                }
            )
            .catch(
                error => console.log(error)
            )
    }

    logout() {
        firebase.auth().signOut();
        this.store.dispatch(new AuthActions.Logout());
    }

    getToken() {
        firebase.auth().currentUser.getToken()
            .then(
                (token: string) => this.token = token
            )
        return this.token;
    }

    isAuthenticated() {
        return this.token != null;
    }
}