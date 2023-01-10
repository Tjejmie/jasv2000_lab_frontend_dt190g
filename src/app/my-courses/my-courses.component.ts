
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // to get data from the route used to show this component
import { BackendService } from '../backend.service'; // this component needs our backend service
import { myCourses } from '../my-course.model'; // this component needs our User interface (model)
import { grades } from '../grades.model'; // this component needs our User interface (model)

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.css']
})
export class MyCoursesComponent {

    myCourses: myCourses[];
    grades: grades[];
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


    // createGradeOptions(grades:any) {
	
    //   for (const val of grades)
    //     {
    //       const selectElement = document.getElementById("asd");

    //       var option = document.createElement("option");
    //         option.text = val.charAt(0).toUpperCase() + val.slice(1);
    //         selectElement!.appendChild(option);
    //         for(const myCourse of this.myCourses){
    //           if(myCourse.grade == val){
    //             var inputElement = <HTMLInputElement>document.getElementById('asd');
    //             inputElement.value = val;
      
    //           }
    //         }
    //     }
      
    // }

    // getMyCourses() {

    //   this.backend.getMyCourses()
    //     .then(myCourses => {
   
    //       this.myCourses = myCourses;
    //     })
    //     .catch(error => console.error(`An error occurred getting all users: ${error}`));
    //  }
 
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
