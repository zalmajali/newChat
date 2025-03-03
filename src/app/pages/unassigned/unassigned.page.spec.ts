import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UnassignedPage } from './unassigned.page';

describe('UnassignedPage', () => {
  let component: UnassignedPage;
  let fixture: ComponentFixture<UnassignedPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UnassignedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
