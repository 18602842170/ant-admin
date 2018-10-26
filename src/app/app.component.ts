import { Component, ErrorHandler } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  constructor(
    private errorHandler: ErrorHandler
  ) {
    // this.errorHandler.handleError('app work');
  }
}
