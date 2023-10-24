import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, Validators, FormControl } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ApiService } from 'src/app/service/api.service';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, RouterModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class LoginPage implements OnInit {

  register_login: boolean = true;
  check_pwds?: boolean ;
  public folder!: string;
  pwd = '';
  msg = '';
  name = "Welcome";

  private activatedRoute = inject(ActivatedRoute);

  constructor(
    private api: ApiService,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public location: Location,
    public route: Router,
    public app: AppComponent,
  ) { }

  log_in = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  })

  sign_up = new FormGroup({
    email_address: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    date_of_birth: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    phone_no: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
  })

  isAlertOpen = false;
  isAlertOpen_E = false;
  public alertButtons = ['OK'];

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }

  signUp() {
    if (this.register_login == false) {
      this.register_login = true;
    } else {
      this.register_login = false;
    }
  }

  check_email(){
    this.api.check_email(this.sign_up.value.email_address).then(
      (data)=>{
        if(data.length > 0){
          this.setOpen_E(true);
        }else{
          this.register();
        }
      }
    )
  }

  

  setOpen_E(isOpen: boolean) {
    this.isAlertOpen_E = isOpen;
  }

   register() {
    this.api.registerUser(this.sign_up.value.email_address, this.sign_up.value.password, "patient").then(
      (data) => {
        let patient = {
          user_id: data[0].user_id,
          email_address: this.sign_up.value.email_address,
          first_name: this.sign_up.value.first_name,
          last_name: this.sign_up.value.last_name,
          date_of_birth: this.sign_up.value.date_of_birth,
          gender: this.sign_up.value.gender,
          address: this.sign_up.value.address,
          phone_no: String(this.sign_up.value.phone_no),
          patient_marital_status: this.sign_up.value.status
        }
        this.api.registerPatient(patient);
        this.sign_up.reset();
        this.goBack();
      }, error => {
        this.setOpen_E(true)
      }
    )

  }
  goBack(): void {
    this.location.back();
  }
  login() {
    this.api.userLogin(this.log_in.value.email, this.log_in.value.password).then(
      (data) => {
        this.app.Check(data[0].user_status);
        if (data[0].user_status == 'patient') {
          this.route.navigate(['/Patient/patient/Home']);
        } else if (data[0].user_status == 'doctor') {
          this.route.navigate(['/Doctor/doctors/Home']);
        } else if (data[0].user_status == 'admin') {
          this.route.navigate(['/Admin/admin/Dashboard']);
        }

      }, error => {
        this.setOpen(true)
      }
    );
  }

  // get email_login(): any {
  //   return this.log_in.value.email
  // }

  // get pwd_login(): any {
  //   return this.log_in.value.password
  // }


  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
    if (this.folder == 'register') {
      this.register_login = false;
    }
  }

}
