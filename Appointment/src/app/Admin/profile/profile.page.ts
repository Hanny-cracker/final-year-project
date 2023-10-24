import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { admin_details } from 'src/app/interface';
import { ApiService } from 'src/app/service/api.service';
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
  private activatedRoute = inject(ActivatedRoute);
  constructor(public api: ApiService, public route: Router, public app: AppComponent) { }

  admin_details: admin_details = {
    user_id: "",
    admin_name: "",
    hospital_name: "",
    hospital_email: "",
    hospital_address: "",
    hospital_contact_no: "",
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
    this.api.deleteUSer(this.admin_details.user_id).then(
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

  edit() {
    this.editMode = true;
  }
  
  save() {
    this.editMode = false;
    //  console.log(this.admin_details);
    this.api.updateAdmin(this.admin_details);
  }

  getAdmin(ev: any) {
    this.api.getAdmin(ev).then(
      (data) => {
        this.admin_details = {

          user_id: data[0].user_id,
          hospital_email: data[0].hospital_email,
          admin_name: data[0].admin_name,
          hospital_name: data[0].hospital_name,
          hospital_address: data[0].hospital_address,
          hospital_contact_no: data[0].hospital_contact_no
        }
      }
    )
  }

  color(ev: any) {
    if (ev == 'Active') {
      return 'success';
    }
    return 'danger';
  }

  ngOnInit() {
    this.getAdmin(localStorage.getItem('id'));
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }

}
