import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { SpeciesService } from '@core/services/species.service';

@Component({
  selector: 'app-identify-species-dialog',
  templateUrl: './identify-species-dialog.component.html',
  styleUrls: ['./identify-species-dialog.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule
  ],
})
export class IdentifySpeciesDialogComponent implements OnInit {
  private speciesService = inject(SpeciesService);
  private cdRef = inject(ChangeDetectorRef);

  public identificationFormGroup!: FormGroup;
  
  public ngOnInit(): void {
    this.identificationFormGroup = this.createIdentificationFormGroup();
  }

  private createIdentificationFormGroup(): FormGroup {
    return new FormGroup({
      file: new FormControl<File | null>({value: null, disabled: false}, [Validators.required])
    });
  }

  public get fileControl(): FormControl {
    return this.identificationFormGroup.controls.file as FormControl
  }

  public onFileChange(event: any): void {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files?.item(0);
    
    this.fileControl.setValue(file);
    this.cdRef.markForCheck();
  }

  public identifyASpecies$(): void {
    const formData = new FormData();
    formData.append('file', this.fileControl.value);
    
    this.speciesService.identifyASpecies$(formData).subscribe(() => {
      this.speciesService.refreshSpeciesList$.next();
    });
  }
}

