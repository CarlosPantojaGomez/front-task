import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationPanelComponent } from './creation-panel.component';

xdescribe('CreationPanelComponent', () => {
  let component: CreationPanelComponent;
  let fixture: ComponentFixture<CreationPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreationPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreationPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
