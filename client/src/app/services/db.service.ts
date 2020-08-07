import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, take } from 'rxjs/operators';

export interface IDbBeat {
  beatKey: string;
  lastUpdated: number;
  thumbnail: string;
  title: string;
  beatUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class DbService {

  private readonly filterUrl: string = 'https://www.thecocktaildb.com/api/json/v1/1/list.php';
  private readonly cocktailUrl: string = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php';

  constructor(
    private http: HttpClient
  ) { }

  getFilterList() {
    let params = new HttpParams();
    params = params.set('c', 'list');
    
    const filterResponse = this.http.get(this.filterUrl, {params: params});

    filterResponse
      .pipe(take(1))
      .subscribe((data) => {
        console.log(data);
        return data['drinks'];
      })
  }

  getCocktail(category: string) {
    let params = new HttpParams();
    params = params.set('c', category);
    const cocktailRequest = this.http.get<any>(this.cocktailUrl, {params: params});

    cocktailRequest
      .pipe(take(1))  
      .subscribe((data) => {
        console.log(data);
        return data.drinks;
      });
  }

}
