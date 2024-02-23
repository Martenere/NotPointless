using restAPI_AspNet.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace restAPI_AspNet.Repositories
{
    public interface IPointRepository
    {
        // Create
        public Task<Point> AddPointAsync(Point point);

        // Read
        public Task<IEnumerable<Point>> GetAllPointsAsync();
        public Task<Point?> GetPointByIdAsync(int id);

        // Update
        public Task<Point?> UpdatePointAsync(int id, Point point);

        // Delete
        public Task<Point?> DeletePointAsync(int id);
    }
}
