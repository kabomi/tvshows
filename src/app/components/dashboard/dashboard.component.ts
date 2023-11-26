import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [IonGrid, IonRow, IonCol, CommonModule]
})
export class DashboardComponent  implements OnInit {

  constructor() { }

  @Input()
  genres: string[] = [];

  trackByFn: (id: number, name: string) => string = (id, name) => name

  ngOnInit() {
    console.log("Dashboard onInit");
  }

}
