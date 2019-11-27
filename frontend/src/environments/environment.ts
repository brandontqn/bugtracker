// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    apiEndpoints: {
        workItems: {
            iis: "https://localhost:44359/api/workitems",
            docker: "http://localhost:8080/api/workitems",
            app: "http://localhost:5001/api/workitems"
        },
        boards: {
            iis: "https://localhost:44359/api/boards",
            docker: "http://localhost:8080/api/boards",
            app: "http://localhost:5001/api/boards"
        },
        registration: {
            iis: "https://localhost:44321/api/registration",
            docker: "http://localhost:8082/api/registration",
            app: "http://localhost:5001/api/registration"
        }
    },
    okta: {
        issuer: "https://dev-662146.okta.com/oauth2/default",
        redirectUri: "http://localhost:4200/implicit/callback",
        clientId: "0oa1pj0whzk15BvVH357",
        pkce: true
    }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
