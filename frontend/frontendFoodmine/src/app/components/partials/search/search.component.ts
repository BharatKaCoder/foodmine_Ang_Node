import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  searchTerm:string = '';

  constructor(_activatedRoute:ActivatedRoute, private _router:Router) {
    _activatedRoute.params.subscribe((params)=>{

    })

  }
}
