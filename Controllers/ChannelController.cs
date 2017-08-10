using chatbot_portal.Interfaces;
using chatbot_portal.Models.Dto;
using chatbot_portal.Repositories;
using chatbot_portal.Services;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebSocketManager.Common;

namespace chatbot_portal.Controllers
{
    [Route("api/[controller]")]
    public class ChannelController: Controller
    {
        private readonly IChannelRepository _repository;
        private readonly IChannelConnectionService _channelService;
        private readonly LiveRequestService _lrService;
        public ChannelController(IChannelRepository repository, IChannelConnectionService connectionService, LiveRequestService lrService)
        {
            _repository = repository;
            _channelService = connectionService;
            _lrService = lrService;
        }




        [HttpGet("[action]")]
        public async Task<IActionResult> StartChannel()
        {
            ConversationDTO channel = await _channelService.RequestNewChannelAsync();
            if (channel == null)
            {
                return Json(BadRequest());

            }
            
            var status = await _repository.CreateChannel(channel);
            if(status.ChannelStatus == "opened")
            {
                await _lrService.SendMessageToAllAsync(new Message { MessageType = MessageType.Text, Data = JsonConvert.SerializeObject(status) });
                return Json(channel);
            }
            
            return Json(status);

        }

        [HttpPost("[action]")]
        public async Task<IActionResult> EndChannel([FromBody] CloseChannelDTO ch)
        {

            var result = await _repository.EndChannel(ch);
            if (result.ChannelStatus == "closed")
            {
                await _lrService.SendMessageToAllAsync(new Message
                {
                    MessageType = MessageType.Text,
                    Data = JsonConvert.SerializeObject(result)
                });
                return Json(result);
            }
            return Json(BadRequest(result.ChannelStatus));

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
        public async Task<IActionResult> GetConnection(string id)
        {
            if(id == null)
            {
                return Json(BadRequest(new { err = "no conv id", conv = id }));
            }

            var connection = await _channelService.RequestNewConnectionAsync(id);
            if(connection == null)
            {
                return Json(BadRequest(new { err = "service bad", conn = connection }));
            }
            return Json(connection);

        }
    }
}
