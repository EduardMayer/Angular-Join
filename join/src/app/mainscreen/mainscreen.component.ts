import { Component } from '@angular/core';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';


@Component({
  selector: 'app-mainscreen',
  standalone: true,
  imports: [LegalNoticeComponent, MatSidenavModule, MatToolbarModule, PrivacyPolicyComponent,],
  templateUrl: './mainscreen.component.html',
  styleUrl: './mainscreen.component.scss'
})
export class MainscreenComponent {

  legalNotice = false;
  privacyPolicy = false;


  showLegalNotice(){
    this.legalNotice = true;
    this.privacyPolicy = false;
  }

  showPrivacyPolicy(){
    this.privacyPolicy = true;
    this.legalNotice = false;
  }
  
}
