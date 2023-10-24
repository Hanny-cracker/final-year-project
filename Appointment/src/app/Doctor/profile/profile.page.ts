import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AppComponent } from 'src/app/app.component';
import { ApiService } from 'src/app/service/api.service';
import { doctor_details } from 'src/app/interface';


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
  private activatedRoute = inject(ActivatedRoute);

  constructor(public api: ApiService, public route: Router, public app: AppComponent) { }

  doctor_datials: doctor_details = {
    user_id: "",
    service_provided: "",
    doctor_email_address: "",
    doctor_name: "",
    doctor_phone_no: "",
    doctor_address: "",
    doctor_date_of_birth: "",
    doctor_degree: "",
    doctor_expert_in: "",
    doctor_added_on: "",
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
    this.api.deleteUSer(this.doctor_datials.user_id).then(
      () => {
        this.api.deleteToken().then(
          () => {
            this.route.navigate(['homepage']);
            this.app.Check(localStorage.getItem('token'));
          }
        )
      })
  }

  edit() {
    this.editMode = true;
  }

  save() {
    this.editMode = false;
    this.api.updateDoctor(this.doctor_datials);
  }

  getDoctor(ev: any) {
    this.api.getsingledoctor(ev).then(
      (data) => {
        this.doctor_datials = {
          user_id: data[0].user_id,
          service_provided: data[0].service_name,
          doctor_email_address: data[0].doctor_email_address,
          doctor_name: data[0].doctor_name,
          doctor_phone_no: data[0].doctor_phone_no,
          doctor_address: data[0].doctor_address,
          doctor_date_of_birth: data[0].doctor_date_of_birth,
          doctor_degree: data[0].doctor_degree,
          doctor_expert_in: data[0].doctor_expert_in,
          doctor_added_on: data[0].doctor_added_on,
        }
      })
  }

  color(ev: any) {
    if (ev == 'Active') {
      return 'success';
    }
    return 'danger';
  }

  ngOnInit() {
    this.getDoctor(localStorage.getItem('id'));
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }

}