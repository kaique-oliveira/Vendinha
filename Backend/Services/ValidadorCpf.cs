using System.Text.RegularExpressions;

namespace Vendinha.Api.Services
{
    public static class ValidadorCpf
    {
        private static string Cpf { get; set; }

        public static bool validarCpf(string cpf)
        {
            Cpf = Regex.Replace(cpf, @"[^\d]", "");

            if (validarFomato(cpf) && cpf.Length == 14 && !Regex.Match(Cpf, @"(\d)\1{8}").Success)
            {
                int multiplicado = 0;
                int multiplicador = 10;
                string primeiroNum;
                string segundoNum;

                for (int index = 0; index < 9; index++)
                {
                    multiplicado += (multiplicador * int.Parse(Cpf.Substring(index, 1)));
                    multiplicador--;
                }

                primeiroNum = (((multiplicado * 10) % 11) == 10 ? 0 : ((multiplicado * 10) % 11)).ToString();


                multiplicado = 0;
                multiplicador = 11;

                for (int index = 0; index < 10; index++)
                {
                    multiplicado += (multiplicador * int.Parse(Cpf.Substring(index, 1)));
                    multiplicador--;
                }

                segundoNum = (((multiplicado * 10) % 11) == 10 ? 0 : ((multiplicado * 10) % 11)).ToString();

                string finalCpf = Cpf.Substring(9, 2);



                if (finalCpf == (primeiroNum + segundoNum))
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else
            {
                return false;
            }
        }

        public static bool validarFomato(string cpf)
        {
            if(Regex.Match(cpf, @"[0-9]{3}\.[0-9]{3}\.[0-9]{3}\-[0-9]{2}").Success)
            {
                return true;
            }
            else
            {
                return false;

            }
        }
    }
}

