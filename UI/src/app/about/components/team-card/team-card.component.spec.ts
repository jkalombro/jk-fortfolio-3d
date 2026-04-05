import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TeamCardComponent } from './team-card.component';
import type { TeamMember } from '../../store/models/team-member.model';

const MOCK_MEMBER: TeamMember = {
  id: '1',
  name: 'Jeric Alombro',
  role: 'Frontend Developer',
  bio: 'A developer with a passion for code.',
};

describe('TeamCardComponent', () => {
  let fixture: ComponentFixture<TeamCardComponent>;

  function setup(member: TeamMember = MOCK_MEMBER) {
    fixture = TestBed.createComponent(TeamCardComponent);
    fixture.componentRef.setInput('member', member);
    fixture.detectChanges();
    return fixture;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamCardComponent],
    }).compileComponents();
  });

  it('should create', () => {
    setup();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the member name', () => {
    setup();
    const el = fixture.debugElement.query(By.css('.team-card__name'));
    expect(el.nativeElement.textContent.trim()).toBe(MOCK_MEMBER.name);
  });

  it('should render the member role', () => {
    setup();
    const el = fixture.debugElement.query(By.css('.team-card__role'));
    expect(el.nativeElement.textContent.trim()).toBe(MOCK_MEMBER.role);
  });

  it('should render the member bio', () => {
    setup();
    const el = fixture.debugElement.query(By.css('.team-card__bio'));
    expect(el.nativeElement.textContent.trim()).toBe(MOCK_MEMBER.bio);
  });

  it('should render the avatar with the first letter of the name', () => {
    setup();
    const el = fixture.debugElement.query(By.css('.team-card__avatar'));
    expect(el.nativeElement.textContent.trim()).toBe(MOCK_MEMBER.name[0]);
  });

  it('should update rendered content when member input changes', () => {
    setup();
    const updated: TeamMember = { id: '2', name: 'Alice Smith', role: 'Designer', bio: 'Creative.' };
    fixture.componentRef.setInput('member', updated);
    fixture.detectChanges();
    const name = fixture.debugElement.query(By.css('.team-card__name'));
    expect(name.nativeElement.textContent.trim()).toBe('Alice Smith');
  });
});
