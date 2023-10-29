import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { SpeciesShortModel } from '@core/models/speciesShort.model';
import { environment } from '@environment';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpeciesService {
  private httpClient = inject(HttpClient);
  public refreshSpeciesList$ = new BehaviorSubject<void>(undefined);

  constructor() { }

  public getAllSpecies$(): Observable<SpeciesShortModel[]> {
    return this.httpClient.get(environment.apiUrl + '/species').pipe(
      map((species: any) => species.data)
    );
  }

  public identifyASpecies$(body: FormData) {
    return this.httpClient.post(environment.apiUrl + '/species/identify', body);
  }

  public resetList(): Observable<void> {
    return this.httpClient.post<void>(environment.apiUrl + '/reset', undefined);
  }
}
 