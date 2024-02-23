using Microsoft.EntityFrameworkCore;
using restAPI_AspNet.Model;
using restAPI_AspNet.Repositories;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using YourProjectNamespace.Data;

namespace restAPI_AspNet.Repositories
{
    public class PointRepository : IPointRepository
    {
        private readonly DataContext _context;

        public PointRepository(DataContext context)
        {
            _context = context;
        }

        // Create
        public async Task<Point> AddPointAsync(Point point)
        {
            await _context.Points.AddAsync(point);
            await _context.SaveChangesAsync();
            return point;
        }

        // Read
        public async Task<IEnumerable<Point>> GetAllPointsAsync()
        {
            return await _context.Points.ToListAsync();
        }

        public async Task<Point?> GetPointByIdAsync(int id)
        {
            return await _context.Points.FirstOrDefaultAsync(p => p.Id == id);
        }

        // Update
        public async Task<Point?> UpdatePointAsync(int id, Point point)
        {
            var existingPoint = await _context.Points.FirstOrDefaultAsync(p => p.Id == id);
            if (existingPoint != null)
            {
                existingPoint.x = point.x;
                existingPoint.y = point.y;

                _context.Points.Update(existingPoint);
                await _context.SaveChangesAsync();
                return existingPoint;
            }
            return null; // Point wasnt found
        }

        // Delete
        public async Task<Point?> DeletePointAsync(int id)
        {
            Point? point = await _context.Points.FirstOrDefaultAsync(p => p.Id == id);
            if (point != null)
            {
                Point res = point;
                _context.Points.Remove(point);
                await _context.SaveChangesAsync();
                return res;
            }
            return null;
            
        }
    }
}
