import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';


export interface UserData {
  fullName: string;
  gender: string;
  address: string;
  city: string;
  pin: number;
  state: string;
  country: string;
  email: string;
  contact: number;
  educationQualification: string;
  designation: string;
}

@Component({
  selector: 'app-dashboardComponent-form',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  registrationForm: FormGroup;
  displayedColumns: string[] = ['id', 'fullName', 'gender', 'address', 'city', 'pin', 'state', 'country', 'email', 'contact', 'educationQualification', 'designation'];
  dataSource: UserData[] = [];
  nextId: number = 1; // Track next available ID

  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar) { }


  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      fullName: ['', Validators.required],
      gender: ['Male', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      pin: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
      state: ['', Validators.required],
      country: ['USA', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contact: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      educationQualification: ['', Validators.required],
      designation: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      const formData = { id: this.nextId++, ...this.registrationForm.value };
      this.dataSource.push(formData);
      this.registrationForm.reset();
      
      // Display success message
      this._snackBar.open('Record inserted successfully', 'Close', {
        duration: 3000, // Duration in milliseconds
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
