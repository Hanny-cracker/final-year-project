import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,FormControl,FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ApiService } from 'src/app/service/api.service';
import { doctor_details } from 'src/app/interface';
import { error } from 'console';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,ReactiveFormsModule]
})
export class AdminPage implements OnInit {

  name = "hanniel";
  segment = 'Dashboard';
  Comment: string = "";

  Patients: any[] = [];
  Doctors: any[] = [];
  Doctor: any[] = [];
  Services: any[] = [];
  time_slot: any[] = [];
  Doc_results: any[] = [];
  Pat_results: any[] = [];

  show_dash?: boolean = true;
  show_doc?: boolean;
  show_pat?: boolean;
  edit?: boolean;
  editMode: boolean = false;

  constructor(private api: ApiService) { }

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
  time_slots: any[] = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:30"];

  newDoctor = new FormGroup({
    pwd :  new FormControl('', [Validators.required]),
    service_id:  new FormControl('', [Validators.required]),
    doctor_email_address:  new FormControl('', [Validators.required]),
    doctor_name:  new FormControl('', [Validators.required]),
    doctor_phone_no:  new FormControl('', [Validators.required]),
    doctor_address:  new FormControl('', [Validators.required]),
    doctor_date_of_birth:  new FormControl('', [Validators.required]),
    doctor_degree:  new FormControl('', [Validators.required]),
    doctor_expert_in:  new FormControl('', [Validators.required]),
  });

  isAlertOpen = false;
  public alertButtons = ['OK'];

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }

  check_email(){
    this.api.check_email(this.newDoctor.value.doctor_email_address).then(
      (data)=>{
        if(data.length > 0){
          this.setOpen(true);
        }else{
          this.createDoct();
        }
      }
    )
  }

  createDoct(){
    this.api.registerUser(this.newDoctor.value.doctor_email_address,this.newDoctor.value.pwd,'doctor').then(
      (data)=>{
        let doctor = {
          user_id: data[0].user_id,
          service_provided: this.newDoctor.value.service_id,
          doctor_email_address: this.newDoctor.value.doctor_email_address,
          doctor_name: this.newDoctor.value.doctor_name,
          doctor_phone_no: this.newDoctor.value.doctor_phone_no,
          doctor_address: this.newDoctor.value.doctor_address,
          doctor_date_of_birth:String(this.newDoctor.value.doctor_date_of_birth),
          doctor_degree: this.newDoctor.value.doctor_degree,
          doctor_expert_in: this.newDoctor.value.doctor_expert_in,
        }
        this.api.registerDoctor(doctor)
        this.getDoctors();
      },error=>{
      }
    )
  }

  Doct(ev: any) {
    this.doctor_datials = {
      user_id: ev.user_id,
      service_provided: ev.service_id,
      doctor_email_address: ev.doctor_email_address,
      doctor_name: ev.doctor_name,
      doctor_phone_no: ev.doctor_phone_no,
      doctor_address: ev.doctor_address,
      doctor_date_of_birth: ev.doctor_date_of_birth,
      doctor_degree: ev.doctor_degree,
      doctor_expert_in: ev.doctor_expert_in,
      doctor_added_on: ev.doctor_added_on,
    }
    this.getSchedule(ev.doctor_id)
  }

  handleInput_D(event: any) {
    this.Doc_results = this.Doctors
    const query = event.target.value.toLowerCase();
    this.Doc_results = this.Doctors.filter(function (record) {
      return record.doctor_name.toLowerCase().indexOf(query) > -1;
    });
  }

  handleInput_P(event: any) {
    this.Pat_results = [...this.Patients]
    const query = event.target.value.toLowerCase();
    console.log(query);
    this.Pat_results = this.Patients.filter(function (record) {
      return record.patient_first_name.toLowerCase().indexOf(query) > -1;
    });
  }

  displaySegment(e: any) {
    if (e.detail.value == "Dashboard") {
      this.show_dash = true;
      this.show_doc = false;
      this.show_pat = false;
      this.segment = 'Dashboard';
    } else if (e.detail.value == "Doctor") {
      this.show_dash = false;
      this.show_doc = true;
      this.show_pat = false;
      this.segment = 'Doctor';
    } else if (e.detail.value == "Patient") {
      this.show_dash = false;
      this.show_doc = false;
      this.show_pat = true;
      this.segment = 'Patient';
    }
  }

  getDoctors() {
    this.api.getDoctors().then(
      (data) => {
        this.Doctors = data;
        this.Doc_results = this.Doctors;
        console.log(this.Doctors)
        // this.Doc_results = [...this.Doctors];
      }
    )
  }

  deleteUser(ev: any) {
    this.api.deleteUSer(ev)
    this.getDoctors();
  }

  deleteService(ev: any) {
    this.api.deleteService(ev)
    this.getServices();
  }

  getPatient() {
    this.api.getPatient().then(
      (data) => {
        this.Patients = data;
        this.Pat_results = data;
      }
    )
  }

  getServices() {
    this.api.getServices().then(
      (data) => {
        this.Services = data;
      }
    )
  }

  my_time(ev: any) {
    let value: any = null;
    value = this.time_slot.indexOf(ev);
    if (value >= 0) {
      this.time_slot.splice(value, 1);
    }
    else {
      this.time_slot.push(ev);
    }
  }


  save() {
    this.edit = false;
    this.time_slot.sort();
    this.api.getsingledoctor(this.doctor_datials.user_id).then(
      (data) => {
        this.api.updateSchedule(data[0].doctor_id, this.time_slot)
      }
    );    
  }

  Save() {
    this.api.updateDoctor(this.doctor_datials).then(
      () => {
        this.getDoctors();
      }
    );
  }
  
  modify() {
    this.edit = true
  }

  setDay(e: any) {
    return String(new Date(String(e))).substring(0, 3)
  }

  getSchedule(ev: any) {
    this.api.getSchedule(ev).then(
      (res: any) => {
        this.time_slot = []
        for (let tm of res) {
          this.time_slot.push(tm.time)
          this.time_slot.sort()
        }
      }
    );
  }

  ngOnInit() {
    this.getDoctors();
    this.getPatient();
    this.getServices();
  }
}