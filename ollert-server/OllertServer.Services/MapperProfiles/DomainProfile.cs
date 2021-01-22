using System;
using AutoMapper;

using OllertServer.Models.Entities;
using OllertServer.Models.Dtos;
using OllertServer.Models.InputModels;

namespace OllertServer.Services.MapperProfiles
{
    public class DomainProfile : Profile
    {
        public DomainProfile()
        {
            CreateMap<ApplicationUser, ApplicationUserDto>();
            CreateMap<Board, BoardDto>();
            CreateMap<Board, BoardDetailDto>();
            CreateMap<Column, ColumnDto>();
            CreateMap<Column, ColumnDetailDto>();
            CreateMap<Task, TaskDto>();
            CreateMap<BoardInputModel, Board>();
            CreateMap<ColumnInputModel, Column>();
            CreateMap<TaskInputModel, Task>();
        }
    }
}