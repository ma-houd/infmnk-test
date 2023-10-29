import { CommonModule } from '@angular/common';

import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';

import { Router } from '@angular/router';
import { SpeciesShortModel } from '@core/models/speciesShort.model';

import { CapitalizePipe } from '@core/pipes/capitalize.pipe';
import { SpeciesService } from '@core/services/species.service';
import { Observable, debounceTime, switchMap } from 'rxjs';

import { IdentifySpeciesDialogComponent } from '../identify-species-dialog/identify-species-dialog.component';

@Component({
  selector: 'app-species-list',
  templateUrl: './species-list.component.html',
  styleUrls: ['./species-list.component.scss'],
  standalone: true,
  imports: [ CommonModule, MatTableModule, MatButtonModule, MatFormFieldModule, MatInputModule, CapitalizePipe ],
})
export class SpeciesListComponent implements OnInit {
  private speciesService = inject(SpeciesService);
  private destroyRef = inject(DestroyRef);
  public dialogRef = inject(MatDialog);
  private router = inject(Router);

  public species$!: Observable<SpeciesShortModel[]>;
  public displayedColumns: string[] = ['id', 'name', 'image'];

  public searchStr = '';

  public ngOnInit(): void {
    this.species$ = this.getAllSpeciesList$();  
  }
  
  public searchOnList(evt: any): void {
    this.searchStr = evt.target.value;
    this.speciesService.refreshSpeciesList$.next();
  }

  private getAllSpeciesList$(): Observable<SpeciesShortModel[]> {
    return this.speciesService.refreshSpeciesList$.pipe(
      debounceTime(500),
      switchMap(() => this.speciesService.getAllSpecies$(this.searchStr)),
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
