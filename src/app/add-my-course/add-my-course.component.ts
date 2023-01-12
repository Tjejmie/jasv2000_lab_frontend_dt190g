import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BackendService } from '../backend.service'; // this component needs our backend service
import { grades } from '../grades.model'; // this component needs our User interface (model)
import { myCourse } from '../my-course.model';


@Component({
  selector: 'app-add-my-course',
  templateUrl: './add-my-course.component.html',
  styleUrls: ['./add-my-course.component.css']
})
export class AddMyCourseComponent implements OnInit {
    grades: grades[];
    courseCode: string;
    grade: string;
    string: string;


    @Output() newCourseEvent: EventEmitter<myCourse>;
    constructor(private backend: BackendService) {
      this.grades = []; // initially empty
      this.grade = '';
      this.courseCode = '';
      this.string = 'asd'

      this.newCourseEvent = new EventEmitter<myCourse>();
     }
  
    ngOnInit(): void {
      this.backend.getGrades().subscribe(result => {
        this.grades = result;
      })
    }

    addCourse() {

      let addCoursePromise: Promise<myCourse>;

      addCoursePromise = this.backend.addCourse(
        this.courseCode, this.grade.toUpperCase());
      
  
        addCoursePromise
        .then(course => this.handleAddedCourse(course))
        .catch(error => "Not possible to add course");
    }

    private handleAddedCourse(course: myCourse) {

      this.courseCode = '';
      this.grade = '';
      this.newCourseEvent.emit(course);
     
    }
 
    

}
