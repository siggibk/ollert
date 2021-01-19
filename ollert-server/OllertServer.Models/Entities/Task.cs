using System;

namespace OllertServer.Models.Entities
{
    public class Task
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int RelativeOrder { get; set; }
        public DateTime CreatedAt { get; set; }

        // foreign keys
        public Guid ColumnId { get; set; }
        // navigation properties
        public Column Column { get; set; }

        // public String CreatedById { get; set; }
        // public ApplicationUser CreatedBy { get; set; }
    }
}