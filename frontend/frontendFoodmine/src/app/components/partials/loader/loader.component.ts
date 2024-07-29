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
  isShowLoader:boolean = false;

  constructor(private _commonSerice:CommanService) {

  }
  ngOnInit():void {
    this._commonSerice.loaderObservable$.subscribe((loader)=>{
      this.isShowLoader = loader;
    })
  }
}
