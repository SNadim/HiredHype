﻿using AutoMapper;
using backend.Core.Context;
using backend.Core.Dtos.Candidate;
using backend.Core.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CandidateController : ControllerBase
    {
        private ApplicationDbContext _context { get; }
        private IMapper _mapper { get; }

        public CandidateController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // CRUD

        // Create
        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> CreateCandidate([FromForm] CandidateCreateDto dto, IFormFile pdfFile)
        {
            // First save pdf to Server
            // Then save the urlt into our entity
            var fineMegeByte = 5 * 1024 * 1024;
            var pdfMineType = "application/pdf";

            if(pdfFile.Length > fineMegeByte || pdfFile.ContentType != pdfMineType)
            {
                return BadRequest("File is not valid");
            }

            var resumeUrl = Guid.NewGuid().ToString() + ".pdf";
            var filePath = Path.Combine(Directory.GetCurrentDirectory(),"Documents","pdfs", resumeUrl);
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await pdfFile.CopyToAsync(stream);
            }

            var newCandidate = _mapper.Map<Candidate>(dto);
            newCandidate.ResumeUrl = resumeUrl;
            await _context.Candidates.AddAsync(newCandidate);
            await _context.SaveChangesAsync();

            return Ok("Candidate has been added!");
        }

        // Read

        [HttpGet]
        [Route("Get")]
        public async Task<ActionResult<IEnumerable<CandidateGetDto>>> GetCandidate()
        {
            var candidates = await _context.Candidates.Include(c => c.Job).ToListAsync();

            var convertedCandidates = _mapper.Map<IEnumerable<CandidateGetDto>>(candidates);
            return Ok(convertedCandidates);
        }

        // Read (Download pdf file)
        [HttpGet]
        [Route("download/{url}")]
        public IActionResult DownloadPdfFile(string url)
        {
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "Documents", "pdfs", url);

            if(!System.IO.File.Exists(filePath))
            {
                return BadRequest("File Not Found");
            }

            var pdfBytes = System.IO.File.ReadAllBytes(filePath);
            var file = File(pdfBytes, "application/pdf", url);
            return file;
        }
        // Read (Get Job By ID)

        // Update

        // Delete
    }
}
