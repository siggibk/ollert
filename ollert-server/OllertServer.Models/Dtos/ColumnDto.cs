using System;

namespace OllertServer.Models.Dtos
{
    // Only get necessary for dtos?
    public class ColumnDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}