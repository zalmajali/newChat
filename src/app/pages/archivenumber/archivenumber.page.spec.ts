import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArchivenumberPage } from './archivenumber.page';

describe('ArchivenumberPage', () => {
  let component: ArchivenumberPage;
  let fixture: ComponentFixture<ArchivenumberPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivenumberPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
