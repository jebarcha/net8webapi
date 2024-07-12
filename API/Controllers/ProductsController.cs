﻿using API.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ProductsController : ControllerBase
{
    private readonly IGenericRepository<Product> _productsRepo;
    private readonly IGenericRepository<ProductBrand> _productBrandRepo;
    private readonly IGenericRepository<ProductType> _productTypeRepo;
    private readonly IMapper _mapper;

    public ProductsController(IGenericRepository<Product> productsRepo, 
        IGenericRepository<ProductBrand> productBrandRepo, IGenericRepository<ProductType> productTypeRepo,
        IMapper mapper)
    {
        _productsRepo = productsRepo;
        _productBrandRepo = productBrandRepo;
        _productTypeRepo = productTypeRepo;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<ProductToReturnDto>>> GetProducts()
    {
        var spec = new ProductsWithTypesAndBrandsSpecification();

        var products = await _productsRepo.ListAsync(spec);

        //return products.Select(product => new ProductToReturnDto(product.Id, product.Name, product.Description,
        //        product.Price, product.PictureUrl, product.ProductType.Name, product.ProductBrand.Name))
        //    .ToList();

    //    return products.Select(product => new ProductToReturnDto()
    //    {
    //        Id = product.Id,
    //        Name = product.Name,
    //        Description = product.Description,
    //        Price = product.Price,
    //        PictureUrl = product.PictureUrl,
    //        ProductType = product.ProductType.Name,
    //        ProductBrand = product.ProductBrand.Name
    //    })
    //.ToList();

        return Ok(_mapper
            .Map<IReadOnlyList<Product>, IReadOnlyList<ProductToReturnDto>>(products));
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ProductToReturnDto>> GetProduct(int id)
    {
        var spec = new ProductsWithTypesAndBrandsSpecification(id);

        var product = await _productsRepo.GetEntityWithSpec(spec);

        return _mapper.Map<ProductToReturnDto>(product);
        //return _mapper.Map<Product, ProductToReturnDto>(product);

        //return new ProductToReturnDto(product.Id, product.Name, product.Description, 
        //    product.Price, product.PictureUrl, product.ProductType.Name, product.ProductBrand.Name);
    }

    [HttpGet("brands")]
    public async Task<ActionResult<List<ProductBrand>>> GetProductBrands()
    {
        return Ok(await _productBrandRepo.GetAllAsync());
    }

    [HttpGet("types")]
    public async Task<ActionResult<List<ProductType>>> GetProductTypes()
    {
        return Ok(await _productTypeRepo.GetAllAsync());
    }
}
