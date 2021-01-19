using System;
using System.Collections.Generic;

namespace OllertServer.Models.InputModels
{
    public class TaskUpdateDto
    {
        public string Name { get; set; }
        public Guid? ColumnId { get; set; }
        public int? RelativeOrder { get; set; }
    }
}