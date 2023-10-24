import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ApiService } from 'src/app/service/api.service';
import * as moment from 'moment';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.page.html',
  styleUrls: ['./appointment.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AppointmentPage implements OnInit {

  public folder!: string;
  name = "hanniel";
  doctor_id?: any;
  appointment_id?: any;

  segment?: string;

  show_hist?: boolean;
  show_pen?: boolean;
  show_appt?: boolean = true;


  Appointment_hist: any[] = [];
  Notification: any[] = [];
  Pending_Appointment: any[] = [];
  Confirmed_Appointment: any[] = [];
  Patient: any[] = [];
  Comment: string = "";

  private activatedRoute = inject(ActivatedRoute);

  constructor(private api: ApiService) { }

  displaySegment(e: any) {

    if (e.detail.value == "Pending") {
      this.show_appt = false;
      this.show_hist = false;
      this.show_pen = true;
    } else if (e.detail.value == "Confirmed") {
      this.show_appt = true;
      this.show_hist = false;
      this.show_pen = false;
    } else if (e.detail.value == "History") {
      this.show_appt = false;
      this.show_hist = true;
      this.show_pen = false;
    }

  }

  getAppointment(res: any) {
    let id = res
    this.Confirmed_Appointment = [];
    this.Pending_Appointment = [];
    this.api.getdoctorAppointments(res).then(
      (data: any) => {
        this.segment = 'Confirmed';
        this.show_appt = true;
        this.show_hist = false;
        this.show_pen = false;
        for (let appt of data) {

          if (moment(new Date()).isAfter(new Date(appt.appointment_date))) {

            this.api.deletePast_appointment(appt.appointment_id).then(() => {
              this.getAppointment(id);
            })


          }
          if (appt.status == 'Confirmed') {
            this.Confirmed_Appointment.push(appt);
            if (!this.Pending_Appointment) {
              this.show_appt = true;
              this.show_hist = false;
              this.show_pen = false;
              this.segment = 'Confirmed';
            }

          } else if (appt.status == 'Pending') {
            this.show_appt = false;
            this.show_hist = false;
            this.show_pen = true;
            this.segment = 'Pending';
            this.Pending_Appointment.push(appt);

          }
        }
      }
    );
  }

  Save() {
    console.log(this.Comment, this.appointment_id)
    this.api.updateComment(this.appointment_id, this.Comment).then(() => { this.getAppointment(this.doctor_id); this.history(this.doctor_id); })
  }

  Completed(ev: any) {
    this.api.updateStatus(ev).then(() => { this.getAppointment(this.doctor_id); this.history(this.doctor_id); })
  }

  conf_ID(ev: any) {
    this.api.confirmAppointment(ev).then(() => { this.getAppointment(this.doctor_id); })
  }

  del_ID(ev: any) {
    this.api.deletePast_appointment(ev).then(() => { this.getAppointment(this.doctor_id); })
  }

  setDay(e: any) {
    return String(new Date(String(e))).substring(0, 3)
  }

  updateStatus(ev: any) {
    this.api.updateStatus(ev).then(() => { })
  }

  selectedID(ev: any, re: any, st: any) {
    this.appointment_id = ev;
    this.Comment = re;
    if ('Pending' == st) {
      this.Patient = this.Pending_Appointment.filter(e => e.appointment_id == ev);
    } else if ('Confirmed' == st) {
      this.Patient = this.Confirmed_Appointment.filter(e => e.appointment_id == ev);
    }
  }

  statusColor(e: any) {

    if (e == 'Pending') {
      return 'orange';
    } else if (e == 'Confirmed') {
      return '#1aff1a'
    } else if (e == 'Completed') {
      return 'green'
    }
    else {
      return 'red'
    }
  }

  public clearHistory = [
    {
      text: 'NO',
      role: 'cancel',
      handler: () => {
      },
    },
    {
      text: 'YES',
      role: 'confirm',
      handler: () => {
        this.deleteHistory()
      },
    },
  ];

  getDoctors_details(ev: any) {
    this.api.getsingledoctor(ev).then(
      (data) => {
        this.doctor_id = data[0].doctor_id;
        this.history(data[0].doctor_id);
        this.getAppointment(data[0].doctor_id);
      }
    )
  }

  deleteHistory() {
    // this.api.deleteHistory(this.patient_id).then(() => { this.getHistory(this.patient_id) })
    // this.getHistory(this.patient_id);
  }

  history(ev: any) {
    this.api.getDoctorappointment_hist(ev).then((data: any) => { this.Appointment_hist = data; })
  }
  deleteAppointment(res: any) {
    this.api.deleteAppointment(res).then(() => { this.getAppointment(this.doctor_id) })
  }

  ngOnInit() {
    this.getDoctors_details(localStorage.getItem('id'));
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }
}