import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class SearchPage implements OnInit {
  folder = '';
  services: any[] = [];
  doctors: any[] = [];
  Doc_results: any[] = [];
  constructor(public api: ApiService,private route :Router ) { }

  ngOnInit() {
    this.getServices();
    this.getDoctors();
  }

  login(){
    this.route.navigate(['/login/sign-in']);
  }

  sign_up(){
    this.route.navigate(['/login/register']);
  }

  getServices() {
    this.api.getServices().then((res: any) => { this.services = res });
  }
  getDoctors() {
    this.api.getDoctors().then((res: any) => { this.doctors = res; console.log(this.doctors) })
  }
  handleInput_D(event: any) {
    this.Doc_results = [...this.doctors]
    console.log(event)
    const query = event.target.value.toLowerCase();
    if (event.target.value == '') {
      this.Doc_results = []
    } else {
      this.Doc_results = this.doctors.filter(function (record) {
        return record.doctor_name.toLowerCase().indexOf(query) > -1;
      });
    }

  }
}
