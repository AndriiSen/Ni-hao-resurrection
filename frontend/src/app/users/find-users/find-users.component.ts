import { Component, OnInit } from '@angular/core';
import { UserProfileService } from 'src/app/shared/services/user-profile.service';

@Component({
  selector: 'app-find-users',
  templateUrl: './find-users.component.html',
  styleUrls: ['./find-users.component.css']
})
export class FindUsersComponent implements OnInit {
  usersList = ['andrii', 'makar', 'sergio', 'gooote', 'ramada', 'jafar'];

  constructor(private userProfileService: UserProfileService) { }

  ngOnInit(): void {
    this.userProfileService.getAllUsers().subscribe(
      data => {
        this.usersList = data
      }
    )
  }
}
