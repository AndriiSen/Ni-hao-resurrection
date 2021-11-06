import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  imageUrl ='https://memepedia.ru/wp-content/uploads/2016/03/large_p19d7nh1hm1i37tnuim11ebqo5c1.jpg'
  longText = `“Hiding the pain”`
  userName = 'Happy Harold'
  userDecription = 'help me plz'


  constructor() { }

  ngOnInit(): void {
  }

}
