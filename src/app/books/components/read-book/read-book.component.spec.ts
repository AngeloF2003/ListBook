import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadBookComponent } from './read-book.component';

describe('ReadBookComponent', () => {
  let component: ReadBookComponent;
  let fixture: ComponentFixture<ReadBookComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReadBookComponent]
    });
    fixture = TestBed.createComponent(ReadBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
