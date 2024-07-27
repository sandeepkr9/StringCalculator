import { Component } from '@angular/core';
import { StringCalculatorService } from './string-calculator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  inputString: string = '';
  result: number | string = '';

  constructor(private stringCalculatorService: StringCalculatorService) { }

  calculate(): void {
    try {
      this.result = this.stringCalculatorService.add(this.inputString);
    } catch (e: any) {
      this.result = e.message;
    }
  }

}
