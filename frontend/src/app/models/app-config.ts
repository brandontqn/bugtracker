export interface IAppConfig {
    projectManagementServiceEnv: {
        docker: {
            workItems: string;
            boards: string;
            registration: string;
        },
        iis: {
            workItems: string;
            boards: string;
            registration: string;
        },
        app: {
            workItems: string;
            boards: string;
            registration: string;
        }
    };
}