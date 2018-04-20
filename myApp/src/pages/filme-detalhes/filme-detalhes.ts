import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MoovieProvider } from '../../providers/moovie/moovie';

/**
 * Generated class for the FilmeDetalhesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-filme-detalhes',
  templateUrl: 'filme-detalhes.html',
  providers: [
    MoovieProvider
  ]
})
export class FilmeDetalhesPage {

  public filme;
  public filmeId;
  public movieProvider: MoovieProvider;

  constructor(public navCtrl: NavController, public navParams: NavParams, public movieProviders: MoovieProvider) {
    
  }

  ionViewDidEnter() {
    console.log('ionViewDidLoad FilmeDetalhesPage');
    this.filmeId = this.navParams.get("id");
    console.log(this.filmeId);
    this.loadMovie()
  }

  loadMovie(){
    this.movieProvider.getMovieDetail(this.filmeId).subscribe(
      data => {
          let response = (data as any)._body;
      },
      error =>{

      }
    );
  }

}
