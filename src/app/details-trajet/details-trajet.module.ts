import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DetailsTrajetPage } from './details-trajet.page';
import { StarRating } from 'ionic4-star-rating';

const routes: Routes = [
  {
    path: '',
    component: DetailsTrajetPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DetailsTrajetPage, StarRating],
  exports: [StarRating]
})
export class DetailsTrajetPageModule {}
