import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import * as moment from 'moment';
import { ApiService } from 'src/app/service/api.service';
@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.page.html',
  styleUrls: ['./appointments.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})

export class AppointmentsPage implements OnInit {
  segment?: string;
  Comment: string = "";
  name = "hanniel";

  appointment_id?: any;

  show_hist?: boolean;
  show_pen?: boolean;
  show_appt?: boolean = true;


  Appointment_hist: any[] = [];
  Notification: any[] = [];
  Pending_Appointment: any[] = [];
  Confirmed_Appointment: any[] = [];
  Hist_results: any[] = [];
  Con_results: any[] = [];
  Pat_results: any[] = [];
  Patient: any[] = [];

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

  getAppointment() {
    this.Confirmed_Appointment = [];
    this.Pending_Appointment = [];
    this.api.getallAppointment().then(
      (data: any) => {
        console.log(data)
        this.segment = 'Confirmed';
        this.show_appt = true;
        this.show_hist = false;
        this.show_pen = false;
        for (let appt of data) {
          if (moment(new Date()).isAfter(new Date(appt.appointment_date))) {
            this.api.deletePast_appointment(appt.appointment_id).then(() => {
              this.getAppointment();
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
        this.Pat_results = this.Pending_Appointment;
        this.Con_results = this.Confirmed_Appointment;
      }
    );
  }

  handleInput_P(event: any) {
    this.Pat_results = [...this.Pending_Appointment]
    const query = event.target.value.toLowerCase();
    console.log(query);
    this.Pat_results = this.Pending_Appointment.filter(function (record) {
      return record.patient_first_name.toLowerCase().indexOf(query) > -1;
    });
  }

  handleInput_C(event: any) {
    this.Con_results = [...this.Confirmed_Appointment]
    const query = event.target.value.toLowerCase();
    console.log(query);
    this.Con_results = this.Confirmed_Appointment.filter(function (record) {
      return record.patient_first_name.toLowerCase().indexOf(query) > -1;
    });
  }

  handleInput_H(event: any) {
    this.Hist_results = [...this.Appointment_hist]
    const query = event.target.value.toLowerCase();
    console.log(query);
    this.Hist_results = this.Appointment_hist.filter(function (record) {
      return record.patient_first_name.toLowerCase().indexOf(query) > -1;
    });
  }
  Save() {
    console.log(this.Comment, this.appointment_id)
    this.api.updateComment(this.appointment_id, this.Comment).then(() => { this.getAppointment(); this.history(); })
  }

  Completed(ev: any) {
    this.api.updateStatus(ev).then(() => { this.getAppointment(); this.history(); })
  }

  conf_ID(ev: any) {
    this.api.confirmAppointment(ev).then(() => { this.getAppointment(); })
  }

  del_ID(ev: any) {
    this.api.deletePast_appointment(ev).then(() => { this.getAppointment(); })
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

  deleteHistory() {

  }

  history() {
    this.api.getallhistory().then((data: any) => { this.Appointment_hist = data; this.Hist_results = data })
  }

  deleteAppointment(res: any) {
    this.api.deleteAppointment(res).then(() => { this.getAppointment() })
  }

  ngOnInit() {
    this.getAppointment();
    this.history()
  }
}