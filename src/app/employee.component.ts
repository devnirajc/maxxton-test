import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EmployeeData } from './shared/model/employee-data';
import { EmployeeService } from './shared/services/employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  searchText = '';
  employeeInfo: EmployeeData[];
  candidateCount: {};

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.subscribeEmployeeInformation();
  }

  subscribeEmployeeInformation() {
    this.employeeService.getEmployeeInfo().subscribe((data: EmployeeData[]) => {
      this.employeeInfo = data;
    },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      }
    );
  }

  /**
   * sortByName
   */
  public sortByName() {
    this.sortAscending(this.employeeInfo, 'name');
  }

  /**
   * sortByJoiningDate
   */
  public sortByJoiningDate() {
    this.sortAscending(this.employeeInfo, 'joining_date');
  }

  /**
   * parseDate
   */
  private parseDate(date) {
    const splitDate = date.split('/');
    return new Date(splitDate[2], splitDate[1] - 1, splitDate[0]);
  }

  /**
   * sortAscending
   */
  private sortAscending(candidateObj: EmployeeData[], key: string) {
    candidateObj.sort((obj1, obj2) => {
      if (key === 'joining_date') {
        return this.parseDate(obj1[key]) > this.parseDate(obj2[key]) ? 1 : this.parseDate(obj1[key]) < this.parseDate(obj2[key]) ? -1 : 0;
      } else {
        return obj1[key] > obj2[key] ? 1 : obj1[key] < obj2[key] ? -1 : 0;
      }
    });
  }

  /**
   * findEmployeeByExperience
   */
  public findEmployeeByExperience() {
    let employeeData = [];
    employeeData = this.employeeInfo.filter(data => {
      return this.getDateDifference(new Date(this.parseDate(data.joining_date)), new Date()) > 2;
    });
    this.employeeInfo = employeeData;
  }

  /**
   * getDateDifference
   */
  private getDateDifference(date1: Date, date2: Date) {
    const date2UTC = new Date(
      Date.UTC(date2.getUTCFullYear(), date2.getUTCMonth(), date2.getUTCDate())
    );
    const date1UTC = new Date(
      Date.UTC(date1.getUTCFullYear(), date1.getUTCMonth(), date1.getUTCDate())
    );

    let days = date2UTC.getDate() - date1UTC.getDate();
    if (days < 0) {
      date2UTC.setMonth(date2UTC.getMonth() - 1);
      days += this.daysInMonth(date2UTC);
    }
    let months = date2UTC.getMonth() - date1UTC.getMonth();
    if (months < 0) {
      date2UTC.setFullYear(date2UTC.getFullYear() - 1);
      months += 12;
    }
    const years = date2UTC.getFullYear() - date1UTC.getFullYear();
    return years;
  }

  /**
   * daysInMonth
   */
  private daysInMonth(date2UTC: Date) {
    const monthStart = new Date(date2UTC.getFullYear(), date2UTC.getMonth(), 1);
    const monthEnd = new Date(date2UTC.getFullYear(), date2UTC.getMonth() + 1, 1);
    const monthLength = (Number(monthEnd) - Number(monthStart)) / (1000 * 60 * 60 * 24);
    return monthLength;
  }

  /**
   * getDistictDepartment
   */
  public getDistictDepartment() {
    const distictDepartment = [];
    this.employeeInfo.map(x => distictDepartment.filter(a => a.department === x.department).length > 0 ? null : distictDepartment.push(x));
    this.employeeInfo = distictDepartment;
  }

  /**
   * getDistictDepartmentCandidateCount
   */
  public getDistictDepartmentCandidateCount() {
    this.candidateCount = this.employeeInfo.reduce((acc, val) => {
      acc[val.department] = acc[val.department] === undefined ? 1 : acc[val.department] += 1;
      return acc;
    }, {});
    alert(JSON.stringify(this.candidateCount));
  }

  /**
   * removeCandidateFromDepartment
   */
  public removeCandidateFromDepartment() {
    let employeeData = [];
    employeeData = this.employeeInfo.filter(data => {
      return data.department.toLocaleLowerCase() !== 'development';
    });
    this.employeeInfo = employeeData;
  }
}
