import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserServicesService } from 'src/app/services/user-services.service';
declare var $: any; // Declare jQuery
import 'bs-stepper'; // Import Bootstrap Stepper

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddEmployeeComponent>,
     private _userServices: UserServicesService
  ) { }
  
  employeeData = {
    "firstName": "",
    "lastName": "",
    "email": "",
    "phone": "",
    "hireDate": "",
    "companyId": "",
    "departmentId": "",
    "designationId": "",
    "status": "",
    "immediateManagerId": "",
    "extensionNumber": "",
    "employeeType":"",
    "inOffice": "",
    "userEmpId":""
};
  employeePersonalInfo = {
    "empId": "",
    "personalEmail": "",
    "homeNumber": "",
    "gender": "",
    "maritalStatus": "",
    "birthDate": "",
    "highestQualification": "",
    "anniversaryDate": "",
    "uidNumber": "",
    "panNumber": "",
    "totalExperience": "",
    "profileImageUrl":"",
    "userEmpId": ""
}
  departMentList = [];
  companyList: any = [];
  employeeList: any = [];
  selectedCpmpany: any;
  selectedDepartment: any;
  selectedDepartMentHead: any;
  reportingManagerName: any;
  imageUrl: string | ArrayBuffer | null = null;


  ngOnInit(): void {
    this._userServices.getDepartmentList().subscribe((res: any) => {
      this.departMentList = res;
    })

    this._userServices.getCompanyList().subscribe((res: any) => {
      this.companyList = res;
    })

    this._userServices.getEmployeeListByCompanyId(4).subscribe((res: any) => {
      this.employeeList = res;
      console.log(this.employeeList);
    })


  }

  onCloseClick(): void {
    this.dialogRef.close();
  }


  onChange(e){
    console.log(e);
    console.log(this.selectedDepartment);
  }

  addEmployee(){

    this.employeeData.departmentId = this.selectedDepartment;
    this.employeeData.immediateManagerId = this.reportingManagerName;
    this.employeeData.companyId = this.selectedCpmpany;
    this._userServices.addEmployee(this.employeeData).subscribe((res: any) => {
      console.log(res);

    })
  }
  addEmployeePersonalInfo(){
    this._userServices.addEmployeePersonalInfo(this.employeePersonalInfo).subscribe((res: any) => {
      console.log(res);

    })
  }


  selectedFile: File | null = null;
  selectedFileUrl: string | null = null;

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] as File;
    if (this.selectedFile) {
      // Generate a URL for the selected file (assuming it's an image)
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedFileUrl = e.target.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  uploadProfilePicture(): void {
    if (this.selectedFile) {
      // Perform upload logic here (similar to previous examples)
      console.log('Uploading profile picture:', this.selectedFile.name);
    } else {
      console.warn('No file selected.');
    }
  }
}
