import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FetchdataPage } from './fetchdata.page';

describe('FetchdataPage', () => {
  let component: FetchdataPage;
  let fixture: ComponentFixture<FetchdataPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FetchdataPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
