import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // to get data from the route used to show this component
import { BackendService } from '../backend.service'; // this component needs our backend service
import { myCourse } from '../my-course.model'; // this component needs our User interface (model)
import { grades } from '../grades.model'; // this component needs our User interface (model)

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.css']
})

export class MyCoursesComponent implements OnInit {

  myCourses: myCourse[];
  grades: any = []

    constructor(private backend: BackendService, private route: ActivatedRoute) {
      this.myCourses = []; // initially empty
      this.grades = []; // initially empty
    }
  
    ngOnInit(): void {
      this.backend.getMyCourses().subscribe(result => {
        this.myCourses = result;
      })
      this.backend.getGrades().subscribe(result => {
        this.grades = result;
      })
    }


    searchText: string = '';

    onSearchTextEntered(searchValue: string){
      this.searchText = searchValue;
      //console.log(this.searchText)
    }


    addCourse(course: myCourse) { 

      //this.myCourses.push(course);
      location.reload();
      console.log("Course added!")   
    }

    deleteCourse(courseCode : string){
      const test = this.myCourses.findIndex(x => x.courseCode == courseCode);
      this.myCourses.splice(test, 1);
      this.backend.deleteCourse(courseCode).subscribe(result => {
        console.log('Course deleted');
      })
    }


    changeGrade(courseCode : string, grade : any, ){
      this.backend.updateGrade(courseCode, {grade}).subscribe(result => {
        console.log('Grade changed');
      })
    }
}
