using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Vendinha.Api.Models
{
    public class Divida
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Descricao { get; set; }
        public decimal Valor { get; set; }
        public DateTime DataCompra { get; set; }
        [Required]
        public int ClienteId { get; set; }
    }
}
