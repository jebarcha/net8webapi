import { Component, input, output } from '@angular/core';
//import { PagingHeaderComponent } from '@shared/paging-header/paging-header.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'pager',
  standalone: true,
  imports: [PaginationModule],
  templateUrl: './pager.component.html',
  styleUrl: './pager.component.scss',
})
export class PagerComponent {
  totalCount = input<number>(0);
  pageSize = input<number>(0);
  pageChanged = output<number>();

  onPagerChanged(event: any) {
    this.pageChanged.emit(event.page);
  }
}
