using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using UserManagementService.Models;
using UserManagementService.Services;

namespace UserManagementService
{
    public class Startup
    {
        private readonly IHostingEnvironment _env;

        public Startup(IConfiguration configuration, IHostingEnvironment env)
        {
            Configuration = configuration;
            _env = env;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors();

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            if (_env.IsDevelopment())
            {
                services.AddSingleton(s =>
                    new RegistrationService(Configuration.GetSection("Frontend").GetSection("baseLocalHost").Value,
                                            Configuration.GetSection("Backend").GetSection("TokenService").GetSection("iis").Value,
                                            Configuration.GetSection("Backend").GetSection("Okta").GetSection("Domain").Value,
                                            Configuration.GetSection("Backend").GetSection("Okta").GetSection("Token").Value,
                                            Configuration.GetSection("Backend").GetSection("Email").GetSection("username").Value,
                                            Configuration.GetSection("Backend").GetSection("Email").GetSection("password").Value));
            }
            else if (_env.IsStaging())
            {
                services.AddSingleton(s =>
                    new RegistrationService(Configuration.GetSection("Frontend").GetSection("baseLocalHost").Value,
                                            Configuration.GetSection("Backend").GetSection("TokenService").GetSection("docker").Value,
                                            Configuration.GetSection("Backend").GetSection("Okta").GetSection("Domain").Value,
                                            Configuration.GetSection("Backend").GetSection("Okta").GetSection("Token").Value,
                                            Configuration.GetSection("Backend").GetSection("Email").GetSection("username").Value,
                                            Configuration.GetSection("Backend").GetSection("Email").GetSection("password").Value));
            }
            else if (_env.IsProduction())
            {
                services.AddSingleton(s =>
                    new RegistrationService(Configuration.GetSection("Frontend").GetSection("baseLocalHost").Value,
                                            Configuration.GetSection("Backend").GetSection("TokenService").GetSection("k8s").Value,
                                            Configuration.GetSection("Backend").GetSection("Okta").GetSection("Domain").Value,
                                            Configuration.GetSection("Backend").GetSection("Okta").GetSection("Token").Value,
                                            Configuration.GetSection("Backend").GetSection("Email").GetSection("username").Value,
                                            Configuration.GetSection("Backend").GetSection("Email").GetSection("password").Value));
            }
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app)
        {
            if (_env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseCors(builder => builder
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader());

            app.UseHttpsRedirection();
            app.UseMvc();
        }
    }
}
