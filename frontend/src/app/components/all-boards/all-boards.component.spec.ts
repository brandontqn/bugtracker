import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBoardsComponent } from './all-boards.component';

describe('BoardsComponent', () => {
  let component: AllBoardsComponent;
  let fixture: ComponentFixture<AllBoardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllBoardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllBoardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
