import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from '../core/components/loader/loader.component';
import { FormSpinnerComponent } from './components/form-spinner/form-spinner.component';
import { InputTextComponent } from './components/input-text/input-text.component';
import { DescPipe } from './pipes/desc/desc.pipe';

@NgModule({
  declarations: [
    InputTextComponent,
    FormSpinnerComponent,
    DescPipe,
    LoaderComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    InputTextComponent,
    FormSpinnerComponent,
    DescPipe,
    LoaderComponent,
  ],
})
export class SharedModule {}
