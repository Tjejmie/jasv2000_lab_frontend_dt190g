import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // to get data from the route used to show this component
import { BackendService } from '../backend.service'; // this component needs our backend service
import { myCourses } from '../my-course.model'; // this component needs our User interface (model)

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.css']
})
export class MyCoursesComponent {

    myCourses: myCourses[];
 
    constructor(private backend: BackendService, private route: ActivatedRoute) {

      this.myCourses = []; // initially empty

    }
  
    ngOnInit(): void {
      this.getMyCourses();
  
    }
  
    getMyCourses() {

      this.backend.getMyCourses()
        .then(myCourses => {

          this.myCourses = myCourses;
  

        })
        .catch(error => console.error(`An error occurred getting all users: ${error}`));
    
  }
}
