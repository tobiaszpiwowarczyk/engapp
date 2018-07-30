import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabMenuItemComponent } from './tab-menu-item.component';

describe('TabMenuItemComponent', () => {
  let component: TabMenuItemComponent;
  let fixture: ComponentFixture<TabMenuItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabMenuItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
