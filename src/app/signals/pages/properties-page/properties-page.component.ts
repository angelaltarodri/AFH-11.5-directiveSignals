import {
  Component,
  OnDestroy,
  OnInit,
  computed,
  effect,
  signal,
} from '@angular/core';
import { User } from '../../interfaces/user-request.interface';

@Component({
  selector: 'app-properties-page',
  templateUrl: './properties-page.component.html',
  styleUrls: ['./properties-page.component.scss'],
})
export class PropertiesPageComponent implements OnDestroy, OnInit {
  public counter = signal(10);

  public user = signal<User>({
    id: 2,
    email: 'janet.weaver@reqres.in',
    first_name: 'Janet',
    last_name: 'Weaver',
    avatar: 'https://reqres.in/img/faces/2-image.jpg',
  });

  public fullName = computed(
    () => `${this.user().first_name} ${this.user().last_name}`
  );

  public userChangedEffect = effect(() => {
    // console.log('userChangedEffect triggered');
    console.log(`${this.user().first_name} - ${this.counter()}`);
  });

  ngOnDestroy(): void {
    // this.userChangedEffect.destroy();
  }

  ngOnInit(): void {
    setInterval(() => {
      this.counter.update((current) => current + 1);
    }, 1000);
  }

  increaseBy(value: number) {
    this.counter.update((current) => current + value);
  }

  onFieldUpdated(field: keyof User, value: string) {
    // console.log({ field, value });
    // this.user.set({
    //   ...this.user(),
    //   [field]: value
    // })
    this.user.mutate((current) => {
      // current.first_name = 'Hola mundo';
      switch (field) {
        case 'email':
          current.email = value;
          break;

        case 'first_name':
          current.first_name = value;
          break;

        case 'last_name':
          current.last_name = value;
          break;

        case 'id':
          current.id = Number(value);
          break;
      }
    });
  }
}
