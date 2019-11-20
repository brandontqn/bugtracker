﻿using System;
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
using UserManagementService.Services;

namespace UserManagementService
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors();
            //services.AddCors(options =>
            //{
            //    options.AddDefaultPolicy(builder => builder
            //    .AllowAnyOrigin()
            //    .AllowAnyHeader()
            //    .AllowAnyMethod());
            //});

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            //services.AddSingleton<RegistrationService>();

            //services.AddSingleton(s =>
            //    new RegistrationService(Configuration["Frontend:baseLocalHost"], 
            //                            Configuration["Backend:TokenService:iis"], 
            //                            Configuration["Backend:Okta:Domain"],
            //                            Configuration["Backend:Okta:Token"],
            //                            Configuration["Backend:Email:username"],
            //                            Configuration["Backend:Email:password"]));

            services.AddSingleton(s =>
                new RegistrationService(Configuration.GetSection("Frontend").GetSection("baseLocalHost").Value,
                                        //Configuration.GetSection("Backend").GetSection("TokenService").GetSection("iis").Value,
                                        Configuration.GetSection("Backend").GetSection("TokenService").GetSection("docker").Value,
                                        Configuration.GetSection("Backend").GetSection("Okta").GetSection("Domain").Value,
                                        Configuration.GetSection("Backend").GetSection("Okta").GetSection("Token").Value,
                                        Configuration.GetSection("Backend").GetSection("Email").GetSection("username").Value,
                                        Configuration.GetSection("Backend").GetSection("Email").GetSection("password").Value));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
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
