using System.ComponentModel.DataAnnotations;

namespace OllertServer.Models.InputModels
{
    public class BoardInputModel
    {
        [Required]
        public string Name { get; set; }
    }
}