using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Vendinha.Api.Data;
using Vendinha.Api.Models;

namespace Vendinha.Api.Controllers
{
    [Route("api/[controller]/")]
    [ApiController]
    public class dividaController : ControllerBase
    {
        private readonly ApiDbContext _context;

        public dividaController(ApiDbContext context)
        {
            _context = context;
        }

        // GET: api/divida
        [EnableCors("AnotherPolicy")]
        [HttpGet("pegartodos/{id}")]
        public async Task<ActionResult<IEnumerable<Divida>>> GetDividaTodos(int id)
        {
            return await _context.Divida.Where(d => d.ClienteId == id).ToListAsync();
        }

        // GET: api/divida/5
        [EnableCors("AnotherPolicy")]
        [HttpGet("pegarum/{id}")]
        public async Task<ActionResult<Divida>> GetDivida(int id)
        {
            var divida = await _context.Divida.FindAsync(id);

            if (divida == null)
            {
                return NotFound();
            }

            return divida;
        }

        // PUT: api/divida/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [EnableCors("AnotherPolicy")]
        [HttpPut("editar/{id}")]
        public async Task<IActionResult> PutDivida(int id, Divida divida)
        {
           var _divida = await _context.Divida.FirstOrDefaultAsync(d => d.Id == id);

            if (_divida is null) return NotFound();

            _divida.Descricao = divida.Descricao;
            _divida.Valor = divida.Valor;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DividaExists(id))
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

        // POST: api/divida
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [EnableCors("AnotherPolicy")]
        [HttpPost("cadastrar")]
        public async Task<ActionResult<Divida>> PostDivida(Divida divida)
        {
            _context.Divida.Add(divida);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDivida", new { id = divida.Id }, divida);
        }

        // DELETE: api/divida/5
        [EnableCors("AnotherPolicy")]
        [HttpDelete("deletar/{id}")]
        public async Task<IActionResult> DeleteDivida(int id)
        {
            var divida = await _context.Divida.FindAsync(id);
            if (divida == null)
            {
                return NotFound();
            }

            _context.Divida.Remove(divida);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DividaExists(int id)
        {
            return _context.Divida.Any(e => e.Id == id);
        }
    }
}
