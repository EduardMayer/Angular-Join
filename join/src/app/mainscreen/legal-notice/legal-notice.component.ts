import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';


@Component({
    selector: 'app-legal-notice',
    standalone: true,
    templateUrl: './legal-notice.component.html',
    styleUrl: './legal-notice.component.scss',
    imports: [MatCardModule, RouterLink]
})
export class LegalNoticeComponent {

}
