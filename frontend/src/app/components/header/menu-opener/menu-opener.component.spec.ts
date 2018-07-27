import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuOpenerComponent } from './menu-opener.component';

describe('MenuOpenerComponent', () => {
  let component: MenuOpenerComponent;
  let fixture: ComponentFixture<MenuOpenerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuOpenerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuOpenerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
