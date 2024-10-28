import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { HomeComponent } from '../home/home.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, HeaderComponent, HomeComponent, FooterComponent],
  standalone: true,
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})

export class LayoutComponent implements OnInit {
  title = 'Please Login';
  loginLabel = "LOGIN";
  logoutLabel = "LOGOUT"
  isLoggedIn = false;
  
  constructor() { };

  login() {
    this.isLoggedIn = true;
  }

  logout() {
    this.isLoggedIn = false;
  }

  ngOnInit() {
  }

}