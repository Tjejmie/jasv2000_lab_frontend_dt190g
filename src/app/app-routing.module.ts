import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyCoursesComponent } from './my-courses/my-courses.component';
import { CoursesComponent } from './courses/courses.component';

const routes: Routes = [{
  title: 'DT190G - Javascriptbaserad webbutveckling - HT22',
  path: 'my-courses',
  component: MyCoursesComponent,

},
{
  title: 'DT190G - Javascriptbaserad webbutveckling - HT22',
  path: '',
  component: CoursesComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
