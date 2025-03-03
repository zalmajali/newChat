import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatsarchivePage } from './chatsarchive.page';

describe('ChatsarchivePage', () => {
  let component: ChatsarchivePage;
  let fixture: ComponentFixture<ChatsarchivePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatsarchivePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
