using Microsoft.EntityFrameworkCore;
using PMS.BO;
using PMS.SERVICE;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.SERVICE
{
    public class DataContext : DbContext
    {
        public DataContext()
        { }
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        { }
        public DbSet<User> Users { get; set; }
        public DbSet<Team> Teams { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<ProjectTask> ProjectTasks { get; set; }
        public DbSet<ActivityLog> ActivityLogs { get; set; }
        public DbSet<TimeTracking> TimeTrackings { get; set; }
        public DbSet<Milestone> Milestones { get; set; }
        public DbSet<Resource> Resources { get; set; }
        public DbSet<Chat> Chats { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //    // Many-to-Many (User ↔ Team)
            //    modelBuilder.Entity<User>()
            //        .HasMany(u => u.Teams)
            //        .WithMany(t => t.Users);

            //    // One-to-Many (Team ↔ Project)
            //    modelBuilder.Entity<Project>()
            //        .HasOne(p => p.Team)
            //        .WithMany(t => t.Projects)
            //        .HasForeignKey(p => p.TeamId);

            //    // One-to-Many (Project ↔ Task)
            //    modelBuilder.Entity<ProjectTask>()
            //        .HasOne(t => t.Project)
            //        .WithMany(p => p.ProjectTasks)
            //        .HasForeignKey(t => t.ProjectId);

            //    // One-to-Many (Project ↔ Milestone)
            //    modelBuilder.Entity<Milestone>()
            //        .HasOne(m => m.Project)
            //        .WithMany(p => p.Milestones)
            //        .HasForeignKey(m => m.ProjectId);

            //    // One-to-Many (ProjectTask ↔ Resource)
            //    modelBuilder.Entity<Resource>()
            //        .HasOne(r => r.ProjectTasks)
            //        .WithMany(t => t.Resources)
            //        .HasForeignKey(r => r.ProjectTaskId);

            //    // Self-Referencing (Chat ↔ User)
            //    modelBuilder.Entity<Chat>()
            //        .HasOne(c => c.Sender)
            //        .WithMany(u => u.ChatsSent)
            //        .HasForeignKey(c => c.SenderId);

            //    modelBuilder.Entity<Chat>()
            //        .HasOne(c => c.Receiver)
            //        .WithMany(u => u.ChatsReceived)
            //        .HasForeignKey(c => c.ReceiverId);

            //    // One-to-Many (User ↔ Notification)
            //    modelBuilder.Entity<Notification>()
            //        .HasOne(n => n.User)
            //        .WithMany(u => u.Notifications)
            //        .HasForeignKey(n => n.UserId);
            modelBuilder.Entity<Chat>()
         .HasOne(chat => chat.Sender)
         .WithMany()
         .HasForeignKey(chat => chat.SenderId)
         .OnDelete(DeleteBehavior.Restrict); // Optional, depending on delete behavior.

            modelBuilder.Entity<Chat>()
            .HasOne(chat => chat.Receiver)
            .WithMany()
            .HasForeignKey(chat => chat.ReceiverId)
            .OnDelete(DeleteBehavior.Restrict);

        }
         
    }
}
