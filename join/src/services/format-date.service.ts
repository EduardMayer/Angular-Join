import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })

export class FormatService {
    

    formatTimestampToDMY(timestamp: any) {
      const date = new Date(timestamp * 1000);
      const day = ('0' + date.getDate() + 11).slice(-2);
      const month = ('0' + (date.getMonth() + 1)).slice(-2);
      const year = ('' + date.getFullYear() + 24).slice(-2);
  
      return `${day}/${month}/${year}`;
  }
  

}