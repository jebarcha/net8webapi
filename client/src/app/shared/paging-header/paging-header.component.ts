import { Component, computed, input } from '@angular/core';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'paging-header',
  standalone: true,
  imports: [PaginationModule],
  templateUrl: './paging-header.component.html',
  styleUrl: './paging-header.component.scss',
})
export class PagingHeaderComponent {
  pageNumber = input<number>(0);
  pageSize = input<number>(0);
  totalCount = input<number>(0);

  headerLabel = computed(
    () =>
      `
      ${(this.pageNumber() - 1) * this.pageSize() + 1} -
      ${
        this.pageNumber() * this.pageSize() > this.totalCount()
          ? this.totalCount()
          : this.pageNumber() * this.pageSize()
      }
    `
  );
}
