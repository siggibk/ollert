using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace OllertServer.Models.Entities
{
    public class ApplicationUser : IdentityUser
    {
        public IList<Board> Boards { get; set; }
    }
}