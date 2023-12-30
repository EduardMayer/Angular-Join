import { Routes } from '@angular/router';
import { StartscreenComponent } from './startscreen/startscreen.component';
import { PrivacyPolicyComponent } from './startscreen/privacy-policy/privacy-policy.component';
import { LegalNoticeComponent } from './startscreen/legal-notice/legal-notice.component';

export const routes: Routes = [
    { path: '', component: StartscreenComponent },
    { path: 'privacypolicy', component: PrivacyPolicyComponent },
    { path: 'legalnotice', component: LegalNoticeComponent },
]