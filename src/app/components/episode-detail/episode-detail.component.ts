import { Component, Input, OnInit } from '@angular/core';
import { takeWhile } from 'rxjs';
import { CharacterInterface } from 'src/app/models/character.interface';
import { EpisodeInterface } from 'src/app/models/episode.interface';
import { RickAndMortyApiService } from 'src/app/services/rick-and-morty-api.service';

@Component({
  selector: 'app-episode-detail',
  templateUrl: './episode-detail.component.html',
  styleUrls: ['./episode-detail.component.less']
})
export class EpisodeDetailComponent implements OnInit {
  @Input() episode: EpisodeInterface = {} as EpisodeInterface;
  alive: boolean = true;
  characters: CharacterInterface[] = [];
  isSpinning: boolean = true;

  constructor(private rickAndMortyApiService: RickAndMortyApiService) { }

  ngOnInit(): void {
    console.log(this.episode);
    this.getMultipleCharacters()
  }


  getMultipleCharacters(): void {
    var IdCharacterList = this.episode.characters.map(character => {
      var urlSplit = character.split("character/")
      return urlSplit[1];
    }).join(',')

    this.rickAndMortyApiService.GetMultipleCharacters(IdCharacterList).pipe(takeWhile(() => this.alive))
      .subscribe(async (x) => {
        console.log(x);
        this.isSpinning = false
        this.characters = x

      })
  }
}
