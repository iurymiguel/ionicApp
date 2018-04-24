import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MoovieProvider } from '../../providers/moovie/moovie';
import { FilmeDetalhesPage } from '../filme-detalhes/filme-detalhes';

/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-feed',
	templateUrl: 'feed.html',
	//O provider é injetado aqui.
	providers: [
		MoovieProvider
	]
})
export class FeedPage {

	public loader;
	public refresher;
	public isRefreshing: boolean = false;
	public lista_filmes = new Array<any>();
	public nome_usuario:string = "Iury da Rocha Miguel"; //por padrao é public.
	public page = 1;
	public infiniteScroll;
	public objeto_feed = {
		titulo: "Iury da Rocha",
		data: "Novemeber, 5 1999",
		descricao: "Estou criando um app em Ionic",
		qntd_likes: 12,
		qntd_comments: 4,
		time_comment: "11h ago"
	}

	
	constructor(public navCtrl: NavController, public navParams: NavParams,
				private moovieProvider: MoovieProvider, public loadingCtrl: LoadingController) {
		
	}

	doRefresh(refresher) {
		this.refresher = refresher;
		this.isRefreshing = true;
		this.loadMovies();
	}

	presentLoading() {
		this.loader = this.loadingCtrl.create({
		  content: "Please wait...",
		});
		this.loader.present();
	}

	closeLoading(){
		this.loader.dismiss();
	}

	openDetails(filme){
		console.log(filme);
		this.navCtrl.push(FilmeDetalhesPage, {id: filme.id});
	}



	doInfinite(infiniteScroll) {
		console.log('Begin async operation');
		this.page++
		this.infiniteScroll = infiniteScroll;
		this.loadMovies(true);
	  }


	public somaDoisNumeros(num1:number, num2:number): void{
		alert(num1 + num2);
	}

	ionViewDidEnter() {
		//this.somaDoisNumeros(10,2);
		this.loadMovies();
		console.log('ionViewDidLoad FeedPage');
	}

	loadMovies(newPage: boolean = false){
		this.presentLoading();
		this.moovieProvider.getLatestMovies(this.page).subscribe(
			data=>{
				const response = (data as any); //casting
				
				//const objeto_retorno = JSON.parse(response); //converte para json um response que tem o formato string.
				
				if(newPage){
					this.lista_filmes = this.lista_filmes.concat(response.results);
					this.infiniteScroll.complete();
				}else if(this.page == 1){
					this.lista_filmes = response.results;
				}
				
				console.log(response);
				this.closeLoading();	
				if(this.isRefreshing){
					this.refresher.complete();
					this.isRefreshing = false;
				}
			},
			error => {
				console.log(error);
				this.closeLoading();	
			}
		);
	}

}
