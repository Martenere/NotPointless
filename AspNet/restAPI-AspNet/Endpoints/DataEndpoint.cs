﻿using System.Reflection.Metadata.Ecma335;
using System.Security.Claims;
using restAPI_AspNet.Model;
using restAPI_AspNet.Repositories;

namespace restAPI_AspNet.Endpoints
{
    public static class DataEndpoint
    {
        
        
        public static void ConfigureEndpoints(this WebApplication app)
        {
            var root = app.MapGroup("points");
            root.MapGet("/{amount:int}Randompoint", ReturnPoints);

            root.MapPost("/", AddPointAsync);
            root.MapGet("/", GetAllPointsAsync);
            root.MapGet("/{id:int}", GetPointByIdAsync);
            root.MapPut("/{id:int}", UpdatePointAsync);
            root.MapDelete("/{id:int}", DeletePointAsync);
        }

        public static async Task<IResult> ReturnPoints(int amount)
        { 
            List<Point> Points = new List<Point>();
            for (int i = 0; i < amount; i++)
            {
                Random rnd = new Random();
                Points.Add(new Point(){x = rnd.Next(100), y = rnd.Next(100)});
            }

            return TypedResults.Ok(Points);
        }

        // CRUD operation handlers
        private static async Task<IResult> AddPointAsync(IPointRepository repo, Point point)
        {
            var addedPoint = await repo.AddPointAsync(point);
            return TypedResults.Created($"/points/{addedPoint.Id}", addedPoint);
        }

        private static async Task<IResult> GetAllPointsAsync(IPointRepository repo)
        {
            var points = await repo.GetAllPointsAsync();
            return TypedResults.Ok(points);
        }

        private static async Task<IResult> GetPointByIdAsync(IPointRepository repo, int id)
        {
            var point = await repo.GetPointByIdAsync(id);
            return point != null ? TypedResults.Ok(point) : TypedResults.NotFound();
        }

        private static async Task<IResult> UpdatePointAsync(IPointRepository repo, int id, Point point)
        {
            var updatedPoint = await repo.UpdatePointAsync(id, point);
            return updatedPoint != null ? TypedResults.Ok(updatedPoint) : TypedResults.NotFound();
        }

        private static async Task<IResult> DeletePointAsync(IPointRepository repo, int id)
        {
            var deletedPoint = await repo.DeletePointAsync(id);
            return deletedPoint != null ? TypedResults.Ok(deletedPoint) : TypedResults.NotFound();
        }

    }
}
