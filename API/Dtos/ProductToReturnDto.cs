namespace API.Dtos;

//public record ProductToReturnDto(
//    int Id,
//    string Name,
//    string Description,
//    decimal Price,
//    string PictureUrl,
//    string ProductType,
//    string ProductBrand
//);

public class ProductToReturnDto()
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public decimal Price { get; set; }
    public string PictureUrl { get; set; }
    public string ProductType { get; set; }
    public string ProductBrand { get; set; }

}