import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  searchTerm:string = '';

  constructor(_activatedRoute:ActivatedRoute, private _router:Router) {
    _activatedRoute.params.subscribe((params)=>{
      if (params['searchTerm']) {
        this.searchTerm = params['searchTerm'];
      }
    });
  }

  onSearch(searchTerm:any) {
    if (searchTerm) {
      this._router.navigate(['/search', searchTerm])
    }
  }
}
