import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, ViewEncapsulation, inject } from '@angular/core';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css',
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class SpinnerComponent {
  loaderService = inject(LoaderService);
}
