
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContentService } from './content.service'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  contentRouter!: string; 

  constructor(private contentService: ContentService, private router: Router) {}

  ngOnInit() {
    const storedRouter = sessionStorage.getItem('contentRouter');
    this.contentRouter = storedRouter ? storedRouter : '/home-page-content';
    this.updateMainContentSection();
    this.contentService.contentRouter$.subscribe(router => {
      this.contentRouter = router;
      this.updateMainContentSection();
    });
  }

  updateMainContentSection() {
    this.router.navigate([this.contentRouter]);
  }
}
