import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartscreenComponent } from './startscreen/startscreen.component';
import { PrivacyPolicyComponent } from './startscreen/privacy-policy/privacy-policy.component';
import { LegalNoticeComponent } from './startscreen/legal-notice/legal-notice.component';

const routes: Routes = [
  { path: '', component: StartscreenComponent },
  { path: 'privacypolicy', component: PrivacyPolicyComponent },
  { path: 'legalnotice', component: LegalNoticeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
