import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ContentService } from '../content.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  constructor(private router: Router, private contentService: ContentService) {}

  goToHomePage() {
    this.contentService.setContentRouter("/home-page-content");
  }
}
