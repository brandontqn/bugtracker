using System.Collections.Generic;
using ProjectManagementService.Models;
using ProjectManagementService.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ProjectManagementService.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
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
                return NotFound(id);
            }

            return Ok(item);
        }

        // POST api/<controller>
        [HttpPost]
        public IActionResult CreateBoard([FromBody]TitleDescription titleDescription)
        {
            Board item = _boardService.Create(titleDescription.title, titleDescription.description, null);
            if (item.id == null)
            {
                return BadRequest();
            }

            return Ok(item);
        }

        [HttpPatch]
        public IActionResult UpdateBoard([FromBody]Board updatedBoard)
        {
            Board item = _boardService.Get(updatedBoard.id);
            if(item == null)
            {
                return NotFound(updatedBoard.id);
            }
            return Ok(_boardService.Update(updatedBoard));
        }

        [HttpPut("items/add/{id}")]
        public IActionResult AddItem([FromRoute]string id, [FromBody]Text body)
        {
            Board item = _boardService.Get(id);
            if (item == null || item.itemIds.Contains(body.text))
            {
                return NotFound(id);
            }

            return Ok(_boardService.AddItem(id, body.text));
        }

        [HttpPut("items/delete/{id}")]
        public IActionResult DeleteItem([FromRoute]string id, [FromBody]Text body)
        {
            Board item = _boardService.Get(id);
            if (item == null || !item.itemIds.Contains(body.text))
            {
                return NotFound(id);
            }

            return Ok(_boardService.DeleteItem(id, body.text));
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteOne([FromRoute]string id)
        {
            Board item = _boardService.Get(id);
            if (item == null)
            {
                return NotFound(id);
            }

            _boardService.Remove(id);
            return Ok();
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
