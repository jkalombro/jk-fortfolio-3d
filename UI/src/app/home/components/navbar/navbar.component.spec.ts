import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NavbarComponent } from './navbar.component';
import { NAV_LINKS } from '../../../shared/constants';

describe('NavbarComponent', () => {
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(NavbarComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render all NAV_LINKS', () => {
    const links = fixture.debugElement.queryAll(By.css('nav.desktop li a'));
    expect(links.length).toBe(NAV_LINKS.length);
  });

  it('should render correct anchor hrefs', () => {
    const links = fixture.debugElement.queryAll(By.css('nav.desktop li a'));
    NAV_LINKS.forEach((navLink, i) => {
      expect(links[i].nativeElement.getAttribute('href')).toBe(navLink.link);
    });
  });

  it('should have not-scrolled class initially', () => {
    const nav = fixture.debugElement.query(By.css('.navbar'));
    expect(nav.nativeElement.classList).toContain('not-scrolled');
  });

  it('should apply scrolled class after scroll event', () => {
    Object.defineProperty(window, 'scrollY', { value: 100, configurable: true });
    window.dispatchEvent(new Event('scroll'));
    fixture.detectChanges();
    const nav = fixture.debugElement.query(By.css('.navbar'));
    expect(nav.nativeElement.classList).toContain('scrolled');
  });

  it('should render logo text', () => {
    const logo = fixture.debugElement.query(By.css('.logo'));
    expect(logo.nativeElement.textContent.trim()).toBeTruthy();
  });
});
