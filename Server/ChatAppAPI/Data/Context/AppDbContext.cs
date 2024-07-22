﻿using ChatAppAPI.Data.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace ChatAppAPI.Data.Context
{
    public class AppDbContext : IdentityDbContext<ManageUser>
    {
        public AppDbContext(DbContextOptions options):base(options) { }

        public DbSet<Message> Messages { get; set; }
        public DbSet<Room> Rooms { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Message>(entity =>
            {
                entity.HasOne(m => m.Sender)
                      .WithMany(u => u.MessagesSent)
                      .HasForeignKey(m => m.SenderId)
                      .OnDelete(DeleteBehavior.NoAction);

                entity.HasOne(m => m.Room)
                      .WithMany(r => r.Messages)
                      .HasForeignKey(m => m.RoomId)
                      .OnDelete(DeleteBehavior.NoAction);
            });

            builder.Entity<Room>(entity =>
            {
                entity.HasOne(r => r.Admin)
                      .WithMany(u => u.Rooms)
                      .HasForeignKey(r => r.AdminId)
                      .OnDelete(DeleteBehavior.NoAction);

                entity.HasIndex(r => r.RoomName).IsUnique();

                entity.Property(r => r.RoomName)
                      .HasMaxLength(100)
                      .IsRequired();
            });

            builder.Entity<ManageUser>(entity =>
            {
                entity.Property(u => u.FullName)
                      .HasMaxLength(150)
                      .IsRequired();
            });
        }

    }
}
