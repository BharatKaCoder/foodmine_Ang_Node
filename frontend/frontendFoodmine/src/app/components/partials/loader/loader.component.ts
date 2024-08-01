import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { CommanService } from '../../../services/comman.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css'
})
export class LoaderComponent {
  isLoading!:boolean;

  constructor(private _commonSerice:CommanService) {

  }
  ngOnInit():void {
    this._commonSerice.isLoading.subscribe((loader:any)=>{
      this.isLoading = loader;
    });
  }
}
