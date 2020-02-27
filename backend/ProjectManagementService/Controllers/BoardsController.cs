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

        #region CREATE
        [HttpPost]
        public ActionResult<Board> CreateBoard([FromBody]BoardMessage boardMessage)
        {
            Board board = _boardService.Create(boardMessage.title, boardMessage.description, boardMessage.currentProjectId);

            if (board == null)
            {
                return BadRequest(boardMessage);
            }

            return Ok(board);
        }
        #endregion

        #region READ
        [HttpGet]
        public ActionResult<List<Board>> GetAll()
        {
            return Ok(_boardService.GetAll());
        }

        // GET api/<controller>/5
        [HttpGet("{id}")]
        public ActionResult<Board> GetOne([FromRoute]string id)
        {
            Board board = _boardService.Get(id);

            if (board == null)
            {
                return NotFound(id);
            }

            return Ok(board);
        }
        #endregion

        #region UPDATE
        [HttpPatch]
        public ActionResult<Board> UpdateBoard([FromBody]Board updatedBoard)
        {
            Board item = _boardService.Get(updatedBoard.id);

            if (item == null)
            {
                return NotFound(updatedBoard.id);
            }

            return Ok(_boardService.Update(updatedBoard));
        }
        #endregion

        #region DELETE
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

        [HttpDelete]
        public IActionResult DeleteAll()
        {
            _boardService.Remove();
            return Ok();
        }
        #endregion
    }
}
