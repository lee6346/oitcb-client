using chatbot_portal.Interfaces;
using chatbot_portal.Models.Dto;
using chatbot_portal.Repositories;
using chatbot_portal.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace chatbot_portal.Controllers
{
    [Route("api/[controller]")]
    public class ChannelController: Controller
    {
        private readonly IChannelRepository _repository;
        private readonly IChannelConnectionService _channelService;

        public ChannelController(IChannelRepository repository, IChannelConnectionService connectionService)
        {
            _repository = repository;
            _channelService = connectionService;
        }




        [HttpGet("[action]")]
        public async Task<IActionResult> StartChannel()
        {
            ChannelDTO channel = await _channelService.RequestNewChannelAsync();
            if (channel == null)
            {
                return Json(BadRequest());

            }
            
            var status = await _repository.CreateChannel(channel);
            if((status.ChannelStatus.Equals(ChannelStatus.Created)))
            {
                return Json(channel);
            }
            
            return Json(status);

        }

        [HttpPost("[action]")]
        public async Task<IActionResult> EndChannel([FromBody] CloseChannelDTO ch)
        {

            var result = await _repository.EndChannel(ch);
            return Json(result);

        }


        [HttpGet("[action]")]
        public async Task<IActionResult> GetOpenChannels()
        {

            var openchannels = await _repository.GetOpenChannels();
            return Json(openchannels);

        }
        [HttpGet("[action]")]
        public async Task<IActionResult> GetChannels()
        {

            var channels = await _repository.GetChannels();
            return Json(channels);

        }

        [HttpGet("[action]/{id}")]
        public async Task<IActionResult> GetConnection(string conv_id)
        {
            if(conv_id == null)
            {
                return Json(BadRequest());
            }

            var connection = await _channelService.RequestNewConnectionAsync(conv_id);
            if(connection == null)
            {
                return Json(BadRequest());
            }
            return Json(connection);

        }
    }
}
