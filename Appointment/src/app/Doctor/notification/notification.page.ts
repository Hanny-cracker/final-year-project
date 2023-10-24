import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ApiService } from 'src/app/service/api.service';
import * as moment from 'moment';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class NotificationPage implements OnInit {

  Appointment: any[] = [];
  public doctor_id = '1';

  constructor(private api: ApiService) { }

  getNotification(res: any) {
    this.Appointment = [];
    this.api.getsingledoctor(res).then(
      (data) => {
        this.api.getdoctorAppointments(data[0].doctor_id).then((data: any) => {
          for (let d of data) {
            if (moment(new Date()).add(2, 'day').isAfter(new Date(d.appointment_date))) {
              this.Appointment.push(d);
            }
          }
        });
      })
  }

  setDay(e: any) {
    return String(new Date(String(e))).substring(0, 3)
  }

  statusColor(e: any) {
    if (e == 'Pending') {
      return 'orange';
    } else if (e == 'Confirmed') {
      return 'green'
    } else {
      return 'red'
    }
  }

  ngOnInit() {
    this.getNotification(localStorage.getItem('id'));
  }

}
