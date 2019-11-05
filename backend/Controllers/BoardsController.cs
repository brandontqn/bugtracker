using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace backend.Controllers
{
    [Route("api/[controller]")]
    public class BoardsController : Controller
    {
        private readonly ILogger<BoardsController> _logger;
        private readonly BoardService _boardService;

        public BoardsController(ILogger<BoardsController> logger, BoardService service)
        {
            _logger = logger;
            _boardService = service;
        }

        // GET: api/<controller>
        [HttpGet]
        public IEnumerable<Board> GetAll()
        {
            return _boardService.GetAll();
        }

        // GET api/<controller>/5
        [HttpGet("{id}")]
        public IActionResult GetOne([FromRoute]string id)
        {
            Board item = _boardService.Get(id);
            if (item == null)
            {
                return NotFound();
            }

            return Ok(item);
        }

        // POST api/<controller>
        [HttpPost]
        public IActionResult CreateBoard([FromBody]TitleDescription td)
        {
            Board item = _boardService.Create(td.title, td.description);
            if (item.id == null)
            {
                return BadRequest();
            }

            return Ok(item);
        }

        // PUT api/<controller>/5
        [HttpPatch("title/{id}")]
        public IActionResult UpdateTitle([FromRoute]string id, [FromBody]Text body)
        {
            Board item = _boardService.Get(id);
            if (item == null)
            {
                return NotFound();
            }

            return Ok(_boardService.UpdateTitle(id, body.text));
        }

        // DELETE api/<controller>/5
        [HttpDelete]
        public IActionResult DeleteAll()
        {
            _boardService.Remove();
            return Ok();
        }
    }
}
