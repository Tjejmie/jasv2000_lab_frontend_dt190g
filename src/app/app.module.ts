import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoursesComponent } from './courses/courses.component';
import { MyCoursesComponent } from './my-courses/my-courses.component';

import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { SearchCourseComponent } from './search-course/search-course.component';
import { AddMyCourseComponent } from './add-my-course/add-my-course.component';

@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    MyCoursesComponent,
    SearchCourseComponent,
    AddMyCourseComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
