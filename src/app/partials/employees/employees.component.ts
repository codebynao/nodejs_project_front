import { Component, OnInit } from '@angular/core';
import { EmployeesService } from '../../services/employees.service';
import { EMPLOYEE_POSITIONS } from '../../../config/constants';
import * as moment from 'moment';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees;
  employeePositionsList = EMPLOYEE_POSITIONS;
  constructor(private employeesService: EmployeesService) { }

  ngOnInit() {
    this.employeesService.getListEmployees().subscribe(res => {
      if (res && res['data']) {
        this.employees = res['data'];
        this.employees.forEach(employee => {
          employee.birthdate = moment(employee.birthdate).format('DD/MM/YYYY');
        });
      }
    });
  }

  deleteEmployee(id) {
    this.employeesService.deleteEmployee(id);
  }
}
