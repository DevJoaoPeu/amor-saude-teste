import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrimaryInputComponent } from './components/primary-input/primary-input.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'web';
}
