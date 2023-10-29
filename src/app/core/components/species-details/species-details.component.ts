import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpeciesFullModel } from '@core/models/speciesFull.model';
import { SpeciesShortModel } from '@core/models/speciesShort.model';
import { CapitalizePipe } from '@core/pipes/capitalize.pipe';
import { SpeciesService } from '@core/services/species.service';
import { Observable, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-species-details',
  templateUrl: './species-details.component.html',
  styleUrls: ['./species-details.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    CapitalizePipe
  ]
})
export class SpeciesDetailsComponent implements OnInit {
  private speciesService = inject(SpeciesService);
  private activatedRoute = inject(ActivatedRoute);

  public species$!: Observable<SpeciesFullModel>;


  public ngOnInit(): void {
    this.species$ = this.getSpeciesById$();
  }

  private getSpeciesById$(): Observable<SpeciesFullModel> {
    return this.activatedRoute.params.pipe(
      map((params) => params['id']),
      switchMap((id) => this.speciesService.getASpeciesById$(id)),
    );
  }
}
