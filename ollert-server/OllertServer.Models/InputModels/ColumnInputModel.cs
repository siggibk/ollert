using System;
using System.ComponentModel.DataAnnotations;

namespace OllertServer.Models.InputModels
{
    public class ColumnInputModel
    {
        public string Name { get; set; }
        [Required]
        public Guid BoardID { get; set; }
    }
}