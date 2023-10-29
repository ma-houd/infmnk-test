import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { SpeciesFullModel } from '@core/models/speciesFull.model';
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
    return this.httpClient.get<SpeciesShortModel[]>(environment.apiUrl + '/species').pipe(
      map((species: any) => species.data)
    );
  }

  public getASpeciesById$(id : number): Observable<SpeciesFullModel> {
    return this.httpClient.get<SpeciesFullModel>(environment.apiUrl + '/species/' + id).pipe(
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
 