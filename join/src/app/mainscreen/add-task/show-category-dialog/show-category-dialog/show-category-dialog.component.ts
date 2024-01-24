import { Component } from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl,FormGroupDirective,NgForm,Validators,FormsModule,ReactiveFormsModule,} from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';

@Component({
  selector: 'app-show-category-dialog',
  standalone: true,
  imports: [MatDialogModule, MatInputModule, MatFormFieldModule, FormsModule, ReactiveFormsModule, ColorPickerModule],
  templateUrl: './show-category-dialog.component.html',
  styleUrl: './show-category-dialog.component.scss'
})
export class ShowCategoryDialogComponent {

  color : string = '';
  toggle = false;
  categoryFormControl = new FormControl('', [Validators.required]);
 

  constructor()
  {}


}
