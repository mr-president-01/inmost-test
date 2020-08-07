import { Component, OnInit, EventEmitter } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {

  public filterList: { [filterKey: string]: boolean };
  public currentFilterState = new Object();
  public showContent = false;
  public cocktails = {};


  constructor(
    private http: HttpClient,
    private dbService: DbService
  ) { }

  async ngOnInit() {
    await this.getFilterList();

    // this.receiveChoosenCategories();
    this.showContent = true;
    console.log(this.filterList);
  }

  async getFilterList() {
    const obj = await this.dbService.getFilterList();
    this.filterList = obj.map((k) => {
      this.currentFilterState[k.strCategory] = true;
      return k.strCategory;
    })
  }

  receiveChoosenCategories () {
    //Sorting categories which we wanna get
    const ids = Object
      .keys(this.currentFilterState)
      .map((key) => {
          if (this.currentFilterState[key] == true) return key;
      })
      .filter(k => k);

    ids.forEach(id => {
      this.cocktails[id] = this.dbService.getCocktail(id);
    })
  }

  // getCocktail(id: string) {
    
  //   let params = new HttpParams();
  //   params = params.set('c', id);

  //   this.http.get<any>(this.cocktailUrl, {params: params})
  //   .pipe(take(1))
  //   .subscribe(data => {
  //     this.cocktails[id] = data.drinks;
  //   })
  // }

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
