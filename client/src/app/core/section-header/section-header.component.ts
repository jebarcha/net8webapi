import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  BreadcrumbComponent,
  BreadcrumbItemDirective,
  BreadcrumbService,
} from 'xng-breadcrumb';

@Component({
  selector: 'section-header',
  standalone: true,
  imports: [CommonModule, BreadcrumbComponent, BreadcrumbItemDirective],
  templateUrl: './section-header.component.html',
  styleUrl: './section-header.component.scss',
})
export class SectionHeaderComponent {
  bcService = inject(BreadcrumbService);

  constructor() {}
}
