import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DbService } from 'src/app/services/db.service';
import { Drink } from 'src/interfaces/drink.interface';

interface WholeCategory {
  category: string, 
  drinks: Array<Drink>
}

interface FilterState {
  name: string, 
  value: boolean 
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {

  public filterList: Array<FilterState>;
  public showContent = false;
  public cocktails: Array<WholeCategory>;


  constructor(
    private http: HttpClient,
    private dbService: DbService
  ) { }

  ngOnInit() {
    this.getFilterList();
  }

  private getFilterList(): void {
    this.dbService.getFilterList().
      subscribe(res => {
        this.filterList = res.drinks.map(drink => ({ name: drink.strCategory, value: true }));
        this.receiveChoosenCategories();
      });
  }

  public receiveChoosenCategories(): void {
    this.cocktails = [];

    this.filterList
      .filter(category => category.value)
      .map(category => category.name)
      .forEach((name, index, array) => this.getDrinkCategory(name, index,array));
  }

  private getDrinkCategory(name: string, index: number, array: Array<string>): void {
    this.dbService.getCocktail(name).subscribe(drinks => {
      this.cocktails.push({category: name, drinks: drinks.drinks})
      if (index === (array.length - 1)) this.showContent = true;
    })
  }
}
