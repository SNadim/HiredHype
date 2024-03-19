using AutoMapper;
using backend.Core.Context;
using backend.Core.Dtos.Company;
using backend.Core.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompanyController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private IMapper _mapper { get; }

        public CompanyController(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // CRUD

        // create
        [HttpPost]
        [Route("Create")]
        public async Task<IActionResult> CreateCompany([FromBody] CompanyCeateDto dto)
        {
            Company newCompany = _mapper.Map<Company>(dto);
            var result = await _context.Companies.AddAsync(newCompany);
            _context.SaveChanges();
            return Ok("Company Created Successfully");
        }

        // Read

        [HttpGet]
        [Route("Get")]
        public async Task<ActionResult<IEnumerable<CompanyGetDto>>> GetCompany()
        {
            var companies = await _context.Companies.ToListAsync();
            var convertedCompanies = _mapper.Map<IEnumerable<CompanyGetDto>>(companies);

            return Ok(convertedCompanies);  
        }

        // Read (Get Company By ID)


        // Update

        // Delete
    }
}
