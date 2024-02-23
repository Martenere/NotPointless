
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using restAPI_AspNet.Model;

namespace YourProjectNamespace.Data
    {
        public class DataContext : DbContext
        {
            private string _connectionString;

            public DataContext(DbContextOptions<DataContext> options) : base(options)
            {
                //var configuration = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build();
                //_connectionString = configuration.GetValue<string>("ConnectionStrings:DefaultConnectionString")!;
                this.Database.EnsureCreated();
            }

            protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            {
            //optionsBuilder.UseNpgsql(_connectionString);
            optionsBuilder.UseInMemoryDatabase("PointDatabase");
                optionsBuilder.EnableSensitiveDataLogging(true);
            }

            protected override void OnModelCreating(ModelBuilder modelBuilder)
            {
            // This method can be used to configure your model for the DbContext
            // For example, setting default values, configuring composite keys, etc.

            // Example: Setting a default value for a property in a generic entity
            //modelBuilder.Entity<YourEntity>()
            //    .Property(b => b.CreatedAt)
            //    .HasDefaultValueSql("CURRENT_TIMESTAMP");

            //// Example: Configuring a composite key for a generic entity
            //modelBuilder.Entity<YourEntity>().HasKey(e => new { e.KeyPart1, e.KeyPart2 });

            // If you have seed data, consider placing it in a separate class or method for clarity
            // Seeder.Seed(modelBuilder);

            List<Point> InitPoints = new List<Point>();
            for (int i = 0; i < 10; i++)
            {
                Random rnd = new Random();
                InitPoints.Add(new Point() { Id = i+1, x = rnd.Next(100), y = rnd.Next(100) }); ;
            }
            modelBuilder.Entity<Point>().HasData(InitPoints);
        }

            // Define your DbSet properties here
            public DbSet<Point> Points{ get; set; }

            // Remove or comment out the specific DbSet properties related to cinema
            // public DbSet<Customer> Customers { get; set; }
            // public DbSet<Booking> Bookings { get; set; }
            // public DbSet<Screen> Screens { get; set; }
            // public DbSet<Seat> Seats { get; set; }
            // public DbSet<Ticket> Tickets { get; set; }
            // public DbSet<Movie> Movies { get; set; }
            // public DbSet<Screening> Screenings { get; set; }
        }
    }
