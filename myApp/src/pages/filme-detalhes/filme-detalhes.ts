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

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public movieProvider: MoovieProvider) {
    
  }

  ionViewDidEnter() {
    console.log('ionViewDidLoad FilmeDetalhesPage');
    this.filmeId = this.navParams.get("id");
    this.loadMovieDetails();
    console.log(this.filmeId);
  }

  loadMovieDetails(){
    this.movieProvider.getMoviesDetails(this.filmeId).subscribe(
      data => {
        this.filme = (data as any);
      },
      error =>{
        console.log(error);
      }
    );
  }

}
