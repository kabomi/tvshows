import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-tvshow',
  templateUrl: './tvshow.page.html',
  styleUrls: ['./tvshow.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class TvshowPage implements OnInit {
  constructor() {}

  ngOnInit() {
    return;
  }
}
