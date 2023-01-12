
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { myCourse } from './my-course.model';
import { course } from './courses.model';
import { grades } from './grades.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};
@Injectable({
  providedIn: 'root'
})
export class BackendService {
  // URL to the REST API this application uses
  readonly API_URL = 'https://jasv2000-lab2-backend-dt190g.azurewebsites.net';

  constructor(private http: HttpClient) { }


  // getCourses(): Promise<courses[]> {
  //   const endpoint = this.API_URL + '/api/courses';
  //   const responseObservable = this.http.get<courses[]>(endpoint);
  //   const responsePromise = firstValueFrom(responseObservable);
  //   return responsePromise;
  // }
  public getCourses(): Observable<course[]>{
    return this.http.get<course[]>(`${this.API_URL}/api/courses`);
  }
  // getMyCourses(): Promise<myCourses[]> {
  //   const endpoint = this.API_URL + '/api/courses/my';
  //   const responseObservable = this.http.get<myCourses[]>(endpoint);
  //   const responsePromise = firstValueFrom(responseObservable);
  //   return responsePromise;
  // }

  public getGrades(): Observable<grades[]>{
    return this.http.get<grades[]>(`${this.API_URL}/api/grades`);
  }

  // getMyCourses(): Promise<myCourses[]> {
  //   const endpoint = this.API_URL + '/api/courses/my';
  //   const responseObservable = this.http.get<myCourses[]>(endpoint);
  //   const responsePromise = firstValueFrom(responseObservable);
  //   return responsePromise;
  // }
  public deleteCourse(courseCode : string){
    return this.http.delete(`${this.API_URL}/api/courses/my/` + courseCode , httpOptions )
  }

  public getMyCourses(): Observable<myCourse[]>{
    return this.http.get<myCourse[]>(`${this.API_URL}/api/courses/my`);
  }

  // public updateGrade(courseCode : string, grade: any){
   
  //   return this.http.put(`${this.API_URL}api/courses/my/` + courseCode, grade, httpOptions )
  // }

    public updateGrade(courseCode : string, grade: any){
      return this.http.put(`${this.API_URL}/api/courses/my/` + courseCode, grade, httpOptions )
  }

  addCourse(courseCode: string, grade: string): Promise<myCourse> {
    // The endpoint to use
    const endpoint = this.API_URL + '/api/courses/my';

    const body = {
      courseCode: courseCode,
      grade: grade
    };

    // Make a POST request and return an Observable of the response
    const responseObservable = this.http.post<myCourse>(endpoint, body);

    // Convert and return the first emitted value to a Promise<User>
    return firstValueFrom(responseObservable);
  }

  
}