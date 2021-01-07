using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

using OllertServer.Models.Entities;

namespace OllertServer.Repositories
{
    public class PropertyContext : IdentityDbContext<ApplicationUser>
    {
        public DbSet<Board> Boards { get; set; }
        public PropertyContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // UUID generation in postgres
            modelBuilder.HasPostgresExtension("uuid-ossp");

            modelBuilder.Entity<Board>(eb =>
            {
                eb.HasKey(b => b.Id);
                eb.HasOne(b => b.User).WithMany(u => u.Boards).HasForeignKey(b => b.UserId);
                eb.Property(b => b.Id)
                    .HasDefaultValueSql("uuid_generate_v4()");
                eb.Property(b => b.CreatedAt).ValueGeneratedOnAdd().HasDefaultValueSql("current_timestamp");
            });
        }
    }
}