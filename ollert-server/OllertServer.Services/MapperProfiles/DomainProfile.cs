using System;
using AutoMapper;

using OllertServer.Models.Entities;
using OllertServer.Models.Dtos;

namespace OllertServer.Services.MapperProfiles
{
    public class DomainProfile : Profile
    {
        public DomainProfile()
        {
            CreateMap<Board, BoardDto>();
            CreateMap<Board, BoardDetailDto>();
            CreateMap<Column, ColumnDto>();
            CreateMap<Column, ColumnDetailDto>();
            CreateMap<Task, TaskDto>();
        }
    }
}