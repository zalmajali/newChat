import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditcontactPage } from './editcontact.page';

describe('EditcontactPage', () => {
  let component: EditcontactPage;
  let fixture: ComponentFixture<EditcontactPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditcontactPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
