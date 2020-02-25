using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;

using TokenGenerationService.Models;
using TokenGenerationService.Services;

using Swashbuckle.AspNetCore.Swagger;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;

//using Okta.AspNetCore;

namespace TokenGenerationService
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

            services.Configure<TokenDatabaseSettings>(
                Configuration.GetSection(nameof(TokenDatabaseSettings)));

            services.AddSingleton<ITokenDatabaseSettings>(sp =>
                sp.GetRequiredService<IOptions<TokenDatabaseSettings>>().Value);

            services.AddSingleton<TokenService>();

            //services.AddSwaggerGen(c =>
            //{
            //    c.SwaggerDoc("v1", new OpenApiInfo {
            //        Title = "My Api",
            //        Version = "v1"
            //    });
            //});

            //services.AddAuthentication(options =>
            //{
            //    options.DefaultAuthenticateScheme = OktaDefaults.ApiAuthenticationScheme;
            //    options.DefaultChallengeScheme = OktaDefaults.ApiAuthenticationScheme;
            //    options.DefaultSignInScheme = OktaDefaults.ApiAuthenticationScheme;
            //}).AddOktaWebApi(new OktaWebApiOptions()
            //{
            //    OktaDomain = Configuration.GetSection("Backend").GetSection("Okta").GetSection("Domain").Value
            //});


            services.AddHealthChecks();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors(builder => builder
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader());

            app.UseSwagger();
            //app.UseSwaggerUI(c =>
            //{
            //    c.SwaggerEndpoint($"/swagger/v1/swagger.json", "My API V1");
            //});

            //app.UseAuthentication();

            app.UseHttpsRedirection();

            app.UseHealthChecks("/health");
        }
    }
}
