var isPublic = typeof window != "undefined";

/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
    System.config({
        paths: {
            // paths serve as alias
            'npm:': (isPublic) ? '/' : 'node_modules/'
        },
        meta: {
            'typescript': {
                "exports": "ts"
        }},
        // map tells the System loader where to look for things
        map: {
            // our app is within the app folder
            app: 'client',
            // angular bundles
            '@angular/core':                     'npm:@angular/core/bundles/core.umd.js',
            '@angular/common':                   'npm:@angular/common/bundles/common.umd.js',
            '@angular/compiler':                 'npm:@angular/compiler/bundles/compiler.umd.js',
            '@angular/platform-browser':         'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
            '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            '@angular/http':                     'npm:@angular/http/bundles/http.umd.js',
            '@angular/router':                   'npm:@angular/router/bundles/router.umd.js',
            '@angular/forms':                    'npm:@angular/forms/bundles/forms.umd.js',
            'angular2-jwt':                      'npm:angular2-jwt/angular2-jwt.js',
            'js-base64':                         'npm:js-base64/base64.js',
            'ng-semantic':                       'npm:ng-semantic',
            'ng2-charts':                        'npm:ng2-charts',
            'ng2-charts/ng2-charts' :            'npm:ng2-charts/ng2-charts.ts',
            'socket.io' :                        'npm:socket.io/lib/socket.js',
            'socket.io-client' :                 'npm:socket.io-client/socket.io.js',
            'angular-highcharts' :               'npm:angular-highcharts/dist/angular-highcharts.umd.js',
            'traceur' :                          'npm:traceur/bin/traceur.js',
            'highcharts' :                       'npm:highcharts/highcharts.js'
        },
        // packages tells the System loader how to load when no filename and/or no extension
        packages: {
            app: {
                main: './main.js',
                defaultExtension: 'js'
            },
            rxjs: {
                defaultExtension: 'js'
            },
            'angular2-in-memory-web-api': {
                main: './index.js',
                defaultExtension: 'js'
            },
            'ng-semantic': {
                main: 'ng-semantic',
                defaultExtension: 'js'
            },
            'angular2-highcharts': {
                main: './index.js',
                defaultExtension: 'js'
            }
        }
    });
})(this);
