using System;

namespace OllertServer.Models.Dtos
{
    public class TaskDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public Guid ColumnId { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}