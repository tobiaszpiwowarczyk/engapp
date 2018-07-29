import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabViewItemComponent } from './tab-view-item.component';

describe('TabViewItemComponent', () => {
  let component: TabViewItemComponent;
  let fixture: ComponentFixture<TabViewItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabViewItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabViewItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
