using Microsoft.EntityFrameworkCore;
using Vendinha.Api.Data;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AnotherPolicy",
        policy =>
        {
            policy.WithOrigins("*")
                                .AllowAnyOrigin()
                                .AllowAnyHeader()
                                .AllowAnyMethod();
        });
});

// Add services to the container.

var connectionStringMysql = builder.Configuration.GetConnectionString("MysqlCon");
builder.Services.AddDbContext<ApiDbContext>(options => options.UseMySql(
        connectionStringMysql,
        Microsoft.EntityFrameworkCore.ServerVersion.Parse("10.4.24-MariaDB")
        )
);



builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors();

app.UseAuthorization();

app.MapControllers();


app.Run();
