import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class NotificationService {
    
    constructor(){}

    /**
    * Renders a notification with the specified message, style, animation, and duration.
    *
    * @param {string} [message=""] - The message content of the notification.
    * @param {string} [style="default"] - The style class to apply to the notification card. Available Options: default, success, error
    * @param {string} [animation="shift-right-in"] - The animation to apply to the notification card. Available Options: "shift-right-in", shift-left-in", "shift-up".
    * @param {number} [duration=2] - The duration (in seconds) for which the notification is displayed.
    * 
    * Params for style and animation can be declared in styles.scss
    * 
    * @returns {void}
    */
    renderNotification(message: string = "", style: string = "default", animation: string = "shift-right-in", duration: number = 2, isSuccess: boolean = true) {
        let container = document.createElement("div");
        document.body.append(container);
        container.classList.add('notification-container');
        let element = document.createElement("div");
        element.classList.add('notification-card');
        element.classList.add(isSuccess ? 'success' : 'error');
        element.classList.add('create');
        element.style.animation = `${animation} ${duration}s ease-in-out`;
        element.innerHTML = message;
        container.appendChild(element);
        setTimeout(() => {
          container.remove();
        }, duration * 1000);
      }
      
}