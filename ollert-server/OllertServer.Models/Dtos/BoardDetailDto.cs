using System;
using System.Collections.Generic;

namespace OllertServer.Models.Dtos
{
    public class BoardDetailDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public DateTime CreatedAt { get; set; }

        public IList<ColumnDetailDto> Columns { get; set; }
    }
}