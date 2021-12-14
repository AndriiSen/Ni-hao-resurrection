import { Component, OnInit } from '@angular/core';
import { UserProfileService } from 'src/app/shared/services/user-profile.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-find-users',
  templateUrl: './find-users.component.html',
  styleUrls: ['./find-users.component.css']
})
export class FindUsersComponent implements OnInit {
  usersList;
  filterQuery: string | undefined;
  token;
  decoded;

  constructor(private userProfileService: UserProfileService) { }

  ngOnInit(): void {
    this.userProfileService.getAllUsers().subscribe(
      data => {
        this.usersList = data.map(el => el.userInfo)
      }
    )
    this.token = localStorage.getItem('Auth-Token')
    this.decoded = jwt_decode(this.token)
  }

  sendFriendshipRequest(receiverId) {
    this.userProfileService.sendFriendshipRequest(this.decoded.id, receiverId).subscribe(
      data => console.log('send')
    )
  }
}
