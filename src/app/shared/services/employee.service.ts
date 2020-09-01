import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class EmployeeService {
    private url = './../../assets/candidate_data.json';
    constructor(private http: HttpClient) { }

    getEmployeeInfo() {
        return this.http.get(this.url);
    }
}
