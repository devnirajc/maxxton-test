import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeService } from './shared/services/employee.service';

import { AppRoutingModule } from './employee-routing.module';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from './shared/pipes/search.pipe';
import { EmployeeComponent } from './employee.component';

@NgModule({
  declarations: [
    EmployeeComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    EmployeeService
  ],
  bootstrap: [EmployeeComponent]
})
export class EmployeeModule { }
