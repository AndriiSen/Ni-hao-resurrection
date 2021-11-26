import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from './material/material.module';
import { UpdateProfileComponent } from './users/update-profile/update-profile.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { UpdateGuard } from './_helpers/guards/update.guard';

const routes: Routes = [
  {path: 'user/:id', component: UserProfileComponent},
  {path: 'user/:id/update', component: UpdateProfileComponent, canActivate: [UpdateGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule,
    MaterialModule]
})
export class AppRoutingModule { }
