/**
 * @license
 * Copyright Mauricio Gemelli Vigolo and contributors.
 *
 * Use of this source code is governed by a MIT-style license that can be
 * found in the LICENSE file at https://github.com/mauriciovigolo/keycloak-angular/LICENSE
 */

import { BearerInterceptorOption } from './bearer-interceptor-options';

import { KeycloakConfig } from '../interfaces/keycloak-config';
import { KeycloakInitOptions } from '../interfaces/keycloak-init-options';

/**
 * keycloak-angular initialization options.
 */
export interface KeycloakOptions {
  /**
   * Configs to init the keycloak-js library. If undefined, will look for a keycloak.json file
   * at root of the project.
   * If not undefined, can be a string meaning the url to the keycloak.json file or an object
   * of {@link KeycloakConfig}. Use this configuration if you want to specify the keycloak server,
   * realm, clientId. This is usefull if you have different configurations for production, stage
   * and development environments. Hint: Make use of Angular environment configuration.
   */
  config?: string | KeycloakConfig;
  /**
   * Options to initialize the adapter. Used by keycloak-js.
   */
  initOptions?: KeycloakInitOptions;
  /**
   * TODO: Add documentation to the new parameter
   */
  bearerInterceptorOptions?: BearerInterceptorOption[];
}
