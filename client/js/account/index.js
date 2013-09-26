/*
 * client/js/account/index.js
 */

'use strict';

var angular = require('angular'),
    rhtml = require('rhtml');

var ngModule = angular.module('app.account', []);

// Routes
ngModule.config(function ($stateProvider, securityProvider) {
  $stateProvider
    .state('app.account', {
      abstract: true,
      url: '/account',
      resolve: {
        user: securityProvider.requireUser
      },
      views: {
        '@': {
          controller: '_LayoutCtrl',
          template: rhtml('./templates/_layout.html')
        }
      }
    })
    .state('app.account.summary', {
      url: '/summary',
      views: {
        '@app.account': {
          controller: 'SummaryCtrl',
          template: rhtml('./templates/summary.html')
        }
      }
    });
});

// Redirections
ngModule.run(function ($rootScope, $state, route) {
  route.redirect($rootScope, $state, {
    '/account': 'app.account.summary'
  });
});

// Controllers
require('./controllers/_layout')(ngModule);
require('./controllers/summary')(ngModule);
