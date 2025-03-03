import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddcontactPage } from './addcontact.page';

describe('AddcontactPage', () => {
  let component: AddcontactPage;
  let fixture: ComponentFixture<AddcontactPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddcontactPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
