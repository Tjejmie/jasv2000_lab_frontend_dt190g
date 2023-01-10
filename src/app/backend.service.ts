import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { myCourses } from './my-course.model';
import { courses } from './courses.model';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  // URL to the REST API this application uses
  readonly API_URL = 'https://jasv2000-lab2-backend-dt190g.azurewebsites.net';

  constructor(private http: HttpClient) { }


  getCourses(): Promise<courses[]> {
    const endpoint = this.API_URL + '/api/courses';
    const responseObservable = this.http.get<courses[]>(endpoint);
    const responsePromise = firstValueFrom(responseObservable);
    return responsePromise;
  }

  getMyCourses(): Promise<myCourses[]> {
    const endpoint = this.API_URL + '/api/courses/my';
    const responseObservable = this.http.get<myCourses[]>(endpoint);
    const responsePromise = firstValueFrom(responseObservable);
    return responsePromise;
  }
}
