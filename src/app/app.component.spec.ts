import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { StringCalculatorService } from './string-calculator.service'
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';

describe('AppComponent', () => {

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let stringCalculatorService: StringCalculatorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppComponent ],
      imports: [ FormsModule ],
      providers: [ StringCalculatorService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    stringCalculatorService = TestBed.inject(StringCalculatorService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return 0 for an empty string', () => {
    component.inputString = '';
    component.calculate();
    expect(component.result).toBe(0);
  });

  it('should return 1 for "1"', () => {
    component.inputString = '1';
    component.calculate();
    expect(component.result).toBe(1);
  });

  it('should return 6 for "1,5"', () => {
    component.inputString = '1,5';
    component.calculate();
    expect(component.result).toBe(6);
  });

  it('should handle new lines between numbers', () => {
    component.inputString = '1\n2,3';
    component.calculate();
    expect(component.result).toBe(6);
  });

  it('should support different delimiters', () => {
    component.inputString = '//;\n1;2';
    component.calculate();
    expect(component.result).toBe(3);
  });

  it('should throw an exception for negative numbers', () => {
    component.inputString = '1,-2,3,-4';
    component.calculate();
    expect(component.result).toBe('negative numbers not allowed -2,-4');
  });

  it('should update the result in the template', () => {
    component.inputString = '1,2,3';
    component.calculate();
    fixture.detectChanges();
    const resultElement = fixture.debugElement.query(By.css('div')).nativeElement;
    expect(resultElement.textContent).toContain('6');
  });

  it('should call the add method of the StringCalculatorService', () => {
    const spy = spyOn(stringCalculatorService, 'add').and.callThrough();
    component.inputString = '1,2,3';
    component.calculate();
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith('1,2,3');
  });
});