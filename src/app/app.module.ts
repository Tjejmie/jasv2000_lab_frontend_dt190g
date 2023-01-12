import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoursesComponent } from './courses/courses.component';
import { MyCoursesComponent } from './my-courses/my-courses.component';

// Before we can use the HttpClient service in our application, 
// we need to import the Angular HttpClientModule. 
import { HttpClientModule } from '@angular/common/http';

// In order to use forms (in our add-user component) we need the FormsModule
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
