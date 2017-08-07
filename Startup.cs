using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using chatbot_portal.Data;
using chatbot_portal.Services;
using chatbot_portal.Interfaces;
using WebSocketManager;
using chatbot_portal.Models.ConfigModels;
using AutoMapper;
using chatbot_portal.Repositories;

namespace chatbot_portal
{
    public class Startup
    {
       
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            if (env.IsDevelopment())
            {
               // builder.AddUserSecrets<Startup>();
            }
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }
        

        public void ConfigureServices(IServiceCollection services)
        {



            //EF dbset services
            services.AddDbContext<DatabaseContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            services.AddOptions();


            //Config options services
            //services.Configure<AppSecretConfig>(Configuration.GetSection("AppSecrets"));
            //services.Configure<ConnectionStringConfig>(Configuration.GetSection("ConnectionStrings"));
            services.Configure<ChatBotOptions>(Configuration);

            //chatbot token services
            services.AddScoped<ISecretTokenService, SecretTokenService>();
            services.AddScoped<IChannelConnectionService, ChannelConnectionService>();

            //repository services
            services.AddScoped<IActivityMessageRepository, ActivityMessageRepository>();
            services.AddScoped<IAgentRequestRepository, AgentRequestRepository>();
            services.AddScoped<IChannelRepository, ChannelRepository>();

            //Socket services
            services.AddWebSocketManager();
            //framework services.
            services.AddMvc();

        }

        
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory, IServiceProvider serviceProvider, DatabaseContext context)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();
            
            // HMR true for dev stage
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions {
                    HotModuleReplacement = true
                });
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            
            
            app.UseStaticFiles();
            app.UseWebSockets();
            
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
                /*
                routes.MapSpaFallbackRoute(
                    name: "spa-fallback",
                    defaults: new { controller = "Home", action = "Index" });      */
            });
            app.MapWebSocketManager("/socketconnection", serviceProvider.GetService<LiveRequestService>());



        }
    }
}
