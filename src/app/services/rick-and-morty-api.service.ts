import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseInterface } from '../models/response.interface';
import { Observable } from 'rxjs';
import { CharacterInterface } from '../models/character.interface';
import { HelperService } from './helper.service';


const UrlEpisode = "https://rickandmortyapi.com/api/episode/"
const UrlCharacter = "https://rickandmortyapi.com/api/character/"
@Injectable({
  providedIn: 'root'
})
export class RickAndMortyApiService {

  constructor(private httpClient: HttpClient,
    private helperService: HelperService
  ) { }

  public GetAllEpisode(page: number, textName: string): Observable<ResponseInterface> {
    const UrlEpisodeWithParam = UrlEpisode + this.helperService.serializeParams(page == 0 ? { name: textName } : { page: page, name: textName })
    return this.httpClient.get<ResponseInterface>(UrlEpisodeWithParam);
  }

  public GetMultipleCharacters(idCharactersList: string): Observable<CharacterInterface[]> {
    const url = UrlCharacter + idCharactersList
    return this.httpClient.get<CharacterInterface[]>(url);
  }
}
