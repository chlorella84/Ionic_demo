import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { FilmsProvider } from '../providers/film.provider';

@Component({
    selector: 'app-rechercher',
    templateUrl: './rechercher.component.html',
    styleUrls: ['./rechercher.component.scss'],
})
export class RechercherComponent implements OnInit {
    public binding: string = 'Bonjour CDA';
    public title: string = 'Titanic';
    public year: number;
    public type: string = '';
    public films = [];


    constructor(private alertCtrl: AlertController,
        private rechercherFilm: FilmsProvider) {

    }
    ngOnInit() { }

    clickBouton() {
        this.binding = 'Clic !!!'
    }

    public error: string = '';
    public async rechercher() {
        if (!this.title || this.title.length < 3) {
            this.error = 'Veuillez saisir un titre de 3 charactères minimum';
            const alert = await this.alertCtrl.create({
                header: 'Informations Manquantes',
                message: 'Veuillez saisir un titre de plus de 3 caractères'
            });
            alert.present();
            return;
        }
        // if (!this.year || (this.year < 1900 || this.year > 2050)) {
        //     this.error = 'Veuillez saisir une année entre 1900 et 2050';
        //     return;
        // }
        if (this.type === undefined) {
            this.error = 'Veuillez choisir un type de média';
            return;
        }
        this.lancerRecherche();
    }

    private async lancerRecherche() {

        try {
            this.films = await this.rechercherFilm.search(this.title, this.year, this.type);
            for(let current of this.films){
                console.log(current);
            }

        } catch (err) {
            const alert = await this.alertCtrl.create({
                header: err.message,
                message: 'Aucun film trouvé',
                buttons: ['OK']
            });
            alert.present();
        }
    }

}