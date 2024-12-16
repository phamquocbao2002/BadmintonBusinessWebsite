import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ContentService } from '../content.service';

@Component({
  selector: 'app-store-points',
  templateUrl: './store-points.component.html',
  styleUrls: ['./store-points.component.css']
})
export class StorePointsComponent {

  constructor(private router: Router, private cs: ContentService) { }

  goToHomePage() {
    this.cs.setContentRouter("/home-page-content");
  }
}
