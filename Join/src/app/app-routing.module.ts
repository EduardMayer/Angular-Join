import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartscreenComponent } from './startscreen/startscreen.component';
import { PrivacyPolicyComponent } from './startscreen/privacy-policy/privacy-policy.component';

const routes: Routes = [
  { path: '', component: PrivacyPolicyComponent },
  { path: '', component: StartscreenComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
