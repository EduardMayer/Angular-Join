import { Component , Renderer2 } from '@angular/core';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { ContactsComponent } from './contacts/contacts.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { BoardComponent } from './board/board.component';


@Component({
  selector: 'app-mainscreen',
  standalone: true,
  imports: [LegalNoticeComponent, MatSidenavModule, MatToolbarModule, PrivacyPolicyComponent, ContactsComponent, AddTaskComponent, BoardComponent],
  templateUrl: './mainscreen.component.html',
  styleUrl: './mainscreen.component.scss'
})
export class MainscreenComponent {
  focusedBox: HTMLElement | null = null;

  legalNotice = false;
  privacyPolicy = false;
  contacts = false;
  addTask = false;
  board = true;
  
  constructor(private renderer: Renderer2) {}

  showLegalNotice(){
    this.legalNotice = true;
    this.privacyPolicy = false;
    this.contacts =false;
    this.addTask = false;
  }

  showPrivacyPolicy(){
    this.privacyPolicy = true;
    this.legalNotice = false;
    this.contacts =false;
    this.addTask = false;
  }

  showContacts(){
    this.contacts =true;
    this.privacyPolicy = false;
    this.legalNotice = false;
    this.addTask = false;
  }


  showAddTask(){
    this.addTask = true;
    this.legalNotice = false;
    this.privacyPolicy = false;
    this.contacts =false;
  }

  setFocus(event: any) {
    const element = event.target as HTMLElement;

    if (element) {
      document.querySelectorAll('.navigation-box, .sidernav-footer a').forEach(item => {
        this.renderer.removeClass(item, 'focused');
      });

      this.renderer.addClass(element, 'focused');
      this.focusedBox = element;
    }
  }


}
