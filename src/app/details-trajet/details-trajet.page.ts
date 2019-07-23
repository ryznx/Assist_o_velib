import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-details-trajet',
  templateUrl: './details-trajet.page.html',
  styleUrls: ['./details-trajet.page.scss'],
})
export class DetailsTrajetPage implements OnInit {
  constructor(private navController: NavController) { }

  ngOnInit() {
  }

  sendRating() {
    alert('Nous vous remercions pour ces informations !')
    this.navController.navigateRoot('home')
  }
}
