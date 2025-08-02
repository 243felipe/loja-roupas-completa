import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  isNew?: boolean;
  description?: string;
}

@Component({
  selector: 'app-loja',
  templateUrl: './loja.component.html',
  styleUrls: ['./loja.component.scss']
})
export class LojaComponent implements OnInit {
  allProducts: Product[] = [
    {
      id: 1,
      name: 'Blusa Feminina Elegante',
      price: 89.90,
      originalPrice: 129.90,
      image: 'assets/image/1.jpg',
      category: 'Feminino',
      rating: 4.8,
      isNew: true,
      description: 'Blusa feminina elegante com tecido premium e acabamento sofisticado. Ideal para ocasiões especiais e uso diário.'
    },
    {
      id: 2,
      name: 'Camisa Social Masculina',
      price: 120.00,
      image: 'assets/image/2.jpg',
      category: 'Masculino',
      rating: 4.6,
      description: 'Camisa social masculina de alta qualidade, com tecido resistente e caimento perfeito. Disponível em várias cores.'
    },
    {
      id: 3,
      name: 'Vestido Floral Feminino',
      price: 150.00,
      originalPrice: 200.00,
      image: 'assets/image/3.jpg',
      category: 'Feminino',
      rating: 4.9,
      description: 'Vestido floral feminino com estampa delicada e design moderno. Perfeito para eventos especiais e passeios.'
    },
    {
      id: 4,
      name: 'Calça Jeans Masculina',
      price: 95.00,
      image: 'assets/image/4.jpg',
      category: 'Masculino',
      rating: 4.7,
      isNew: true,
      description: 'Calça jeans masculina com tecido de alta qualidade e design moderno. Confortável e durável para uso diário.'
    },
    {
      id: 5,
      name: 'Jaqueta Feminina',
      price: 180.00,
      originalPrice: 250.00,
      image: 'assets/image/5.jpg',
      category: 'Feminino',
      rating: 4.5,
      description: 'Jaqueta feminina elegante com design moderno e tecido resistente. Perfeita para complementar qualquer look.'
    },
    {
      id: 6,
      name: 'Tênis Esportivo',
      price: 220.00,
      image: 'assets/image/6.jpg',
      category: 'Acessórios',
      rating: 4.4,
      description: 'Tênis esportivo com tecnologia avançada para máximo conforto e performance. Ideal para atividades físicas.'
    },
    {
      id: 7,
      name: 'Bolsa Feminina',
      price: 85.00,
      originalPrice: 120.00,
      image: 'assets/image/7.jpg',
      category: 'Acessórios',
      rating: 4.8,
      description: 'Bolsa feminina elegante com acabamento premium e espaço interno generoso. Perfeita para uso diário.'
    },
    {
      id: 8,
      name: 'Cinto Masculino',
      price: 45.00,
      image: 'assets/image/8.jpg',
      category: 'Acessórios',
      rating: 4.6,
      isNew: true,
      description: 'Cinto masculino de couro genuíno com fivela elegante. Acessório essencial para complementar qualquer look.'
    }
  ];

  selectedProduct: Product | null = null;
  selectedSize: string = 'M';
  selectedColor: string = '#ff6b6b';
  quantity: number = 1;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  getDiscountPercentage(currentPrice: number, originalPrice: number): number {
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
  }

  formatPrice(price: number): string {
    return price.toFixed(2).replace('.', ',');
  }

  addToCart(product: Product): void {
    console.log('Produto adicionado ao carrinho:', product.name);
    // Aqui você pode implementar a lógica do carrinho
  }

  addToFavorites(product: Product): void {
    console.log('Produto adicionado aos favoritos:', product.name);
    // Aqui você pode implementar a lógica dos favoritos
  }

  quickView(product: Product): void {
    this.openProductModal(product);
  }

  getSaleProducts(): Product[] {
    return this.allProducts.filter(p => p.originalPrice).slice(0, 4);
  }

  sendContactMessage(): void {
    console.log('Mensagem de contato enviada');
    // Aqui você pode implementar a lógica de envio de mensagem
  }

  // Header methods
  openCart(): void {
    console.log('Abrindo carrinho de compras');
    // Aqui você pode implementar a navegação para o carrinho
  }

  goToLogin(): void {
    console.log('Navegando para tela de login');
    this.router.navigate(['/login']);
  }

  // Modal methods
  openProductModal(product: Product): void {
    this.selectedProduct = product;
    this.selectedSize = 'M';
    this.selectedColor = '#ff6b6b';
    this.quantity = 1;
    document.body.style.overflow = 'hidden';
  }

  closeProductModal(): void {
    this.selectedProduct = null;
    document.body.style.overflow = 'auto';
  }

  selectSize(size: string): void {
    this.selectedSize = size;
  }

  selectColor(color: string): void {
    this.selectedColor = color;
  }

  increaseQuantity(): void {
    if (this.quantity < 10) {
      this.quantity++;
    }
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCartFromModal(): void {
    if (this.selectedProduct) {
      console.log('Produto adicionado ao carrinho da modal:', {
        product: this.selectedProduct.name,
        size: this.selectedSize,
        color: this.selectedColor,
        quantity: this.quantity
      });
      this.closeProductModal();
    }
  }
} 