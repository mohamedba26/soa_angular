import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';
import { ProductsService } from '../products.service';
import { Products } from '../products';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent{
    @Input() productId: number;
    @ViewChild('myModal') myModal!: ElementRef;
    display = "none";
    constructor(private prodserv: ProductsService) { }
    updatearticle = () => {
      this.prodserv.delete(this.productId).subscribe((data => {
        console.log(data)
        this.closeModal()
        window.location.reload();
      }))
    }
  openModal() {
    this.display = "block";
  }
  closeModal() {
    this.display = "none";
  }
}
