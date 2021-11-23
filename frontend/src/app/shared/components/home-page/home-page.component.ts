import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    let regButton: any = document.querySelector('.register');
    let loginButton: any = document.querySelector('.login');
    function updateHeader () {
      regButton.classList.add('remove');
      loginButton.classList.add('remove');

    }
    updateHeader  ();
  }

}
