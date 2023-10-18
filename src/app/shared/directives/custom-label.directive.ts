import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[customLabel]',
})
export class CustomLabelDirective implements OnInit {
  private htmlElement?: ElementRef<HTMLElement>;
  private _color: string = 'red';
  private _errors?: ValidationErrors | null;

  @Input() set color(value: string) {
    this._color = value;
    this.setStyle();
  }

  @Input() set errors(value: ValidationErrors | null | undefined) {
    this._errors = value;
    this.setErrorMessage();
  }

  constructor(private el: ElementRef<HTMLElement>) {
    this.htmlElement = el;

    // this.htmlElement.nativeElement.innerHTML = 'hoLA ANGEL';
  }

  ngOnInit(): void {
    console.log('OnInit - Directiva Custom Label');
    this.setStyle();
  }

  setStyle(): void {
    if (!this.htmlElement) return;

    this.htmlElement!.nativeElement.style.color = this._color;
  }

  setErrorMessage(): void {
    if (!this.htmlElement) return;
    if (!this._errors) {
      this.htmlElement.nativeElement.innerHTML = 'No hay errores.';
      return;
    }

    const errors = Object.keys(this._errors);

    if (errors.includes('required')) {
      this.htmlElement.nativeElement.innerHTML = 'Este campo es requerido.';
      return;
    }

    if (errors.includes('minlength')) {
      const length = this._errors['minlength'];

      this.htmlElement.nativeElement.innerHTML =
        'Se necesitan al menos ' +
        length['requiredLength'] +
        ' caracteres, ha ingresado ' +
        length['actualLength'];
      return;
    }

    if (errors.includes('email')) {
      this.htmlElement.nativeElement.innerHTML =
        'El dato ingresado no tiene formato de email.';
      return;
    }
  }
}
