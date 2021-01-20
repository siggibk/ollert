using System;

namespace OllertServer.Models.InputModels
{
    public class TaskInputModel
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string ColumnId { get; set; }
        public double RelativeOrder { get; set; }
    }
}