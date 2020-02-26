export interface IAppConfig {
    development: {
        localhostEndpoints: {
            workItems: {
                iis: string;
                docker: string;
                app: string;
            },
            boards: {
                iis: string;
                docker: string;
                app: string;
            },
            registration: {
                iis: string;
                docker: string;
                app: string;
            }
        },
        okta: {
            issuer: string;
            redirectUri: string;
            clientId: string;
            pkce: boolean;
        }
    };
}
