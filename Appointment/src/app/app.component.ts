import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ApiService } from './service/api.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, RouterLink, RouterLinkActive, CommonModule],
})
export class AppComponent implements OnInit {

  public Patients = [
    { title: 'Home', url: 'Patient/patient/Home', icon: 'home' },
    { title: 'Search Doctor ', url: 'search', icon: 'search' },
    { title: 'Appointment', url: '/Patient/appointment', icon: 'calendar' },
    { title: 'Notification', url: '/Patient/notification/Notification', icon: 'notifications' },
    { title: 'Profile', url: '/Patient/profile/Profile', icon: 'person' },
  ];
  public Doctors = [
    { title: 'Doctor Schedule', url: '/Doctor/doctors/Home', icon: 'timer-outline' },
    { title: 'Appointments', url: '/Doctor/appointment/Appointment', icon: 'calendar' },
    { title: 'Notification', url: '/Doctor/notification/Notification', icon: 'notifications' },
    { title: 'Profile', url: 'Doctor/profile/Profile', icon: 'person' },
  ];
  public Admins = [
    { title: 'dashboard', url: '/Admin/admin/Dashboard', icon: 'home' },
    { title: 'Appointment', url: '/Admin/appointments/Appointments', icon: 'calendar' },
    { title: 'Profile', url: '/Admin/profile/profile', icon: 'person' },
  ];

  public homepage = [
    { title: 'Home', url: 'homepage', icon: 'home' },
    { title: 'Search Doctor', url: 'search', icon: 'search' },
  ]

  name = "hanniel";
  Patient?: boolean;
  Admin?: boolean;
  Doctor?: boolean;
  sign_in?: boolean = true;
  Homepage?: boolean;
  constructor(public api: ApiService, public route: Router) { }


  public Check(user: any) {

    if (user != null) {
      if (user == "patient") {
        this.Admin = false;
        this.Doctor = false;
        this.Patient = true;
        this.sign_in = false;
      } else if (user == "doctor") {
        this.Patient = false;
        this.Admin = false;
        this.Doctor = true;
        this.sign_in = false;
      } else if (user == "admin") {
        this.Doctor = false;
        this.Patient = false;
        this.Admin = true;
        this.sign_in = false;
      }
    }
    else {
      this.Doctor = false;
      this.Patient = false;
      this.Admin = false;
      this.sign_in = true;
    }

  }
  ngOnInit(): void {
    this.Check(localStorage.getItem('token'))
  }
}
