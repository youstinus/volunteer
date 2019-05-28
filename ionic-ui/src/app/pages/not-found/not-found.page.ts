import { Component, OnInit, OnDestroy } from '@angular/core';
import { Language } from 'src/app/utilities/Language';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.page.html',
  styleUrls: ['./not-found.page.scss'],
  providers: []
})
export class NotFoundPage implements OnInit, OnDestroy {

  notFoundh2: string = Language.Lang.notFoundh2;
  notFoundpar: string = Language.Lang.notFoundpar;
  notFoundGoMain: string = Language.Lang.notFoundGoMain;
  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy() {
  }
}
