using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace Kayak_homework.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MovieDbController : ControllerBase
    {        
        /*private readonly ILogger<MovieDbController> _logger;

        public MovieDbController(ILogger<MovieDbController> logger)
        {
            _logger = logger;
        }*/

        [HttpGet]
        public string Get(string query)
        {                                
            var httpRequest = WebRequest.Create("https://api.themoviedb.org/3/search/movie?api_key=6b9a3a9c79275d973d392c0bf5b8f34b&language=en-US&query=" + query);
            httpRequest.Method = "GET";
            httpRequest.ContentType = "application/json";
            
            var httpResponse = httpRequest.GetResponse();
            using var streamReader = new StreamReader(httpResponse.GetResponseStream());            
            return streamReader.ReadToEnd();           
        }
    }
}
