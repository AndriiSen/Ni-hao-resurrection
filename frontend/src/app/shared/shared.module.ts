import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePageComponent } from './components/home-page/home-page.component';

@NgModule({
  declarations: [
    HeaderComponent,
    PageNotFoundComponent,
    HomePageComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
        ReactiveFormsModule
  ],
  exports: [
    HeaderComponent,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class SharedModule { }
