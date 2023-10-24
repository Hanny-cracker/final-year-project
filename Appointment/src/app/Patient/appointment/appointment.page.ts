import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, Validators, FormControl } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ApiService } from 'src/app/service/api.service';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';
import * as moment from 'moment';
import { appointment } from 'src/app/interface';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.page.html',
  styleUrls: ['./appointment.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class AppointmentPage implements OnInit {

  activatedRoute = inject(ActivatedRoute);

  patient_id?: any;
  session_name = "Appointment";
  name = "hanniel";

  doctor?: any[];
  Doctor: any[] = [];
  Service: any[] = [];
  Appointment: any[] = [];
  Appointment_history: any[] = [];
  time_slot: any[] = [];
  scheduled_time_slot: any[] = [];

  public appointment_Time?: string;
  user = "";
  id!: string;
  count: number = 1;
  segment?: string = 'Appointments';
  reason_for_appointment?: string;
  appointment_date?: string;
  service_id?: string;
  doctor_id?: number;
  doctor_schedule_id?: string
  doctor_name?: any;
  color?: string;

  doctors_slot: boolean = true;
  show_time_slot: boolean = true;
  textarea: boolean = false;
  no_booking: boolean = false;
  show_appt?: boolean = true;
  show_hist?: boolean;
  book_appt?: boolean;
  display_available?: boolean;


  appointment: appointment = {
    doctor_id: "1",
    patient_id: "",
    service_id: "",
    reason_for_appointment: "",
    appointment_date: "",
    appointment_time: "",
    status: "",
    doctor_schedule_id: "",
  }

  public clearHistory = [
    {
      text: 'NO',
      role: 'cancel',
      handler: () => {
        // this.handlerMessage = 'Alert canceled';
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

  constructor(private api: ApiService,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public route: Router
  ) { }

  // this is to disable weekends
  isWeekday = (dateString: string) => {
    const date = new Date(dateString);
    const utcDay = date.getUTCDay();
    return utcDay !== 0 && utcDay !== 6;
  }

  form = new FormGroup({
    doctor_id: new FormControl('', [Validators.required]),
    service_id: new FormControl('', [Validators.required]),
    reason_for_appointment: new FormControl('', [Validators.required]),
    appointment_date: new FormControl(this.appointment_date, [Validators.required]),
  })

  handleRefresh(event: any) {
    this.getAppointment(this.patient_id);
    this.getDoctors();
    this.getServices();
    setTimeout(() => { event.target.complete() }, 100);
  };

  async submitAppt() {
    const loading = await this.loadingCtrl.create({ message: 'Creating Appointment...' });
    await loading.present();

    // create a json data using the form data to include the dat in it

    this.appointment = {
      doctor_id: String(this.form.value.doctor_id),
      patient_id: String(this.patient_id),
      service_id: String(this.form.value.service_id),
      reason_for_appointment: String(this.form.value.reason_for_appointment),
      appointment_date: String(this.appointment_date),
      appointment_time: String(this.appointment_Time),
      status: 'Pending',
      doctor_schedule_id: String(this.doctor_schedule_id)
    }

    this.api.creatAppointment(this.appointment).then(
      async () => {
        const toast = await this.alertCtrl.create({ message: 'Appointment created', buttons: ['OK'] });
        await toast.present();
        loading.dismiss();
        this.getAppointment(this.patient_id);
        this.appointment_date = "";
        this.form.reset();
        this.service_id = "";
        this.textarea = true;
        this.appointment_Time = ""; /* this is to reset the appointment time to make th esubmkt button disabled */
        this.doctors_slot = true;
        this.textarea = false; /* this is to disable the time slots after booking */
        this.getHistory(this.patient_id);
      }, error => {
        async () => {
          const alert = await this.alertCtrl.create({ message: 'There is an error Book again', buttons: ['OK'] });
          await alert.present();
        }
      });
  }

  displaySegment(e: any) {

    if (e.detail.value == "Book") {
      this.show_appt = false;
      this.show_hist = false;
      this.book_appt = true;
      this.segment = 'Book';
    } else if (e.detail.value == "Appointments") {
      this.show_appt = true;
      this.show_hist = false;
      this.book_appt = false;
      this.segment = 'Appointments';
    } else if (e.detail.value == "History") {
      this.getHistory(this.patient_id);
      this.show_appt = false;
      this.show_hist = true;
      this.book_appt = false;
      this.segment = 'History';
    }
  }

  book(ev: any) {
    if (ev == 'Book') {
      this.route.navigate(['/Patient/appointment/Book']);
      this.show_appt = false;
      this.show_hist = false;
      this.book_appt = true;
      this.segment = 'Book';
    }
  }

  hideTextarea() {
    this.textarea = false
  }

  showTextarea() {
    this.textarea = true;
  }

  previewReset() {
    this.reset();
  }

  reset() {
    this.service_id = "";
    this.doctors_slot = true;
    this.textarea = false;
    this.appointment_date = "";
    this.appointment_Time = ""; /* this is to reset the appointment time to make th esubmkt button disabled */
    this.form.reset();
  }

  setDay(e: any) {
    return String(new Date(String(e))).substring(0, 3)
  }

  getDate(e: any) {
    let d = (new Date());
    let t = (new Date(e.target.value));
    this.api.getPatientAppointments(this.patient_id).then(
      (data: any) => {

        this.count = 0;
        for (let appt of data) { //this is to get your number of appointment you have in the database
          if (String(appt.appointment_date) == String(e.target.value.substring(0, 10))) {
            this.count += 1;
          }
        }
        if (this.count == 2) { // count is used to store the number of appointment you have on the database
          this.no_booking = true;
          this.show_time_slot = true;
          this.appointment_date = "";
        }
        else {
          this.no_booking = false;
          if (moment(d).isBefore(t)) {  // this is to make sure the user selects a present or future date
            this.show_time_slot = false;
            this.appointment_date = (e.target.value).substring(0, 10);
            this.getDoctorappointment_hist(this.doctor_id);
            this.getSchedule(this.doctor_id);
          } else {
            this.show_time_slot = true;
            this.appointment_date = "";
          }
        }
      });
  }

  getServiceId_for_doctor(ev: any) {
    this.time_slot = [];
    this.service_id = ev.target.value;
    this.getDoctors();
    this.doctor = this.Doctor.filter(e => e.service_id == ev.target.value);
  }

  getDoctorId(ev: any) {
    this.doctor_id = ev.target.value;
    this.doctors_slot = false;
    this.textarea = true;
    this.getDoctorappointment_hist(this.doctor_id);
    this.getSchedule(ev.target.value);
    this.doctor_name = this.Doctor.filter(e => e.doctor_id == ev.target.value);
    this.doctor_name = this.doctor_name[0].doctor_name;
  }

  getDoctorappointment_hist(ev: any) {
    this.api.getdoctorAppointments(ev).then(
      (res: any) => {
        let time_av: any[] = [];
        for (let time of res) {
          if (time.appointment_date == this.appointment_date) {
            time_av.push(time.appointment_time);
          }
        }
        this.scheduled_time_slot = time_av;
      }
    );
  }

  getSchedule(ev: any) {
    this.api.getSchedule(ev).then(
      (res: any) => {
        this.time_slot = []
        for (let tm of res) {
          this.time_slot.push(tm.time)
        }
        this.time_slot.sort();
        this.doctor_schedule_id = res[0].doctor_schedule_id;
      }
    );
    this.doctor_name = this.Doctor.filter(e => e.doctor_id == ev);
    this.doctor_name = this.doctor_name[0].doctor_name;
  }

  compareTime(ev: any) {
    for (let time of this.scheduled_time_slot) {
      if (time.substring(0, 5) == ev) {
        return '#df3442';
      }
    } return '#3ba042';
  }

  getTime(e: any) {
    for (let time of this.scheduled_time_slot) {
      if (time.substring(0, 5) == e) {
        this.display_available = true;
        break
      } else {
        this.display_available = false;
      }
    }
    this.appointment_Time = String(e);
  }

  getServices() {
    this.api.getServices().then((res: any) => { this.Service = res })
  }

  getDoctors() {
    this.api.getDoctors().then((res: any) => { this.Doctor = res });
  }

  getAppointment(res: any) {

    this.api.getPatientAppointments(res).then(
      (data: any) => {
        for (let appt of data) {

          if (moment(new Date()).isAfter(new Date(appt.appointment_date))) {

            this.api.deletePast_appointment(appt.appointment_id).then(() => {
            })
          }
        }
        this.Appointment = data;
      }
    );
  }

  deleteAppointment(res: any) {
    this.api.deleteAppointment(res).then(() => { this.getAppointment(this.patient_id) })
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

  // this is for the history
  getHistory(res: any) {
    this.api.getHistory(res).then((data: any) => { this.Appointment_history = data });
  }

  deleteHistory() {
    this.api.deleteHistory(this.patient_id).then(() => { this.getHistory(this.patient_id) })
    this.getHistory(this.patient_id);
  }

  getPatient_ID(ev: any) {
    this.api.getsinglepatient(ev).then(
      (data) => {
        this.patient_id = data[0].patient_id
        console.log(data[0].patient_id)
        this.getHistory(data[0].patient_id);
        this.getAppointment(data[0].patient_id);
      }
    )
  }

  ngOnInit() {
    this.getPatient_ID(localStorage.getItem('id'))
    this.id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.book(this.id);
    this.getDoctors();
    this.getServices();

  }
}