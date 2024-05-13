import { Component, OnInit , ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import {UserServicesService} from '../services/user-services.service';
import {MatPaginator} from '@angular/material/paginator';
import { ExportToExcelService } from '../services/export-to-excel.service';
import { MatTableDataSource } from '@angular/material/table';

export interface TableData {
  position: number;
  name: string;
  weight: number;
}

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {

  constructor(public dialog: MatDialog,
    private _userServices: UserServicesService,
    private _exportToExcelService: ExportToExcelService
  ) { 
    
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  showUsers = false; // Initialize showDiv as false
  showLockedUsers = true;
  employeeId: any;
  activeEmployees: any;
  dataSource: any;
  totalRecords: any;
  dataSource1: any;
  isLoading: boolean = false;
  displayedColumns: string[] = ['selectEmployee' ,'CompanyName', 'EmployeeName', 'Desihnation', 'Department', 'ReportingManager', 'ExtentionNo','CurrentLockStatus', 'ActiveStatus', 'ProfileLockedReason', 'Action'];




  

  tabChanged(event: any): void {
    // Check the selected index to determine whether to show/hide the div
    if (event.index === 1) { // Assuming Tab 2 is the index 1 (zero-based index)
      this.showUsers = true; // Show the div when Tab 2 is selected
    this.showLockedUsers = false;
    } else {
      this.showLockedUsers = true; // Hide the div for other tabs
      this.showUsers = false;
    }
  }

  createEmployee(): void {
    const dialogRef = this.dialog.open(AddEmployeeComponent, {
      width: '80%', // Set the width of the dialog
      height: '100%', // Set the height of the dialog
      // Optionally, you can set more dialog options here
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed');
    });
  }

  // searchEmployeeById() {
  //   this._userServices.findEmployeeById(this.employeeId).subscribe((res: any) => {
  //     this.dataSource = res;
  //   })
  
  // }

  exportToExcel(): void {
    this._exportToExcelService.exportToExcel(this.dataSource1, 'exported_data');
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.dataSource1 = [
      { id: 1, fullName: 'John Doe', gender: 'Male', address: '123 Main St', city: 'New York', pin: '123456', state: 'NY', country: 'USA', email: 'john@example.com', contact: '1234567890', educationQualification: 'Bachelor\'s Degree', designation: 'Software Engineer' },
      { id: 2, fullName: 'Jane Smith', gender: 'Female', address: '456 Oak Ave', city: 'Los Angeles', pin: '234567', state: 'CA', country: 'USA', email: 'jane@example.com', contact: '2345678901', educationQualification: 'Master\'s Degree', designation: 'Data Analyst' },
      { id: 3, fullName: 'Michael Johnson', gender: 'Male', address: '789 Elm St', city: 'Chicago', pin: '345678', state: 'IL', country: 'USA', email: 'michael@example.com', contact: '3456789012', educationQualification: 'High School Diploma', designation: 'Accountant' },
      { id: 4, fullName: 'Emily Brown', gender: 'Female', address: '101 Pine St', city: 'Houston', pin: '456789', state: 'TX', country: 'USA', email: 'emily@example.com', contact: '4567890123', educationQualification: 'Associate\'s Degree', designation: 'HR Manager' },
      { id: 5, fullName: 'William Wilson', gender: 'Male', address: '222 Cedar Ave', city: 'Phoenix', pin: '567890', state: 'AZ', country: 'USA', email: 'william@example.com', contact: '5678901234', educationQualification: 'PhD', designation: 'Professor' },
      { id: 6, fullName: 'Olivia Martinez', gender: 'Female', address: '333 Maple St', city: 'Philadelphia', pin: '678901', state: 'PA', country: 'USA', email: 'olivia@example.com', contact: '6789012345', educationQualification: 'Bachelor\'s Degree', designation: 'Graphic Designer' },
      { id: 7, fullName: 'James Anderson', gender: 'Male', address: '444 Birch Ave', city: 'San Antonio', pin: '789012', state: 'TX', country: 'USA', email: 'james@example.com', contact: '7890123456', educationQualification: 'Master\'s Degree', designation: 'Marketing Manager' },
      { id: 8, fullName: 'Sophia Taylor', gender: 'Female', address: '555 Oak St', city: 'San Diego', pin: '890123', state: 'CA', country: 'USA', email: 'sophia@example.com', contact: '8901234567', educationQualification: 'High School Diploma', designation: 'Sales Representative' },
      { id: 9, fullName: 'Alexander Thomas', gender: 'Male', address: '666 Elm Ave', city: 'Dallas', pin: '901234', state: 'TX', country: 'USA', email: 'alexander@example.com', contact: '9012345678', educationQualification: 'Associate\'s Degree', designation: 'Financial Analyst' },
      { id: 10, fullName: 'Isabella Hernandez', gender: 'Female', address: '777 Pine St', city: 'San Jose', pin: '012345', state: 'CA', country: 'USA', email: 'isabella@example.com', contact: '0123456789', educationQualification: 'PhD', designation: 'CEO' },
  
    ];
    this.dataSource = new MatTableDataSource<any>(this.dataSource1);

  }

  ngAfterViewInit(): void {
    
  }
  

}
