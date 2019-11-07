export interface IAppConfig {
    projectManagementServiceEnv: {
        docker: {
            workItems: string;
            boards: string;
        },
        iis: {
            workItems: string;
            boards: string;
        },
        app: {
            workItems: string;
            boards: string;
        }
    };
}