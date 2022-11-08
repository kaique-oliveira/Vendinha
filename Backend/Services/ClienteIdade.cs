namespace Vendinha.Api.Services
{
    public class ClienteIdade
    {
        public static int CalcularIdade(DateTime dataNasc)
        {
            int idade = DateTime.Now.Year - dataNasc.Year;

            if (DateTime.Now.DayOfYear < dataNasc.DayOfYear)
            {
                idade = idade - 1;
            }

            return idade;
        }
    }
}
