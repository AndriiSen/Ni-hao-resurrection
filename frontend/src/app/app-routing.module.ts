import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from './material/material.module';
import { UserProfileComponent } from './users/user-profile/user-profile.component';

const routes: Routes = [
  {path: 'user/:id', component: UserProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule,
    MaterialModule]
})
export class AppRoutingModule { }
