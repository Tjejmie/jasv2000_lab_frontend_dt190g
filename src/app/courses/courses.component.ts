import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { course } from '../courses.model';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

 courses: course[];
 searchCourse: course[];

 constructor(private backend: BackendService) {

   this.courses = [];
   this.searchCourse = [];
 }

 ngOnInit(): void {
    this.backend.getCourses().subscribe(result => {
      this.courses = result;
      this.searchCourse = result;
  })
 }

 searchText: string = '';
    onSearchTextEntered(searchValue: string){
      this.searchText = searchValue;
    }
}
