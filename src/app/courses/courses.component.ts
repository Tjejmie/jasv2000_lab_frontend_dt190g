import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // to get data from the route used to show this component
import { BackendService } from '../backend.service'; // this component needs our backend service
import { course } from '../courses.model'; // this component needs our User interface (model)

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

 courses: course[];
  
 constructor(private backend: BackendService, private route: ActivatedRoute) {

   this.courses = [];
 }

 ngOnInit(): void {
    this.backend.getCourses().subscribe(result => {
    this.courses = result;
  })
 }

}
