/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CourseService } from './course.service';

describe('Service: CourseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CourseService]
    });
  });

  it('should ...', inject([CourseService], (service: CourseService) => {
    expect(service).toBeTruthy();
  }));
});
