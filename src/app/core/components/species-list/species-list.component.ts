import { CommonModule } from '@angular/common';

import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';

import { SpeciesShortModel } from '@core/models/speciesShort.model';

import { SpeciesService } from '@core/services/species.service';
import { Observable, switchMap } from 'rxjs';

import { IdentifySpeciesDialogComponent } from '../identify-species-dialog/identify-species-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-species-list',
  templateUrl: './species-list.component.html',
  styleUrls: ['./species-list.component.scss'],
  standalone: true,
  imports: [ CommonModule, MatTableModule, MatButtonModule ],
})
export class SpeciesListComponent implements OnInit {
  private speciesService = inject(SpeciesService);
  private destroyRef = inject(DestroyRef);
  public dialogRef = inject(MatDialog);
  private router = inject(Router);

  public species$!: Observable<SpeciesShortModel[]>;
  public displayedColumns: string[] = ['id', 'name', 'image'];


  public ngOnInit(): void {
    this.species$ = this.getAllSpeciesList$();
  }

  private getAllSpeciesList$(): Observable<SpeciesShortModel[]> {
    return this.speciesService.refreshSpeciesList$.pipe(
      switchMap(() => this.speciesService.getAllSpecies$())
    );
  }

  public openIdentifyDialog(): void {
    this.dialogRef.open(IdentifySpeciesDialogComponent);
  }

  public resetList(): void {
    this.speciesService.resetList()
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(() => this.speciesService.refreshSpeciesList$.next());
  }

  public redirectToDetails(evt: any): void {
    this.router.navigateByUrl('species/' + evt.id);
  }
}
