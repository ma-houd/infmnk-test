import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

import { SpeciesShortModel } from '@core/models/speciesShort.model';

import { SpeciesService } from '@core/services/species.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-species-list',
  templateUrl: './species-list.component.html',
  styleUrls: ['./species-list.component.scss'],
  standalone: true,
  imports: [ CommonModule, MatTableModule ]
})
export class SpeciesListComponent implements OnInit {
  private speciesService = inject(SpeciesService);
  
  public species$!: Observable<SpeciesShortModel[]>;
  public displayedColumns: string[] = ['id', 'name', 'image'];


  public ngOnInit(): void {
    this.species$ = this.getAllSpeciesList$();
  }

  private getAllSpeciesList$(): Observable<SpeciesShortModel[]> {
    return this.speciesService.getAllSpecies$();
  }
}
