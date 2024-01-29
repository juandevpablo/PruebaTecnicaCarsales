import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { takeWhile } from 'rxjs';
import { ResponseInterface } from 'src/app/models/response.interface';
import { RickAndMortyApiService } from 'src/app/services/rick-and-morty-api.service';
import { EpisodeDetailComponent } from '../episode-detail/episode-detail.component';
import { EpisodeInterface } from 'src/app/models/episode.interface';
import { InfoInterface } from 'src/app/models/info.interface';
import { FormBuilder, FormControl } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-episode-list',
  templateUrl: './episode-list.component.html',
  styleUrls: ['./episode-list.component.less']
})
export class EpisodeListComponent implements OnInit {
  private alive = true;
  public episodeList: ResponseInterface = { info: {} as InfoInterface } as ResponseInterface;
  public title: string = "Episode list"
  public subtitle: string = "List of all rick and morty episodes"
  public pageSize: number = 20
  public isSpinning: boolean = true;
  public filterForm: any;

  constructor(
    private rickAndMortyApiService: RickAndMortyApiService,
    private nzModalService: NzModalService,
    private viewContainerRef: ViewContainerRef,
    private formBuilder: FormBuilder,
    private nzMessageService: NzMessageService,
  ) {
    this.filterForm = this.formBuilder.group({
      NameEpisode: new FormControl({ value: null, disabled: false }),
    });
  }

  ngOnInit(): void {
    this.GetEpisodeList(1, "");
  }

  private GetEpisodeList(page: number, textName: string): void {
    this.rickAndMortyApiService.GetAllEpisode(page, textName).pipe(takeWhile(() => this.alive))
      .subscribe(x => {
        this.episodeList = x;
        this.changeStateSpinning();

      }, error => {
        this.createMessage("error", error.error.error)
        this.changeStateSpinning();
        this.episodeList = { info: {} as InfoInterface } as ResponseInterface;
      })
  }

  createComponentModal(episode: EpisodeInterface): void {
    const modal = this.nzModalService.create({
      nzWidth: '800px',
      nzTitle: 'Episode detail',
      nzFooter: null,
      nzContent: EpisodeDetailComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzComponentParams: {
        episode: episode
      },
    });
    const instance = modal.getContentComponent();
    modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));
    // Return a result when closed
    modal.afterClose.subscribe(result => {
    });
  }

  public pageIndexChange(page: any): void {
    this.changeStateSpinning();
    this.GetEpisodeList(page, "");
  }

  public changeStateSpinning(): void {
    this.isSpinning = !this.isSpinning;
  }

  public submitForm(event: any): void {
    this.changeStateSpinning()
    this.GetEpisodeList(0, this.filterForm.controls["NameEpisode"].value)

  }

  createMessage(type: string, texto: string): void {
    this.nzMessageService.create(type, texto, { nzDuration: 5000 });
  }
}
