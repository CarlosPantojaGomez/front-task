import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpnsionPanelComponent } from './expnsion-panel.component';

xdescribe('ExpnsionPanelComponent', () => {
  let component: ExpnsionPanelComponent;
  let fixture: ComponentFixture<ExpnsionPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpnsionPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpnsionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
