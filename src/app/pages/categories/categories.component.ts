import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories/categories.service';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit{

  category:any;
  private readonly categoriesService = inject(CategoriesService);

  ngOnInit(): void {
    this.getAllCategories()
  }

  getAllCategories():void {
    this.categoriesService.getAllCategories().subscribe({
      next:(res) => {
        console.log(res);
        this.category = res.data;
      },
      error:(err) => {
        console.log(err);
      }
    })
  }

}
