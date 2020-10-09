import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Film } from '../models/film';
import { FilmsProvider } from '../providers/film.provider';
import {TextToSpeech} from '@ionic-native/text-to-speech/ngx';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  public id: string;
  public film : Film;
  public isLecture= false; 
  
  constructor(private route: ActivatedRoute,
    private filmsCtrl : FilmsProvider,
    private tts: TextToSpeech) { 
    this.route.params.subscribe((params) =>{
      this.id= params['id'];
      this.chargerDetailsFilm();
    });
  }

  async chargerDetailsFilm(){
    this.film = await this.filmsCtrl.details(this.id);
  }

  ngOnInit() {
  }


  lireDescription() { 
    console.log("Lecturede",this.film.Plot);
  }


  async lire() {
    this.isLecture= true;
    try{
      await this.tts.speak(this.film.Plot);
    } catch(err) {
      console.log(err);
    } finally{
      this.isLecture= false;
    }}
}
