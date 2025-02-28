import { ActivatedRoute } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ICategories } from '../../shared/interfaces/icategories';

@Component({
  selector: 'app-category-details',
  imports: [],
  templateUrl: './category-details.component.html',
  styleUrl: './category-details.component.scss'
})
export class CategoryDetailsComponent implements OnInit {

  categoryDetails!:ICategories;
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly categoriesService = inject(CategoriesService);

  getAllAboutCat():void {
    this.activatedRoute.paramMap.subscribe({
      next:(p) => {
        const catID = p.get('id');
        this.categoriesService.getSpecificCategory(catID !).subscribe({
          next:(res) => {
            console.log(res);
            this.categoryDetails = res.data;
          },
          error:(err) => {
            console.log(err);
          }
        })
      },
    })
  }

  ngOnInit(): void {
    this.getAllAboutCat();
  }

}

