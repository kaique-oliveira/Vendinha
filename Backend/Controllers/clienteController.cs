using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Vendinha.Api.Data;
using Vendinha.Api.Models;
using Vendinha.Api.Services;

namespace Vendinha.Api.Controllers
{
    [Route("api/[controller]/")]
    [ApiController]
    public class clienteController : ControllerBase
    {
        private readonly ApiDbContext _context;

        public clienteController(ApiDbContext context)
        {
            _context = context;
        }

        // GET: api/cliente
        [EnableCors("AnotherPolicy")]
        [HttpGet("pegartodos")]
        public async Task<ActionResult<IEnumerable<Cliente>>> GetCliente()
        {

            return await _context.Cliente.ToListAsync();

    
        }

        // GET: api/cliente/5
        [EnableCors("AnotherPolicy")]
        [HttpGet("pegarum/{id}")]
        public async Task<ActionResult<Cliente>> GetCliente(int id)
        {
            var cliente = await _context.Cliente.FirstOrDefaultAsync(c => c.Id == id);


            if (cliente == null)
            {
                return NotFound();
            }

            return cliente;
        }

        // PUT: api/cliente/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
         [EnableCors("AnotherPolicy")]
        [HttpPut("editar/{id}")]
        public async Task<IActionResult> PutCliente(int id, Cliente cliente)
        {
            if (id != cliente.Id)
            {
                return BadRequest();
            }

            var _cliente = await _context.Cliente.FirstOrDefaultAsync(c => c.Id == cliente.Id);

            _cliente.Nome = cliente.Nome;
            _cliente.Cpf = cliente.Cpf;
            _cliente.DataNascimento = cliente.DataNascimento;
            _cliente.Idade = ClienteIdade.CalcularIdade(cliente.DataNascimento);
            _cliente.Foto = cliente.Foto;
            _cliente.Telefone = cliente.Telefone;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClienteExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/cliente
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [EnableCors("AnotherPolicy")]
        [HttpPost("cadastrar")]
        public async Task<ActionResult<Cliente>> PostCliente(Cliente cliente)
        {
            cliente.Idade = ClienteIdade.CalcularIdade(cliente.DataNascimento);

            if (ValidadorCpf.validarCpf(cliente.Cpf))
            {
                _context.Cliente.Add(cliente);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetCliente", new { id = cliente.Id }, cliente);
            }
            else
            {
                return BadRequest();
            }
          
        }

        // DELETE: api/cliente/5
         [EnableCors("AnotherPolicy")]
        [HttpDelete("deletar/{id}")]
        public async Task<IActionResult> DeleteCliente(int id)
        {

            //var cliente = await _context.Cliente.FindAsync(id);
            var cliente = await _context.Cliente.Where(c => c.Id == id).Include(c => c.Dividas).FirstOrDefaultAsync();

            if (cliente == null)
            {
                return NotFound();
            }

            foreach (var item in cliente.Dividas)
            {
                _context.Remove(item);
            }

            _context.Remove(cliente);

            await _context.SaveChangesAsync();

            return NoContent();
        }



        private bool ClienteExists(int id)
        {
            return _context.Cliente.Any(e => e.Id == id);
        }
    }
}
