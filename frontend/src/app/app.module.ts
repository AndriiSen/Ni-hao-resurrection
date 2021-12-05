import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { UpdateProfileComponent } from './users/update-profile/update-profile.component';
import { RouterModule } from '@angular/router';
import { TokenInterceptorService } from './token-interceptor.service';
import { FormsModule } from '@angular/forms';
import { FindUsersComponent } from './users/find-users/find-users.component';

@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    UpdateProfileComponent,
    FindUsersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    SharedModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule,
    FormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    }
  ],
  bootstrap: [
    AppComponent
  ],
})
export class AppModule {}
