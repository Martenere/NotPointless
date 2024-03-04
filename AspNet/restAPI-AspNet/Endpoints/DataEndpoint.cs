using System.Reflection.Metadata.Ecma335;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using restAPI_AspNet.Model;
using restAPI_AspNet.Repositories;

namespace restAPI_AspNet.Endpoints
{
    public record PointPayload(string x, string y);

    public static class DataEndpoint
    {
        
        
        public static void ConfigureEndpoints(this WebApplication app)
        {
            var root = app.MapGroup("points");
            root.MapGet("/{amount:int}Randompoint", RandomPoints);

            root.MapPost("/", AddPointAsync);
            root.MapGet("/", GetAllPointsAsync);
            root.MapGet("/{id:int}", GetPointByIdAsync);
            root.MapPut("/{id:int}", UpdatePointAsync);
            root.MapDelete("/{id:int}", DeletePointAsync);
        }
        // Send random points
        [Authorize]
        public static async Task<IResult> RandomPoints(int amount)
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
        //Enable when auth implemented in frontend
        //[Authorize]
        private static async Task<IResult> AddPointAsync(IPointRepository repo, PointPayload pointPayload)
        {
            // Try to parse x and y to integers
            bool isXValid = int.TryParse(pointPayload.x, out int x);
            bool isYValid = int.TryParse(pointPayload.y, out int y);

            if (!isXValid || !isYValid)
            {
                // If x or y can't be parsed to an integer, return a bad request
                return TypedResults.BadRequest(new {Code="InvalidData", Description = "x and y must be valid integers" });
            }

            // If x and y are valid integers, proceed to add the point
            Point point = new Point() { x = x, y = y };
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

        private static async Task<IResult> UpdatePointAsync(IPointRepository repo, int id, PointPayload pointPayload)
        {
            // Try to parse x and y to integers
            bool isXValid = int.TryParse(pointPayload.x, out int payloadX);
            bool isYValid = int.TryParse(pointPayload.y, out int payloadY);

            if (!isXValid || !isYValid)
            {
                // If x or y can't be parsed to an integer, return a bad request
                return TypedResults.BadRequest(new { Code = "InvalidData", Description = "x and y must be valid integers" });
            }

            Point point = new Point()
            {
                Id = id,
                x = payloadX,
                y = payloadY,
            };
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
