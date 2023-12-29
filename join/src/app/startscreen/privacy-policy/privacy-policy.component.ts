import { Component } from '@angular/core';
import { ToolbarComponent } from "../toolbar/toolbar.component";
import { SidebarComponent } from "../sidebar/sidebar.component";
import {MatCardModule} from '@angular/material/card';

@Component({
    selector: 'app-privacy-policy',
    standalone: true,
    templateUrl: './privacy-policy.component.html',
    styleUrl: './privacy-policy.component.scss',
    imports: [ToolbarComponent, SidebarComponent, MatCardModule]
})
export class PrivacyPolicyComponent {

}
