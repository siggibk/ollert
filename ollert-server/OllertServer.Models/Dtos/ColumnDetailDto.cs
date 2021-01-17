using System;
using System.Collections.Generic;

namespace OllertServer.Models.Dtos
{
    // Only get necessary for dtos?
    public class ColumnDetailDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public DateTime CreatedAt { get; set; }

        public IList<TaskDto> Tasks { get; set; }
    }
}