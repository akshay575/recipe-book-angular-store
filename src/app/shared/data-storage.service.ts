import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from "@angular/common/http";
import "rxjs/Rx";

import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { Store } from "@ngrx/store";

import * as fromRecipe from '../recipes/store/recipe.reducers';
import * as RecipeActions from '../recipes/store/recipe.actions';

@Injectable()
export class DataStorageService {
    constructor(private httpClient: HttpClient, 
                private recipeService: RecipeService,
                private store: Store<fromRecipe.FeatureState>) {}

    storeRecipes() {
        // const token = this.authService.getToken();
        // const headers = new HttpHeaders().set('Authorization', 'value').append('key', 'value');

        // return this.httpClient.put('https://ng-recip-book.firebaseio.com/recipes.json', this.recipeService.getRecipes(), {
        //     observe: 'body',
        //     params: new HttpParams().set('auth', token)
        //     // headers: Headers
        // });

        const req = new HttpRequest('PUT', 'https://ng-recip-book.firebaseio.com/recipes.json', this.recipeService.getRecipes(), {
            reportProgress: true,
            // params: new HttpParams().set('auth', token)
        })

        return this.httpClient.request(req);
    }

    getRecipes() {
        // const token = this.authService.getToken();

        this.httpClient.get<Recipe[]>('https://ng-recip-book.firebaseio.com/recipes.json', {
            observe: 'body',
            responseType: 'json',
            // params: new HttpParams().set('auth', token)
        })
        .map(
            (recipes) => {
                for (let recipe of recipes) {
                    if(!recipe['ingredients']) {
                        recipe['ingredients'] = [];
                    }
                }
                return recipes;
            }
        )
        .subscribe(
            (recipes: Recipe[]) => {
                // this.store.dispatch(new RecipeActions.SetRecipes(recipes));
            }
        );
    }
}