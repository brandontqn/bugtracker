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
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

using backend.Models;
using backend.Services;

//using Swashbuckle.AspNetCore.Swagger;

namespace backend
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
            services.AddControllers();

            services.Configure<WorkItemsDatabaseSettings>(
                Configuration.GetSection(nameof(WorkItemsDatabaseSettings)));

            services.AddSingleton<IWorkItemsDatabaseSettings>(sp =>
                sp.GetRequiredService<IOptions<WorkItemsDatabaseSettings>>().Value);

            services.AddSingleton<WorkItemService>();

            //services.AddSwaggerGen(c =>
            //{
            //    c.SwaggerDoc("v1", new Info {
            //        Title = "My Api",
            //        Version = "v1",
            //        Contact = new Contact()
            //        {
            //            Email = "brandontqnguyen@gmail.com",
            //            Name = "Brandon Nguyen"
            //        }
            //    });
            //});
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            //app.UseSwagger();
            //app.UseSwaggerUI(c =>
            //{
            //    c.SwaggerEndpoint($"/swagger/v1/swagger.json", "My API V1");
            //});
            
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
