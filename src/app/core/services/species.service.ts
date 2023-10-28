import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { SpeciesShortModel } from '@core/models/speciesShort.model';
import { environment } from '@environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpeciesService {
  private httpClient = inject(HttpClient);

  constructor() { }

  public getAllSpecies$(): Observable<SpeciesShortModel[]> {
    return this.httpClient.get(environment.apiUrl + '/species').pipe(
      map((species: any) => species.data)
    );
  }
}
 