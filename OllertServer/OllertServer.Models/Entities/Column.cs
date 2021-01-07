using System;
using System.Collections.Generic;

namespace OllertServer.Models.Entities
{
    public class Column
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public DateTime CreatedAt { get; set; }

        // foreign keys
        public Guid BoardId { get; set; }

        // navigation property
        public Board Board { get; set; }
        public IList<Task> Tasks { get; set; }
    }
}