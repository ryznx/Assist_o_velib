import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StationsMapPage } from './stations-map.page';

describe('StationsMapPage', () => {
  let component: StationsMapPage;
  let fixture: ComponentFixture<StationsMapPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StationsMapPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StationsMapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
