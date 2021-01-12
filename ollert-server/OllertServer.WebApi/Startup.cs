using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;

using AutoMapper;

using OllertServer.Models.Entities;
using OllertServer.Repositories;
using OllertServer.Services.Interfaces;
using OllertServer.Services.Implementations;
using OllertServer.Services.MapperProfiles;

namespace OllertServer.WebApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration, IWebHostEnvironment env)
        {
            Configuration = configuration;
            _env = env;
        }

        public IConfiguration Configuration { get; }
        private readonly IWebHostEnvironment _env;

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            // services.AddEntityFrameworkNpgsql();
            services.AddAutoMapper(typeof(DomainProfile));

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "OllertServer.WebApi", Version = "v1" });
            });

            // Database connection
            var connectionString = Configuration.GetConnectionString("OllertDb");
            services.AddDbContext<PropertyContext>(options => options.UseNpgsql(
                connectionString,
                x => x.MigrationsAssembly("OllertServer.Repositories")
            ));

            // Add our services
            services.AddScoped<IBoardService, EFBoardService>();
            services.AddScoped<IAccountService, EFAccountService>();
            services.AddScoped<IColumnService, EFColumnService>();
            services.AddScoped<ITaskService, EFTaskService>();

            // Add Identity
            services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<PropertyContext>()
                .AddDefaultTokenProviders();

            // Identity settings
            services.Configure<IdentityOptions>(options =>
            {
                options.User.RequireUniqueEmail = true;
                // Password requirements override
                options.Password.RequireDigit = false;
            });

            // Add jwt authentication
            JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear(); // => remove default claims
            services
                .AddAuthentication(options =>
                {
                    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

                })
                .AddJwtBearer(cfg =>
                {
                    if (_env.IsDevelopment())
                    {
                        cfg.RequireHttpsMetadata = false;
                    }
                    // https://docs.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.authentication.jwtbearer.jwtbeareroptions.savetoken?view=aspnetcore-5.0#Microsoft_AspNetCore_Authentication_JwtBearer_JwtBearerOptions_SaveToken
                    cfg.SaveToken = true;
                    cfg.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidIssuer = Configuration["JwtIssuer"],
                        ValidAudience = Configuration["JwtIssuer"],
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["JwtKey"])),
                        ClockSkew = TimeSpan.Zero // remove delay of token when expires
                    };
                });

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "OllertServer.WebApi v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            // app.useCors...
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
