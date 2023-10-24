import { Injectable} from '@angular/core';
import { HttpHeaders} from '@angular/common/http';
import axios from 'axios';
import { appointment, singleAppnt } from '../interface';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public headers: HttpHeaders;
  user?: string;
  id?: any;
  redirectUrl?: string;
  constructor() {

    this.headers = new HttpHeaders();
    this.headers.append("Accept", 'application/json');
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', '*');
    this.headers.append('Access-Control-Allow-Header', '*');
  }

  // i am using the post request because the delete and update request for axios shows me a header error 

  //tokens for login
  async setToken(token: string, id : any) {
    localStorage.setItem('token', token);
    localStorage.setItem('id',id);
  }
  async getToken() {
    return localStorage.getItem('token');
  }
  async getallAppointment(){
    return await axios.get('http://localhost/Myproject-update/Appointment-App_Final-year-project/Backend/getallAppointments.php').then( data => { return data.data }, error => { return error });  
  }

  async getallhistory(){
    return await axios.get('http://localhost/Myproject-update/Appointment-App_Final-year-project/Backend/getallHistory.php').then(data => { return data.data }, error => { return error });  
  }

  async getServices() {
    return await axios.get('http://localhost/Myproject-update/Appointment-App_Final-year-project/Backend/getservices.php').then(Data => { return Data.data }, error => { return error });
  }

  async getDoctors() {
    return await axios.get('http://localhost/Myproject-update/Appointment-App_Final-year-project/Backend/getdoctor.php').then(Data => { return Data.data }, error => { return error });
  }

  async getPatient() {
    return await axios.get('http://localhost/Myproject-update/Appointment-App_Final-year-project/Backend/getpatient.php').then(Data => { return Data.data }, error => { return error });
  }

  async getPatientAppointments(datas: any) {
    let input = { patient_id: datas };
    let data = JSON.stringify(input);
    return await axios.post('http://localhost/Myproject-update/Appointment-App_Final-year-project/Backend/getPat_appntmt.php', data).then(Data => { return Data.data }, error => { return error });
  }

  async getdoctorAppointments(datas: any) {
    let input = { doctor_id: datas };
    let data = JSON.stringify(input);
    return await axios.post('http://localhost/Myproject-update/Appointment-App_Final-year-project/Backend/getDoctors_appointment.php', data).then(Data => { return Data.data }, error => { return error });
  }
  async getDoctorappointment_hist(datas: any) {
    let input = { doctor_id: datas };
    let data = JSON.stringify(input);
    return await axios.post('http://localhost/Myproject-update/Appointment-App_Final-year-project/Backend/getDoctorsappointment_hist.php', data).then(Data => { return Data.data }, error => { return error });
  }

  async getHistory(datas: singleAppnt) {
    let input = { patient_id: datas };
    let data = JSON.stringify(input);
    return await axios.post('http://localhost/Myproject-update/Appointment-App_Final-year-project/Backend/getHistory.php', data).then(Data => { return Data.data }, error => { return error });
  }  
  
  async getsinglepatient(datas: any) {
    let input = { user_id: datas };
    let data = JSON.stringify(input);
    return await axios.post('http://localhost/Myproject-update/Appointment-App_Final-year-project/Backend/getsinglepatient.php', data).then(data => { return data.data }, error => { return error });
  }

  async getsingledoctor(datas: any) {
    let input = { user_id: datas };
    let data = JSON.stringify(input); 
    return await axios.post('http://localhost/Myproject-update/Appointment-App_Final-year-project/Backend/getsingledoctor.php', data).then(data => { return data.data }, error => { return error });
  }

  async getSchedule(datas: any) {
    let input = { doctor_id: datas };
    let data = JSON.stringify(input);
    return await axios.post('http://localhost/Myproject-update/Appointment-App_Final-year-project/Backend/getschedule.php', data).then(data => { return data.data }, error => { return error });
  }

  async getAdmin(datas : any){
     let input = { user_id: datas };
    let data = JSON.stringify(input); 
    return await axios.post('http://localhost/Myproject-update/Appointment-App_Final-year-project/Backend/getAdmin.php', data).then(data => { return data.data }, error => { return error });
  }

  async updateStatus(datas: any) {
    let input = { appointment_id: datas };
    let data = JSON.stringify(input);
    return await axios.post('http://localhost/Myproject-update/Appointment-App_Final-year-project/Backend/updateStatus.php', data).then(data => { return data.data }, error => { return error });
  }

  async updateComment(datas: any, comment: any) {
    let input = { appointment_id: datas, doctor_comment: String(comment) };
    let data = JSON.stringify(input);
    return await axios.post('http://localhost/Myproject-update/Appointment-App_Final-year-project/Backend/updateComment.php', data).then(data => { return data.data }, error => { return error });
  }

  async updatePatient(datas:any){
    let data = JSON.stringify(datas);
    return await axios.post('http://localhost/Myproject-update/Appointment-App_Final-year-project/Backend/updatePatientdata.php', data).then(data => { return data.data }, error => { return error });
  }

  async updateAdmin(datas:any){
    let data = JSON.stringify(datas);
    return await axios.post('http://localhost/Myproject-update/Appointment-App_Final-year-project/Backend/updateAdmin.php', data).then(data => { return data.data }, error => { return error });
  }  

  async updateDoctor(datas:any){
    let data = JSON.stringify(datas);
    return await axios.post('http://localhost/Myproject-update/Appointment-App_Final-year-project/Backend/updateDoctor.php', data).then(data => { return data.data }, error => { return error });
  }

  async updateSchedule(id: any , time:any) {
    let input = { doctor_id: id, time : (time)}
    let data = JSON.stringify(input);   
    console.log(data)
    return await axios.post('http://localhost/Myproject-update/Appointment-App_Final-year-project/Backend/updateSchedule.php', data).then(data => { return data.data }, error => { return error });
  }

  async userLogin(data1: any, data2: any) {
    this.user = ""
    let input = {email: data1, password: data2 };
    let data = JSON.stringify(input);
    return await axios.post('http://localhost/Myproject-update/Appointment-App_Final-year-project/Backend/login.php', data).then(Data => {this.setToken(Data.data[0].user_status,Data.data[0].user_id);
        return Data.data
      }, error => { return error });
  }
  async registerUser(data1: any, data2 : any, data3 : any) {
    let input = {email_address : data1, password  : data2 , status : data3}
    let data = JSON.stringify(input);   
    return await axios.post('http://localhost/Myproject-update/Appointment-App_Final-year-project/Backend/createuser.php', data).then(data => { return data.data }, error => { return error });
  }

  async registerPatient(datas: any) {
    let data = JSON.stringify(datas);
    return await axios.post('http://localhost/Myproject-update/Appointment-App_Final-year-project/Backend/createpatient.php', data).then(data => { return data.data }, error => { return error });
  }

  async registerDoctor(datas: any) {
    let data = JSON.stringify(datas);  
    return await axios.post('http://localhost/Myproject-update/Appointment-App_Final-year-project/Backend/createdoctor.php', data).then(data => { return data.data; }, error => { return error });
  }

  async creatAppointment(datas: appointment) {
    let data = JSON.stringify(datas);
    return await axios.post('http://localhost/Myproject-update/Appointment-App_Final-year-project/Backend/createappointment.php', data).then(data => { return data.data }, error => { return error });
  }

  async confirmAppointment(datas: any) {
    let input = { appointment_id: datas };
    let data = JSON.stringify(input);
    return await axios.post('http://localhost/Myproject-update/Appointment-App_Final-year-project/Backend/confirmAppointment.php', data).then(data => { return data.data }, error => { return error });
  }

  async check_email(datas: any) {
    let input = { email: datas };
    let data = JSON.stringify(input);
    return await axios.post('http://localhost/Myproject-update/Appointment-App_Final-year-project/Backend/check_email.php', data).then(data => { return data.data }, error => { return error });
  }

  async deleteToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
  }

  async deleteService(datas:any){
    let data = JSON.stringify(datas);
    return await axios.post('http://localhost/Myproject-update/Appointment-App_Final-year-project/Backend/deleteservice.php', data).then(data => { return data.data }, error => { return error });  
  }

  async deleteAppointment(datas: any) {
    let input = { appointment_id: datas };
    let data = JSON.stringify(input);
    return await axios.post('http://localhost/Myproject-update/Appointment-App_Final-year-project/Backend/deleteappointment.php', data).then(error => { return error });
  }

  async deletePast_appointment(datas: any) {
    let input = { appointment_id: datas };
    let data = JSON.stringify(input);
    // i am using the psot request because the delete request for axios has a header error 
    return await axios.post('http://localhost/Myproject-update/Appointment-App_Final-year-project/Backend/deletePast_appointment.php', data).then(error => { return error });
  }

  async deleteHistory(datas: any) {
    let input = { patient_id: datas };
    let data = JSON.stringify(input);
    // i am using the psot request because the delete request for axios has a header error 
    return await axios.post('http://localhost/Myproject-update/Appointment-App_Final-year-project/Backend/deletehistory.php', data).then(error => { return error });
  }

  async deleteDocotrsHistory(datas: any) {
    let input = { doctor: datas };
    let data = JSON.stringify(input);
    // i am using the psot request because the delete request for axios has a header error 
    return await axios.post('http://localhost/Myproject-update/Appointment-App_Final-year-project/Backend/deleteDoctors_hist.php', data).then(error => { return error });
  }

  async deleteUSer( datas : any){
    let input = { user_id: datas };
    let data = JSON.stringify(input);
    return await axios.post('http://localhost/Myproject-update/Appointment-App_Final-year-project/Backend/deleteUser.php', data).then(data => { return data.data }, error => { return error });
  }

}