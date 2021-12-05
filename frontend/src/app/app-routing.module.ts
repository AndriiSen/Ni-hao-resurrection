import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from './material/material.module';
import { FindUsersComponent } from './users/find-users/find-users.component';
import { UpdateProfileComponent } from './users/update-profile/update-profile.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';

const routes: Routes = [
  {path: 'user/:id', component: UserProfileComponent},
  {path: 'user/:id/update', component: UpdateProfileComponent},
  {path: 'users/find', component: FindUsersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule,
    MaterialModule]
})
export class AppRoutingModule { }
