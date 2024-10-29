import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private loggedInSource = new BehaviorSubject<boolean>(false);
    loggedIn$ = this.loggedInSource.asObservable();

    login() {
        console.log("*** AuthService.login() ***")
        //console.log("Username = " + credentials.username)
        //console.log("Password = " + credentials.password)
        this.loggedInSource.next(true);
    }

    logout() {
        console.log("*** AuthService.logout() ***")
        //console.log("Username = " + credentials.username)
        //console.log("Password = " + credentials.password)
        this.loggedInSource.next(false);
    }
}