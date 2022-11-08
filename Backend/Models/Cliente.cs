using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Vendinha.Api.Models
{
    public class Cliente
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required, StringLength(80)]
        public string Nome { get; set; }

        [Required]
        public string Cpf { get; set; }

        [Required]
        public DateTime DataNascimento { get; set; }
        public int Idade { get; set; }
        public string Foto { get; set; }
        public string Telefone { get; set; }

        public IList<Divida>? Dividas { get; set; }

        public override string ToString()
        {
            return "CPF Invalido";
        }
    }
}
