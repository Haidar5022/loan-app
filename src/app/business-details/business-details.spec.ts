import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, provideRouter } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { provideAnimations } from '@angular/platform-browser/animations';

import { BusinessDetailsComponent, WizardStep } from './business-details';

describe('BusinessDetailsComponent', () => {
  let component: BusinessDetailsComponent;
  let fixture: ComponentFixture<BusinessDetailsComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BusinessDetailsComponent,
        ReactiveFormsModule,
        MatExpansionModule
      ],
      providers: [
        provideRouter([]), // RouterTestingModule ki jagah modern Angular router provider
        provideAnimations()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessDetailsComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with default values', () => {
    expect(component.businessForm).toBeDefined();
    expect(component.businessForm.get('companyName')?.value).toBe('Rumango');
  });

  it('should navigate to completed or active steps', () => {
    const navigateSpy = spyOn(router, 'navigate');
    const completedStep: WizardStep = {
      name: 'Verify Mobile Number',
      stage: 1,
      status: 'completed',
      route: '/verify-mobile-number'
    };

    component.navigateToStep(completedStep);

    expect(navigateSpy).toHaveBeenCalledWith(['/verify-mobile-number']);
  });

  it('should NOT navigate to pending steps', () => {
    const navigateSpy = spyOn(router, 'navigate');
    const pendingStep: WizardStep = {
      name: 'Director Details',
      stage: 5,
      status: 'pending',
      route: '/director-details'
    };

    component.navigateToStep(pendingStep);

    expect(navigateSpy).not.toHaveBeenCalled();
  });
});

function spyOn(router: Router, arg1: string) {
  throw new Error('Function not implemented.');
}
