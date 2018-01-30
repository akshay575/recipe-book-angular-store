import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyDnt9zj9cXsugnlKTnAyr9mQ5tOAKnqMCI",
      authDomain: "ng-recip-book.firebaseapp.com"
    });
  }
}
