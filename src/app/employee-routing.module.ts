import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeComponent } from './employee.component';

const routes: Routes = [
  { path: '', component: EmployeeComponent },
  { path: 'sortByName', component: EmployeeComponent },
  { path: 'sortByJoiningDate', component: EmployeeComponent },
  { path: 'searchByName', component: EmployeeComponent },
  { path: 'experienceCandidate', component: EmployeeComponent },
  { path: 'distinctDepartment', component: EmployeeComponent },
  { path: 'countByDistinctDepartment', component: EmployeeComponent },
  { path: 'removeCandidateFromDevelopmentDept', component: EmployeeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
