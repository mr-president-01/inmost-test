import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DrinkCategoriesList } from 'src/interfaces/drink-categories-list.interface';
import { DrinksList } from 'src/interfaces/drinks-list.interface';



@Injectable({
  providedIn: 'root'
})
export class DbService {

  private readonly filterUrl: string = 'https://www.thecocktaildb.com/api/json/v1/1/list.php';
  private readonly cocktailUrl: string = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php';

  constructor(
    private http: HttpClient
  ) { }

  public getFilterList(): Observable<DrinkCategoriesList> {
    let params = new HttpParams();
    params = params.set('c', 'list');
    return this.http.get<DrinkCategoriesList>(this.filterUrl, {params});
  }


  public getCocktail(category: string): Observable<DrinksList> {
    let params = new HttpParams();
    params = params.set('c', category);
    return this.http.get<DrinksList>(this.cocktailUrl, {params});
  }

}
