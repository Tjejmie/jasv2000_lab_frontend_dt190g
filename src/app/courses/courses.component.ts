import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // to get data from the route used to show this component
import { BackendService } from '../backend.service'; // this component needs our backend service
import { courses } from '../courses.model'; // this component needs our User interface (model)

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

 courses: courses[];
  
 constructor(private backend: BackendService, private route: Router) {

   this.courses = [];
 }

 gotoHome(){
  this.route.navigate(['/my-courses']);  // define your component where you want to go
}

 ngOnInit(): void {
   this.getCourses();
 }


 getCourses() {

   this.backend.getCourses()
     .then(courses => {

       this.courses = courses;
     })
     .catch(error => console.error(`An error occurred getting all users: ${error}`));
  }
}
