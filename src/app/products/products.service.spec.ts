import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductsService } from './products.service';
import { Products } from './products';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductsService]
    });

    service = TestBed.inject(ProductsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all products', () => {
    const dummyProducts: Products[] = [
      // Add sample data for testing
      { idProduit: 1, libelle: 'Product 1', qteStock: 10, prix: 20 },
      { idProduit: 2, libelle: 'Product 2', qteStock: 15, prix: 30 }
    ];

    service.getAll().subscribe((products: Products[]) => {
      expect(products.length).toBe(2);
      expect(products).toEqual(dummyProducts);
    });

    const req = httpMock.expectOne('http://localhost:8081/api/produit');
    expect(req.request.method).toBe('GET');
    req.flush(dummyProducts);
  });

  it('should create a product', () => {
    const newProduct: Products = { idProduit: 3, libelle: 'New Product', qteStock: 5, prix: 25 };

    service.create(newProduct).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne('http://localhost:8081/api/produit');
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should find a product by id', () => {
    const productId = 1;
    const dummyProduct: Products = { idProduit: productId, libelle: 'Product 1', qteStock: 10, prix: 20 };

    service.find(productId).subscribe((product: Products) => {
      expect(product).toEqual(dummyProduct);
    });

    const req = httpMock.expectOne(`http://localhost:8081/api/produit/${productId}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyProduct);
  });

  it('should update a product', () => {
    const productId = 1;
    const updatedProduct: Products = { idProduit: productId, libelle: 'Updated Product', qteStock: 15, prix: 25 };

    service.update(productId, updatedProduct).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`http://localhost:8081/api/produit/${productId}`);
    expect(req.request.method).toBe('PUT');
    req.flush({}); // You can customize the response as needed
  });

  it('should delete a product', () => {
    const productId = 1;

    service.delete(productId).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`http://localhost:8081/api/produit/${productId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

});
