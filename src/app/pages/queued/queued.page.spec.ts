import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QueuedPage } from './queued.page';

describe('QueuedPage', () => {
  let component: QueuedPage;
  let fixture: ComponentFixture<QueuedPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(QueuedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
