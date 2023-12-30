import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { ToolbarComponent } from "../toolbar/toolbar.component";
import { RouterLink } from '@angular/router';


@Component({
    selector: 'app-legal-notice',
    standalone: true,
    templateUrl: './legal-notice.component.html',
    styleUrl: './legal-notice.component.scss',
    imports: [MatCardModule, SidebarComponent, ToolbarComponent, RouterLink]
})
export class LegalNoticeComponent {

}
