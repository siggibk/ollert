using System.ComponentModel.DataAnnotations;

namespace OllertServer.Models.InputModels
{
    public class RegisterInputModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }
}