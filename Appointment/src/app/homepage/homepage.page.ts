import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, IonicModule } from '@ionic/angular';
import { ApiService } from 'src/app/service/api.service';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink, RouterLinkActive,],
})
export class HomepagePage implements OnInit {

  constructor(public popoverController: PopoverController,
    public api: ApiService,
    public route: ActivatedRoute,
    public alertCtrl: AlertController,) { }
    
  public folder!: string;
  name = "hanniel";

  services: any[] = [];
  doctors: any[] = [];
  Doc_results: any[] = [];
  doctor: any[] = [];


  handleInput_D(event: any) {
    this.Doc_results = [...this.doctors]
    const query = event.target.value.toLowerCase();
    console.log(query);
    this.Doc_results = this.doctors.filter(function (record) {
      return record.doctor_name.toLowerCase().indexOf(query) > -1;
    });
  }

  handleRefresh(event: any) {
    this.getDoctors();
    this.getServices();
    setTimeout(() => { event.target.complete(); }, 100);
  };

  getServices() {
    this.api.getServices().then((res: any) => { this.services = res });
  }
  getDoctors() {
    this.api.getDoctors().then((res: any) => { this.doctors = res; console.log(this.doctors) })
  }
  ngOnInit() {
    this.getServices();
    this.getDoctors();
    this.folder = this.route.snapshot.paramMap.get('id') as string;
  }
}