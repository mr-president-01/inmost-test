import { Component, OnInit, EventEmitter } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {

  public filterUrl: string = 'https://www.thecocktaildb.com/api/json/v1/1/list.php';
  public cocktailUrl: string = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php';
  public filterList = new Object();
  public currentFilterState = new Object();
  public showContent = false;
  public cocktails = {};
  public clearSubscribe = new Subject<boolean>();


  constructor(
    private http: HttpClient
  ) { }

  async ngOnInit() {
    await this.getFilterList().then( (obj) => {
      this.filterList = obj['drinks'].map((k) => {
        this.currentFilterState[k.strCategory] = true;
        return k.strCategory;
      })
    });

    this.receiveChoosenCategories();
    this.showContent = true;
    console.log(this.filterList);
  }

  getFilterList() {
    let params = new HttpParams();
    params = params.set('c', 'list');
    return this.http.get(this.filterUrl, {params: params}).toPromise();
  }

  receiveChoosenCategories () {
    //Sorting categories which we wanna get
    const ids = Object.keys(this.currentFilterState).map((key) => {
      if (this.currentFilterState[key] == true) return key;
    }).filter(k => k);

    ids.forEach(id => {
      this.getCocktail(id);
    })
  }

  getCocktail(id: string) {
    
    let params = new HttpParams();
    params = params.set('c', id);

    this.http.get<any>(this.cocktailUrl, {params: params})
    .pipe(take(1))
    .subscribe(data => {
      this.cocktails[id] = data.drinks;
    })
  }

  toggleCheckbox( event: EventEmitter<MatCheckboxChange>, category: string) {
    this.currentFilterState[category] = event['checked'];
  }

  async clickApply() {
    await this.receiveChoosenCategories();
    // .then((cock) => {
    //   this.cocktails = cock;
    // })
    console.log(this.cocktails);
  }


}
