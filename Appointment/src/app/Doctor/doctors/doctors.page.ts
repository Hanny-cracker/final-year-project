import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.page.html',
  styleUrls: ['./doctors.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,]
})
export class DoctorsPage implements OnInit {

  public folder!: string;
  edit?: boolean;
  name = "hanniel";
  time_slot: any[] = [];
  doctor_id?: any;
  private activatedRoute = inject(ActivatedRoute);
  constructor(public api: ApiService) { }

  time_slots: any[] = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:30"];
  getSchedule(ev: any) {
    this.api.getsingledoctor(ev).then(
      (data) => {
        this.doctor_id = data[0].doctor_id;
        this.api.getSchedule(data[0].doctor_id).then(
          (res: any) => {
            this.time_slot = []
            for (let tm of res) {
              this.time_slot.push(tm.time)
              this.time_slot.sort()
            }
          });
      })
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
    this.api.updateSchedule(this.doctor_id, this.time_slot).then(
      data => {
        console.log(data)
      }
    )
  }

  modify() {
    this.edit = true
  }

  ngOnInit() {
    this.getSchedule(localStorage.getItem('id'));
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }

}
