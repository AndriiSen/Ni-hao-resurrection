import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { UpdateProfileComponent } from './users/update-profile/update-profile.component';
import { JwtInterceptorService } from './_helpers/interceptors/jwt-interceptor.service';
import { UpdateGuard } from './_helpers/guards/update.guard';

@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    UpdateProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    SharedModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true
    },
    UpdateGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
