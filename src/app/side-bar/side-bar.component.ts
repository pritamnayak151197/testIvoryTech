import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  constructor(    private router: Router) { }

  ngOnInit(): void {
  }

  collapsed = false;
  
  toggleCollapse() {
    this.collapsed = !this.collapsed;
  }

  logout() {

    localStorage.removeItem('my_app_token'); // Or sessionStorage.removeItem('my_app_token')

    this.router.navigate(['Login']);
  }

}
