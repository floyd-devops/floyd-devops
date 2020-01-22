import { Component } from '@angular/core';
import { convertDate } from '@floyd-devops/common';

@Component({
  selector: 'floyd-devops-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'playground';
  constructor() {
    this.title = convertDate(1);
  }
}
