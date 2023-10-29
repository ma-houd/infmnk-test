import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentifySpeciesDialogComponent } from './identify-species-dialog.component';

describe('IdentifySpeciesDialogComponent', () => {
  let component: IdentifySpeciesDialogComponent;
  let fixture: ComponentFixture<IdentifySpeciesDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IdentifySpeciesDialogComponent]
    });
    fixture = TestBed.createComponent(IdentifySpeciesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
