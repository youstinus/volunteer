namespace WebAPI.Models
{
    public class SavedProject
    {
        public Project Project { get; set; }
        public Volunteer Volunteer { get; set; }

        public long ProjectId { get; set; }
        public long VolunteerId { get; set; }
    }
}
