using System;

namespace OllertServer.Models.Entities
{
    public class Board
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public DateTime CreatedAt { get; set; }
        // foreign keys
        public string UserId { get; set; }
        public ApplicationUser User { get; set; }
    }
}