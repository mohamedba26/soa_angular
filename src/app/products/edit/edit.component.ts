import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { ProductsService } from '../products.service';
import { Products } from '../products';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  @Input() productId: number;
  @ViewChild('myModal') myModal!: ElementRef;
  display = "none";
  products: Products = new Products();
  constructor(private prodserv: ProductsService) { }
  ngOnInit() {
    this.prodserv.find(this.productId).subscribe(data => {
      this.products = data;
    });
  }
  updatearticle = () => {
    this.prodserv.update(this.products.idProduit, this.products).subscribe((data => {
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
