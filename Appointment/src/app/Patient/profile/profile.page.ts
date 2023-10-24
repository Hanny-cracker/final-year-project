import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ApiService } from 'src/app/service/api.service';
import { AppointmentPage } from '../appointment/appointment.page';
import { patient_details } from 'src/app/interface';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ProfilePage implements OnInit {

  editMode: boolean = false;
  public folder!: string;
  name = "hanniel";
  patient_details: patient_details = {
    user_id: "",
    patient_email_address: "",
    patient_first_name: "",
    patient_last_name: "",
    patient_date_of_birth: "",
    patient_gender: "",
    patient_address: "",
    patient_phone_no: "",
    patient_marital_status: "",
    patient_added_on: ""
  };

  private activatedRoute = inject(ActivatedRoute);
  constructor(public api: ApiService, public route: Router, public app: AppComponent) { }

  edit() {
    this.editMode = true;
  }
  save() {
    this.editMode = false;
    this.api.updatePatient(this.patient_details);
  }

  logOut() {
    this.api.deleteToken().then(
      () => {
        this.route.navigate(['homepage']);
        this.app.Check(localStorage.getItem('token'))
      }
    )
  }

  deleteUser() {
    this.api.deleteUSer(this.patient_details.user_id).then(
      () => {
        this.api.deleteToken().then(
          () => {
            this.route.navigate(['homepage']);
            this.app.Check(localStorage.getItem('token'));
          }
        )
      }
    )
  }

  getPatient(ev: any) {
    this.api.getsinglepatient(ev).then(
      (data) => {
        this.patient_details = {
          user_id: data[0].user_id,
          patient_email_address: data[0].patient_email_address,
          patient_last_name: data[0].patient_last_name,
          patient_first_name: data[0].patient_first_name,
          patient_gender: data[0].patient_gender,
          patient_address: data[0].patient_address,
          patient_phone_no: data[0].patient_phone_no,
          patient_date_of_birth: data[0].patient_date_of_birth,
          patient_marital_status: data[0].patient_marital_status,
          patient_added_on: data[0].patient_added_on
        };
      }
    )
  }

  ngOnInit() {
    this.getPatient(localStorage.getItem('id'));
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }

}
