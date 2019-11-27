export const environment = {
  production: true,
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
      redirectUri: "https://52.224.139.134/implicit/callback",
      clientId: "0oa1pj0whzk15BvVH357",
      pkce: true
  }
};