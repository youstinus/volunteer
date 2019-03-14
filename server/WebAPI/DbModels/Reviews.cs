using System;
using System.Collections.Generic;

namespace WebAPI.DbModels
{
    public partial class Reviews
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int? Grade { get; set; }
        public string Text { get; set; }
        public DateTime? Created { get; set; }
        public int OrganizationId { get; set; }

        public virtual Organizations Organization { get; set; }
    }
}
