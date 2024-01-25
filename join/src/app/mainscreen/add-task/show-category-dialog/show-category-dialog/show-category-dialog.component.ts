import { Component } from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl,FormGroupDirective,NgForm,Validators,FormsModule,ReactiveFormsModule,} from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';
import { CategoryFirebaseService } from '../../../../../services/category.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-show-category-dialog',
  standalone: true,
  imports: [MatDialogModule, MatInputModule, MatFormFieldModule, FormsModule, ReactiveFormsModule, ColorPickerModule],
  templateUrl: './show-category-dialog.component.html',
  styleUrl: './show-category-dialog.component.scss'
})
export class ShowCategoryDialogComponent {

  color : string = '#29ABE2';
  section : string = '';
  toggle = false;


  categoryFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);


  isConfirmButtonDisabled(): boolean {
    return this.categoryFormControl.invalid || !this.color;

  }
 

  constructor(  
    private categoryService: CategoryFirebaseService,
    private dialogRef: MatDialogRef<ShowCategoryDialogComponent>,)
  {}


  async onConfirm() {
    const section = this.categoryFormControl.value || '';
    const color = this.color; 
  
    if (this.categoryFormControl) {
      this.categoryService.addNewCategory(section, color)
        .then(() => {
          console.log("Add new Category ", section, color);
          this.dialogRef.close();
        })
        .catch((error) => {
          console.error("Error adding category:", error);
          this.dialogRef.close();
        });
    }
  }
  
}



