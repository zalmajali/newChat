import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatsarchivenewPage } from './chatsarchivenew.page';

describe('ChatsarchivenewPage', () => {
  let component: ChatsarchivenewPage;
  let fixture: ComponentFixture<ChatsarchivenewPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatsarchivenewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
