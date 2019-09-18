/**
 * @license
 * Copyright Mauricio Gemelli Vigolo and contributors.
 *
 * Use of this source code is governed by a MIT-style license that can be
 * found in the LICENSE file at https://github.com/mauriciovigolo/keycloak-angular/LICENSE
 */

import { TestBed, inject } from '@angular/core/testing';

import { KeycloakBearerInterceptor } from './keycloak-bearer.interceptor';
import { KeycloakService } from '../services/keycloak.service';
import { Observable } from 'rxjs';

describe('KeycloakBearerInterceptor', () => {
  let keycloakServiceSpy = jasmine.createSpyObj('keycloakServiceSpy', ['addTokenToHeader',
                                                'includedUrls', 'enableBearerInterceptor']);
  let httpRequestSpy = jasmine.createSpyObj('httpRequestSpy', ['method', 'url']);
  let next = jasmine.createSpyObj('next', ['handle']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        KeycloakBearerInterceptor,
        {
          provide: KeycloakService,
          useValue: keycloakServiceSpy
        },
        KeycloakService
      ]
    });
  });

  it('Should be created', inject(
    [KeycloakBearerInterceptor],
    (service: KeycloakBearerInterceptor) => {
      expect(service).toBeTruthy();
    }
  ));

  it('Should include bearer token if IncludedUrl match request', inject(
    [KeycloakBearerInterceptor, KeycloakService],
    (interceptor: KeycloakBearerInterceptor, service: KeycloakService) => {
      
      httpRequestSpy.method.and.returnValue('GET');
      httpRequestSpy.url.and.returnValue('private');
      next.handle.and.returnValue(new Observable());
      
      const loadIncludedUrls = service['loadIncludedUrls'];
      const result = loadIncludedUrls([
        { url: 'private', httpMethods: ['GET'] }
      ]);

      keycloakServiceSpy.includedUrls.and.returnValue(result);
      keycloakServiceSpy.enableBearerInterceptor.and.returnValue(true);

      interceptor.intercept(httpRequestSpy, next);
      expect(keycloakServiceSpy.addTokenToHeader).toHaveBeenCalled();
    }
  ));
  
  it('Should not include bearer token by default', inject(
    [KeycloakBearerInterceptor, KeycloakService],
    (interceptor: KeycloakBearerInterceptor, service: KeycloakService) => {
      
      httpRequestSpy.method.and.returnValue('GET');
      httpRequestSpy.url.and.returnValue('public');
      next.handle.and.returnValue(new Observable());
      
      const loadIncludedUrls = service['loadIncludedUrls'];
      const result = loadIncludedUrls([]);

      keycloakServiceSpy.includedUrls.and.returnValue(result);
      keycloakServiceSpy.enableBearerInterceptor.and.returnValue(true);

      interceptor.intercept(httpRequestSpy, next);
      expect(keycloakServiceSpy.addTokenToHeader).toHaveBeenCalledTimes(0);
    }
  ));

});
