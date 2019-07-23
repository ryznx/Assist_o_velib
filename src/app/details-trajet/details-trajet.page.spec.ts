import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsTrajetPage } from './details-trajet.page';

describe('DetailsTrajetPage', () => {
  let component: DetailsTrajetPage;
  let fixture: ComponentFixture<DetailsTrajetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsTrajetPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsTrajetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
