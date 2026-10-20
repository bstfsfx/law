import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

interface MenuCard {
  name: string;
  note: string;
  image: string;
  alt: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  readonly address = '高雄市楠梓區右昌街727號, Kaohsiung, Taiwan';
  readonly phone = '07 365 7771';
  readonly mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(this.address)}`;
  readonly newsUrl = 'https://freshweekly.tw/?pn=vw&id=su5hi1po3da3#vw';
  mobileMenuOpen = false;

  menuItems: MenuCard[] = [
    {
      name: '招牌黑糖刨冰',
      note: '經典必吃・濃郁回甘',
      image: '/images/menu-signature.jpg',
      alt: '招牌黑糖刨冰，淋上香醇黑糖漿'
    },
    {
      name: '綜合刨冰',
      note: '多種配料・豐富滿足',
      image: '/images/menu-assorted.jpg',
      alt: '綜合刨冰搭配多款傳統配料'
    },
    {
      name: '抹茶紅豆刨冰',
      note: '清新茶香・經典相遇',
      image: '/images/menu-matcha.jpg',
      alt: '抹茶刨冰佐紅豆與傳統配料'
    },
    {
      name: '芒果沙冰',
      note: '芒果清甜・冰涼爽口',
      image: '/images/menu-mango.jpg',
      alt: '芒果沙冰搭配黑糖與配料'
    }
  ];

  ngOnInit(): void {
    void this.loadMenuFromApi();
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
  }

  async loadMenuFromApi(): Promise<void> {
    try {
      const response = await fetch('/api/menu', {
        headers: { Accept: 'application/json' }
      });
      if (!response.ok) return;

      const items: unknown = await response.json();
      if (Array.isArray(items) && items.length > 0) {
        this.menuItems = items as MenuCard[];
      }
    } catch {
      // The storefront remains useful with its bundled, read-only menu cards.
    }
  }
}
