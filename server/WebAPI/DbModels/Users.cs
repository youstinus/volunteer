using System;

namespace WebAPI.DbModels
{
    public partial class Users
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public int? Role { get; set; }
        public byte[] Hash { get; set; }
        public byte[] Salt { get; set; }
        public string Email { get; set; }
        public DateTime? Created { get; set; }

        public virtual Organizations Organizations { get; set; }
        public virtual Volunteers Volunteers { get; set; }
    }
}
